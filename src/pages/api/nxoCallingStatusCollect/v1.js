export default async function handler(req, res) {
  try {
    const SERVICE_NAME_REQ = req.query?.serviceName;

    if (!SERVICE_NAME_REQ) {
      res
        .status(500)
        .json(
          { error: "Paramater serviceName is not renseigned." },
          { status: 500 }
        );
    }

    const SERVICE = process.env.ALL_SERVICES_NXO_CALLING.find((el) => {
      if (el.serviceName === SERVICE_NAME_REQ) {
        return el;
      }
      return false;
    });

    if (!SERVICE) {
      res.status(500).json({ error: "Unvalide serviceName." }, { status: 500 });
    }

    var statusForThisService = {
      indispo: {
        lastTwentyFourHours: getNumberOfServiceIsIndispoForLast24Hours(
          SERVICE.offerName
        ),
        lastThirtyDays: getNumberOfServiceIsIndispoForLast30Days(
          SERVICE.offerName
        ),
        lastThreeHundredAndSixtyFiveDays:
          getNumberOfServiceIsIndispoForLast365Days(SERVICE.offerName),
        lastMonth: getNumberOfServiceIsIndispoForLastMonth(SERVICE.offerName),
      },
    };

    res.status(200).json({ statusForThisService: statusForThisService });
  } catch {
    res.status(500).json({ error: "Internal Server Error." }, { status: 500 });
  }
}

/*
*
Domain functions
*
*/
function getNumberOfServiceIsIndispoForLast24Hours(offerName) {
  //sql request : SELECT SUM(indispo) AS indispo FROM nxo_calling nc WHERE service_categorie ='NXO' AND offre_name IN ('NXO','TEAMS-CALLING') AND to_timestamp(timestamp_utc_s) >= NOW() - INTERVAL '24h'
  return 0;
}

function getNumberOfServiceIsIndispoForLast30Days(offerName) {
  //sql request :
  /*
SELECT SUM(indispo) AS indispo
FROM nxo_calling_1d ncd 
WHERE 
service_categorie ='NXO'
AND offre_name in ('NXO','TEAMS-CALLING')
AND to_timestamp(timestamp_utc_s) >= NOW() - INTERVAL '30D'
*/
  return 0;
}

function getNumberOfServiceIsIndispoForLast365Days(offerName) {
  //sql request :
  /*
SELECT SUM(indispo) AS indispo
FROM nxo_calling_1d ncd 
WHERE 
service_categorie ='NXO'
AND offre_name in ('NXO','TEAMS-CALLING')
AND to_timestamp(timestamp_utc_s) >= NOW() - INTERVAL '365D'
*/
  return 0;
}

function getNumberOfServiceIsIndispoForLastMonth(offerName) {
  //sql request :
  /*
SELECT SUM(indispo) AS indispo
FROM nxo_calling_1d ncd 
WHERE 
service_categorie ='NXO'
AND offre_name in ('NXO','TEAMS-CALLING')
AND DATE_TRUNC('month', TO_TIMESTAMP(timestamp_utc_s)) = ADD_MONTHS(DATE_TRUNC('month', NOW()), -1)
*/
  return 0;
}
