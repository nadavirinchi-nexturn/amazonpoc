const { from_site_query, ship_from_address_query, get_reponsibility_name_query, shipment_method_query, get_operating_unit_query } = require('./queries')
const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const path = require('node:path')

const oracledb = require('oracledb')

oracledb.initOracleClient({libDir: path.resolve('node_modules', 'instantclient_21_12')});

const connectDB = async (req, res, next) => {
  try {
    let connection = await oracledb.getConnection({
      user: "apps",
      password: "devapps",
      connectString: "ec2-52-2-62-212.compute-1.amazonaws.com:1521/ebs_DEV",
    });
    req.dbConnection = connection
    next()
  } catch (err) {
    console.error('Database connection error:', err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
};

const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

app.use(connectDB);

app.post('/amazonpoc/returns/getOperatingUnitNumber', async (req, res) => {
  const username = req.body.username
  const getOperatingUnitNumberQuery = get_operating_unit_query(username)
  const getResponsibilityNameQuery = get_reponsibility_name_query(username)
  try{
    let oun_data = await req.dbConnection.execute(getOperatingUnitNumberQuery)
    let responsibility_name = await req.dbConnection.execute(getResponsibilityNameQuery)
    res.status(200).json({ op_unit_number: oun_data.rows[0][3], responsibility: responsibility_name.rows[0][1] })
    await req.dbConnection.close()
  }catch(err){
    console.log('error', err)
    res.status(400).json({ data: err })
  }
})

app.post('/amazonpoc/returns/fromSite', async (req, res) => {
  const operatingNumber = req.body.operatingNumber
  const api_query = from_site_query + operatingNumber
  try{
    let data = await req.dbConnection.execute(api_query)
    res.status(200).json({ data: data['rows'] })
    await req.dbConnection.close()
  }catch(err){
    console.log('error', err)
    res.status(400).json({ msg: 'post call failed!', error: err })
  }
})

app.post('/amazonpoc/returns/shipFromAddress', async function(req, res) {
  let org_id = req.body.org_id
  let api_query = ship_from_address_query + org_id
  try{
    let data = await req.dbConnection.execute(api_query)
    res.json({ success: 'get call succeed!', data: data });
    await req.dbConnection.close()
  }catch(err){
    console.log('error', err)
    res.json({ msg: 'get call failed!', error: err });
  }
});

app.get('/amazonpoc/returns/shippingMethod', async (req, res) => {
  const api_query = shipment_method_query(req.body.org_id)
  try{
    let data = await req.dbConnection.execute(api_query)
    res.status(200).json({ data: data })
    await req.dbConnection.close()
  }catch(err){
    console.log('error', err)
    res.status(400).json({ data: err })
  }
})


app.listen(3000, function() {
    console.log("App started")
});

module.exports = app
