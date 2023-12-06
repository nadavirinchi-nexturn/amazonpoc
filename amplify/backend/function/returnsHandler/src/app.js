const {
  from_site_query,
  ship_from_address_query,
  get_reponsibility_name_query,
  shipment_method_query,
  get_operating_unit_query,
  to_rad_ship_to_query,
  insert_into_returns_headers_query,
  insert_into_lines
} = require("./queries");
const express = require("express");
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");

const oracledb = require("oracledb");

oracledb.initOracleClient({libDir:'C:\\instantclient_21_12'})

const connectDB = async (req, res, next) => {
  try {
    let connection = await oracledb.getConnection({
      user: "apps",
      password: "devapps",
      connectString: "ec2-52-2-62-212.compute-1.amazonaws.com:1521/ebs_DEV",
    });
    req.dbConnection = connection;
    next();
  } catch (err) {
    console.error("Database connection error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use(connectDB);

app.post("/amazonpoc/returns/getOperatingUnitNumber", async (req, res) => {
  const username = req.body.username;
  const getOperatingUnitNumberQuery = get_operating_unit_query(username);
  try {
    let oun_data = await req.dbConnection.execute(getOperatingUnitNumberQuery);
    let user_id = oun_data.rows[0][0]
    const getResponsibilityNameQuery = get_reponsibility_name_query(user_id);
    let responsibility_name = await req.dbConnection.execute(getResponsibilityNameQuery);
    let login_id_data = await req.dbConnection.execute(`SELECT login_id FROM FND_LOGINS WHERE user_id=${user_id}`)
    res.status(200).json({
      user_id: user_id,
      op_unit_number: oun_data.rows[0][3],
      login_id: login_id_data,
      responsibility: responsibility_name.rows[0][2]
    });
    await req.dbConnection.close();
  } catch (err) {
    console.log("error", err);
    res.status(400).json({ data: err });
  }
});

app.post("/amazonpoc/returns/fromSite", async (req, res) => {
  const operatingNumber = req.body.operatingNumber;
  const search_string = req.body.search_string;
  const api_query = from_site_query(operatingNumber, search_string);
  try {
    let data = await req.dbConnection.execute(api_query);
    let processed_data = data["rows"].map((row) => {
      const org_value = `${row[1]}(${row[0]})`;
      const org_id = row[2];
      return { org_value, org_id };
    });
    res.status(200).json({ data: processed_data });
    await req.dbConnection.close();
  } catch (err) {
    console.log("error", err);
    res.status(400).json({ msg: "post call failed!", error: err });
  }
});

app.post("/amazonpoc/returns/shipFromAddress", async function (req, res) {
  let org_id = req.body.org_id;
  let operatingUnitNumber = req.body.operatingUnitNumber;
  let org_name = req.body.org_name;
  let ship_from_api_query = ship_from_address_query(org_id);
  let to_rad_ship_to_api_query = to_rad_ship_to_query(
    operatingUnitNumber,
    org_name
  );
  let shippingMethods_Api_query = shipment_method_query(org_id);
  try {
    let ship_from_data = await req.dbConnection.execute(ship_from_api_query);
    let to_rad_ship_to_data = await req.dbConnection.execute(to_rad_ship_to_api_query);
    let shipping_methods_data = await req.dbConnection.execute(shippingMethods_Api_query);
    let processed_Addresses = ship_from_data.rows.map((row) => {
      return { ship_from_org_value: row[0], ship_from_org_id: row[1] };
    });
    let shipping_methods = shipping_methods_data.rows.map((row) => {
      return { shipping_method_code: row[1], shipping_method: row[0] }
    });
    res.json({
      success: "get call succeed!",
      addresses: processed_Addresses,
      toRadId: to_rad_ship_to_data["rows"][0][1],
      toRad: to_rad_ship_to_data["rows"][0][2],
      shipToID: to_rad_ship_to_data["rows"][0][3],
      shipTo: to_rad_ship_to_data["rows"][0][5],
      shipping_methods: shipping_methods,
    });
    await req.dbConnection.close();
  } catch (err) {
    console.log("error", err);
    res.json({ msg: "get call failed!", error: err });
  }
});

app.post("/amazonpoc/returns/saveHeaders", async (req, res) => {
  let next_val_header = await req.dbConnection.execute('SELECT XXICX.XXICX_RETURN_header_ID_S.NEXTVAL FROM dual')
  let curr_val_header = await req.dbConnection.execute('SELECT XXICX.XXICX_RETURN_header_ID_S.CURRVAL FROM dual')

  let ship_to = req.body.shipTo.replace(/'/g, "''")

  let insert_into_returns_headers_api_query = insert_into_returns_headers_query(
    curr_val_header.rows[0][0],
    req.body.fromSiteValue.org_value,
    req.body.fromSiteValue.org_id,
    req.body.shipFromAddressValue.ship_from_org_value,
    req.body.shipFromAddressValue.ship_from_org_id,
    req.body.toRad,
    req.body.toRadID,
    ship_to,
    req.body.shipToID,
    req.body.typeValue,
    req.body.reasonValue,
    req.body.commentValue,
    req.body.status,
    req.body.createdBy,
    req.body.creationDate,
    req.body.userName,
    req.body.shippingMethod.shipping_method,
    req.body.shippingMethod.shipping_method_code,
    req.body.shippingType,
    req.body.userId,
    req.body.loginId,
    req.body.requestedphoneNumber,
    req.body.shippingEmail,
    req.body.tracking
  );
  console.log('insert_into_returns_headers_api_query', insert_into_returns_headers_api_query)
  let lines = req.body.lines;
  console.log('lines', lines)
  try{
    await req.dbConnection.execute(insert_into_returns_headers_api_query)
    let fetch_headers_by_id = await req.dbConnection.execute(`SELECT * FROM xxicx_returns_headers WHERE return_header_id='${curr_val_header.rows[0][0]}'`)
    lines.map(async (line) => {
      let next_val_lines = await req.dbConnection.execute('SELECT XXICX.XXICX_RETURN_LINE_ID_S.NEXTVAL FROM dual')
      let insert_into_lines_api_query = insert_into_lines(
        next_val_lines.rows[0][0],
        curr_val_header.rows[0][0],
        line.serial_number,
        line.comments,
        req.body.creationDate,
        req.body.userId,
        req.body.loginId,
        line.asset_number
      )
      console.log('insert_into_lines_api_query', insert_into_lines_api_query)
      await req.dbConnection.execute(insert_into_lines_api_query)
      await req.dbConnection.commit()
    })
    await req.dbConnection.commit()
    console.log(`SELECT * FROM xxicx_returns_lines WHERE return_header_id='${curr_val_header.rows[0][0]}'`)
    let fetch_lines_by_id = await req.dbConnection.execute(`SELECT * FROM xxicx_returns_lines WHERE return_header_id='${curr_val_header.rows[0][0]}'`)
    res.status(200).json({ 
      fetch_headers_by_id: fetch_headers_by_id.rows, 
      fetch_lines_by_id: fetch_lines_by_id.rows,
      curr_val_header: curr_val_header.rows, 
      next_val_header: next_val_header.rows,
    })
    await req.dbConnection.close()
  }catch(err){
    console.log('error', err)
    res.status(502).json({ message: 'Get call failed!!', error: err })
  }
})

app.post('/amazonpoc/returns/submitAll', async (req, res) => {

  let submit_api_query = `BEGIN xxmb_submit_action(:p_return_header_id, :p_username, :p_req_number, :p_req_status); END;`

  const binds = {
    p_return_header_id: req.body.header_id,
    p_username: req.body.userName,
    p_req_number: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
    p_req_status: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
  }

  const options = {
    autoCommit: true,
    outFormat: oracledb.OUT_FORMAT_OBJECT
  }

  try{
    let submit_data = await req.dbConnection.execute(submit_api_query, binds, options)
    res.status(201).json({ submitted_data: submit_data })
    await req.dbConnection.close()
  }catch(err){
    console.log('error', err)
    res.status(500).json({ error: err })
  }
})

app.post('/amazonpoc/returns/retryForStatus', async (req, res) => {
  const retryForStatus_api_query = `SELECT status FROM xxicx_returns_headers WHERE RETURN_HEADER_ID=${req.body.header_id}`
  try{
    const retryForStatus_data = await req.dbConnection.execute(retryForStatus_api_query)
    res.status(210).json({ submit_status: retryForStatus_data.rows[0][0] })
  }catch(err){
    console.log('error', err)
    res.status(502).json({ error: err })
  }
});

app.listen(3000, function () {
  console.log("App started");
});

module.exports = app;
