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
    AND (furg.end_date IS NULL OR furg.end_date >= TRUNC(SYSDATE))`
}

module.exports.from_site_query = `SELECT
mp.organization_code,
ood.name              organization_name,

mp.organization_id
FROM
mtl_parameters               mp,
org_organization_definitions rad,
hr_all_organization_units    ood
WHERE
    ood.organization_id = mp.organization_id
AND decode(mp.attribute1, 'NA', 'AAA', mp.attribute6) = ( rad.organization_code )
and rad.OPERATING_UNIT = `

module.exports.ship_from_address_query = `SELECT
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
AND ood.organization_id = `

module.exports.shipment_method_query = (org_id) => {
    return `SELECT DISTINCT
    flvv.description description,
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
    AND nvl(flvv.end_date_active, sysdate + 1)`
}