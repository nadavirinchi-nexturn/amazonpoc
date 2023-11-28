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
AND ood.organization_id = 390`

module.exports.shipment_method_query = `SELECT DISTINCT
flvv.description description,
flvv.lookup_code lookup_code,
woc.organization_id org_id
FROM
wsh_carrier_services wcs,
wsh_org_carrier_services_v woc,
wsh_carriers_v wc,
fnd_lookup_values_vl flvv
WHERE
    wcs.carrier_service_id = woc.carrier_service_id
AND wc.carrier_id = wcs.carrier_id
AND flvv.lookup_type = 'SHIP_METHOD'
AND flvv.lookup_code = wcs.ship_method_code
AND flvv.enabled_flag = 'Y'
AND woc.enabled_flag = 'Y'
AND wcs.enabled_flag = 'Y'
AND wc.active = 'A'
AND sysdate BETWEEN nvl(flvv.start_date_active, sysdate - 1) 
AND nvl(flvv.end_date_active, sysdate + 1)`