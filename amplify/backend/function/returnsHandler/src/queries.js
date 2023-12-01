module.exports.get_operating_unit_query = (username) => {
  return `SELECT DISTINCT
    usr.user_id,
    usr.user_name,
    ppf.full_name,
    LISTAGG(DISTINCT nvl((
        SELECT
            profile_option_value
        FROM
            fnd_profile_option_values
        WHERE
            profile_option_id =(
                SELECT
                    profile_option_id
                FROM
                    fnd_profile_options
                WHERE
                    profile_option_name = 'DEFAULT_ORG_ID'
            )
            AND level_value_application_id = faa.application_id
            AND level_value = rtl.responsibility_id
    ), NULL),
                     ',') WITHIN GROUP(
    ORDER BY
        usr.user_id
    ) default_org_id,
    usr.email_address
FROM
    fnd_responsibility        r,
    fnd_responsibility_vl     rtl,
    apps.fnd_application      faa,
    apps.fnd_user_resp_groups fug,
    apps.fnd_user             usr,
    hr.per_all_people_f       ppf
WHERE
        1 = 1
    AND rtl.responsibility_id = r.responsibility_id
    AND faa.application_id (+) = r.application_id
    AND fug.responsibility_id = r.responsibility_id
    AND usr.user_id = fug.user_id
    AND ppf.person_id = usr.employee_id
    AND ppf.effective_end_date > sysdate
    AND r.end_date IS NULL
    AND rtl.end_date IS NULL
    AND rtl.end_date IS NULL
    AND rtl.version = 'M'
    AND usr.user_id = (
        SELECT
            user_id
        FROM
            fnd_user
        WHERE
            upper(user_name) = upper('${username}')
    )
GROUP BY
    usr.user_id,
    usr.user_name,
    ppf.full_name,
    usr.email_address`
}

module.exports.get_reponsibility_name_query = (username) => {
  return `SELECT fu.user_name "User Name",
    frt.responsibility_name "Responsibility Name"
    FROM fnd_user_resp_groups_direct  furg,
        applsys.fnd_user              fu,
        applsys.fnd_responsibility_tl frt,
        applsys.fnd_responsibility    fr,
        applsys.fnd_application_tl    fat,
        applsys.fnd_application       fa
    WHERE furg.user_id           =  fu.user_id
    AND furg.responsibility_id   =  frt.responsibility_id
    AND fr.responsibility_id     =  frt.responsibility_id
    AND fa.application_id        =  fat.application_id
    AND fr.application_id        =  fat.application_id
    AND frt.language             =  USERENV('LANG')
    AND UPPER(fu.user_name)      =  UPPER('${username}')
    and  frt.responsibility_name =  'US - A2Z OTS One Stop Shop'
    AND (furg.end_date IS NULL OR furg.end_date >= TRUNC(SYSDATE))`;
};

module.exports.from_site_query = (operatingUnitNumber, search_string) => {
  return `SELECT
        mp.organization_code,
        ood.name              organization_name,
        mp.organization_id  
    FROM
        mtl_parameters               mp,
        org_organization_definitions rad,
        hr_all_organization_units    ood,
        hr_locations                 hl
    WHERE
            ood.organization_id = mp.organization_id
        AND decode(mp.attribute1, 'NA', 'AAA', mp.attribute6) = ( rad.organization_code )
        AND hl.inventory_organization_id =rad.organization_id 
        AND mp.organization_code <> 'OMO'
        AND rad.operating_unit = 81
        AND mp.attribute3 <> 'RAD' 
        AND hl.ATTRIBUTE4 = 'Yes' 
        AND (UPPER(mp.organization_code) like '%${search_string}%' or UPPER(ood.name)  like '%${search_string}%')
        AND exists( SELECT 1 FROM org_organization_definitions ood1 WHERE ood1.organization_id = mp.organization_id) order by 1`;
};

module.exports.ship_from_address_query = (org_id) => {
  return `SELECT
    hl.location_code AS organization_name,
    hl.location_id,
    address_line_1
    || ','
    || address_line_2
    || ','
    || town_or_city
    || ','
    || postal_code
    || ','
    || region_2
    || ','
    || country       address
    FROM
    hr_locations                 hl,
    org_organization_definitions ood
    WHERE
    hl.inventory_organization_id = ood.organization_id
    AND sysdate BETWEEN hl.creation_date AND nvl(hl.inactive_date, sysdate + 1)
    AND ood.organization_id = ${org_id}`;
};

module.exports.to_rad_ship_to_query = (operatingUnitNumber, org_name) => {
  return `SELECT
    rad.organization_code rad_org_code,
        rad.organization_id   rad_org_id,
        rad.organization_name rad_org_name,
        hl.location_id,
        address_line_1
        || ','
        || address_line_2
        || ','
        || town_or_city
        || ','
        || postal_code
        || ','
        || region_2
        || ','
        || country            rad_address,
        hl.location_code      AS rad_org_address
    FROM
        mtl_parameters               mp,
        org_organization_definitions rad,
        hr_all_organization_units    ood,
        hr_locations                 hl
    WHERE
        ood.organization_id = mp.organization_id
        AND decode(mp.attribute1, 'NA', 'AAA', mp.attribute6) = ( rad.organization_code )
        AND hl.inventory_organization_id =rad.organization_id 
        AND mp.organization_code <> 'OMO'     
        AND mp.attribute3 <> 'RAD' 
        AND hl.ATTRIBUTE4 = 'Yes' 
        AND exists( SELECT 1 FROM org_organization_definitions ood1 WHERE ood1.organization_id = mp.organization_id)
        AND rad.operating_unit = 81
        AND (ood.name='${org_name}')`;
};

module.exports.shipment_method_query = (org_id) => {
  return `SELECT DISTINCT
    flvv.description description,
    flvv.lookup_code lookup_code
    FROM
    wsh_carrier_services wcs,
    wsh_org_carrier_services_v woc,
    wsh_carriers_v wc,
    fnd_lookup_values_vl flvv
    WHERE
    wcs.carrier_service_id = woc.carrier_service_id
    AND wc.carrier_id = wcs.carrier_id
    AND woc.organization_id = ${org_id}
    AND flvv.lookup_type = 'SHIP_METHOD'
    AND flvv.lookup_code = wcs.ship_method_code
    AND flvv.enabled_flag = 'Y'
    AND woc.enabled_flag = 'Y'
    AND wcs.enabled_flag = 'Y'
    AND wc.active = 'A'
    AND sysdate BETWEEN nvl(flvv.start_date_active, sysdate - 1) 
    AND nvl(flvv.end_date_active, sysdate + 1)`;
};

module.exports.insert_into_returns_headers_query = (
  curr_val,
  from_site_org_value,
  from_site_org_id,
  ship_from_org_value,
  ship_from_org_id,
  toRad,
  shipTo,
  toRADID,
  shipToID,
  typeValue,
  reasonValue,
  commentValue,
  status,
  createdBy,
  creationDate,
  username,
  shippingMethod,
  shippingMethodCode,
  shippingType,
  userId,
  loginId,
  requestedphoneNumber,
  shippingEmail,
) => {
  return `INSERT INTO xxicx_returns_headers 
    (    return_header_id,
        from_org_name, 				
        from_org,      				
        ship_from_address,			
        SHIP_FROM_ADDRESS_DET,		
        to_org,						
        TO_ORG_NAME,				
        ship_to_address,			
        SHIP_TO_ADDRESS_DET,		
        type,						
        reason_code,				
        comments,					
        status,						
        rma_reqnum,					
        last_update_date,			
        last_updated_by,			
        last_update_login,			
        creation_date,				
        created_by,					
        rma_created_by,				
        severity,					
        shipping_method,			
        shipment_type,				
        shipping_method_desc,		
        requestor_phone_number,		
        email_address				
    ) VALUES
    (
        '${curr_val}',
        '${from_site_org_value}',
        '${from_site_org_id}',
        '${ship_from_org_id}',
        '${ship_from_org_value}',
        '${toRADID}',
        '${toRad}',
        '${shipToID}',
        '${shipTo}',
        '${typeValue}',
        '${reasonValue}',
        '${commentValue}',
        '${status}',
        '${curr_val}',
        '${creationDate}',
        '${userId}',
        '${loginId}',
        '${creationDate}',
        '${createdBy}',
        '${username}',
        'SEV-4',
        '${shippingMethodCode}',
        '${shippingType}',
        '${shippingMethod}',
        '${requestedphoneNumber}',
        '${shippingEmail}'
    )`
};

module.exports.insert_into_lines = (
    curr_val_lines,
    curr_val_header,
    serial_number,
    comments,
    creation_date,
    user_id,
    login_id,
    asset_number
) => {
    return `INSERT INTO xxicx_returns_lines (
        return_line_id,
        return_header_id,
        quantity,
        serial_number,
        comments,
        last_update_date,
        last_updated_by,
        last_update_login,
        creation_date,
        created_by,
        asset_number
    ) VALUES (
        '${curr_val_lines}',
        '${curr_val_header}',
        1,
        '${serial_number}',
        '${comments}',
        '${creation_date}',
        '${user_id}',
        '${login_id}',
        '${creation_date}',
        '${user_id}',
        '${asset_number}}'
    )`
}