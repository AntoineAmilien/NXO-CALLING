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
        lastTwentyFourHours: await getNumberOfServiceIsIndispoForLast24Hours(
          SERVICE.offerName
        ),
        lastThirtyDays: await getNumberOfServiceIsIndispoForLast30Days(
          SERVICE.offerName
        ),
        lastThreeHundredAndSixtyFiveDays:
          await getNumberOfServiceIsIndispoForLast365Days(SERVICE.offerName),
        lastMonth: await getNumberOfServiceIsIndispoForLastMonth(
          SERVICE.offerName
        ),
      },
      graph: await getDispoBar(SERVICE.offerName),
    };

    res.status(200).json({ statusForThisService: statusForThisService });
  } catch (_error) {
    console.log(_error);
    res.status(500).json({ error: "Internal Server Error." }, { status: 500 });
  }
}

/*
*
Domain functions
*
*/
async function getNumberOfServiceIsIndispoForLast24Hours(offerName) {
  //sql request : SELECT SUM(indispo) AS indispo FROM nxo_calling nc WHERE service_categorie ='NXO' AND offre_name IN ('NXO','TEAMS-CALLING') AND to_timestamp(timestamp_utc_s) >= NOW() - INTERVAL '24h'
  return 0;
}

async function getNumberOfServiceIsIndispoForLast30Days(offerName) {
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

async function getNumberOfServiceIsIndispoForLast365Days(offerName) {
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

async function getNumberOfServiceIsIndispoForLastMonth(offerName) {
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

const fakeData = [
  {
    ts: 1696197600,
    offre_name: "NXO",
    service_categorie: "NXO",
    service_name: "Service de téléphonie opérateur SIP",
    Disponibilite: 100,
    indispo: 0,
    maintenance: 0,
  },
  {
    ts: 1696197600,
    offre_name: "NXO",
    service_categorie: "Ressource distante",
    service_name: "Service Telephonie public",
    Disponibilite: 100,
    indispo: 0,
    maintenance: 0,
  },
  {
    ts: 1696197600,
    offre_name: "TEAMS-CALLING",
    service_categorie: "NXO",
    service_name: "Service SIP d interco Cloud",
    Disponibilite: 100,
    indispo: 0,
    maintenance: 0,
  },
  {
    ts: 1696197600,
    offre_name: "TEAMS-CALLING",
    service_categorie: "Ressource distante",
    service_name: "Service Telephonie Microsoft",
    Disponibilite: 100,
    indispo: 0,
    maintenance: 0,
  },
  {
    ts: 1696284000,
    offre_name: "NXO",
    service_categorie: "NXO",
    service_name: "Service de téléphonie opérateur SIP",
    Disponibilite: 100,
    indispo: 0,
    maintenance: 0,
  },
  {
    ts: 1696284000,
    offre_name: "NXO",
    service_categorie: "Ressource distante",
    service_name: "Service Telephonie public",
    Disponibilite: 100,
    indispo: 0,
    maintenance: 0,
  },
  {
    ts: 1696284000,
    offre_name: "TEAMS-CALLING",
    service_categorie: "NXO",
    service_name: "Service SIP d interco Cloud",
    Disponibilite: 100,
    indispo: 0,
    maintenance: 0,
  },
  {
    ts: 1696284000,
    offre_name: "TEAMS-CALLING",
    service_categorie: "Ressource distante",
    service_name: "Service Telephonie Microsoft",
    Disponibilite: 100,
    indispo: 0,
    maintenance: 0,
  },
  {
    ts: 1696456800,
    offre_name: "NXO",
    service_categorie: "NXO",
    service_name: "Service de téléphonie opérateur SIP",
    Disponibilite: 100,
    indispo: 0,
    maintenance: 0,
  },
  {
    ts: 1696456800,
    offre_name: "NXO",
    service_categorie: "Ressource distante",
    service_name: "Service Telephonie public",
    Disponibilite: 100,
    indispo: 0,
    maintenance: 0,
  },
  {
    ts: 1696456800,
    offre_name: "TEAMS-CALLING",
    service_categorie: "NXO",
    service_name: "Service SIP d interco Cloud",
    Disponibilite: 100,
    indispo: 0,
    maintenance: 0,
  },
  {
    ts: 1696456800,
    offre_name: "TEAMS-CALLING",
    service_categorie: "Ressource distante",
    service_name: "Service Telephonie Microsoft",
    Disponibilite: 100,
    indispo: 0,
    maintenance: 0,
  },
  {
    ts: 1696543200,
    offre_name: "NXO",
    service_categorie: "NXO",
    service_name: "Service de téléphonie opérateur SIP",
    Disponibilite: 100,
    indispo: 0,
    maintenance: 0,
  },
  {
    ts: 1696543200,
    offre_name: "NXO",
    service_categorie: "Ressource distante",
    service_name: "Service Telephonie public",
    Disponibilite: 100,
    indispo: 0,
    maintenance: 0,
  },
  {
    ts: 1696543200,
    offre_name: "TEAMS-CALLING",
    service_categorie: "NXO",
    service_name: "Service SIP d interco Cloud",
    Disponibilite: 100,
    indispo: 0,
    maintenance: 0,
  },
  {
    ts: 1696543200,
    offre_name: "TEAMS-CALLING",
    service_categorie: "Ressource distante",
    service_name: "Service Telephonie Microsoft",
    Disponibilite: 100,
    indispo: 0,
    maintenance: 0,
  },
  {
    ts: 1696629600,
    offre_name: "NXO",
    service_categorie: "NXO",
    service_name: "Service de téléphonie opérateur SIP",
    Disponibilite: 100,
    indispo: 0,
    maintenance: 0,
  },
  {
    ts: 1696629600,
    offre_name: "NXO",
    service_categorie: "Ressource distante",
    service_name: "Service Telephonie public",
    Disponibilite: 100,
    indispo: 0,
    maintenance: 0,
  },
  {
    ts: 1696629600,
    offre_name: "TEAMS-CALLING",
    service_categorie: "NXO",
    service_name: "Service SIP d interco Cloud",
    Disponibilite: 100,
    indispo: 0,
    maintenance: 0,
  },
  {
    ts: 1696629600,
    offre_name: "TEAMS-CALLING",
    service_categorie: "Ressource distante",
    service_name: "Service Telephonie Microsoft",
    Disponibilite: 100,
    indispo: 0,
    maintenance: 0,
  },
  {
    ts: 1696716000,
    offre_name: "NXO",
    service_categorie: "NXO",
    service_name: "Service de téléphonie opérateur SIP",
    Disponibilite: 100,
    indispo: 0,
    maintenance: 0,
  },
  {
    ts: 1696716000,
    offre_name: "NXO",
    service_categorie: "Ressource distante",
    service_name: "Service Telephonie public",
    Disponibilite: 100,
    indispo: 0,
    maintenance: 0,
  },
  {
    ts: 1696716000,
    offre_name: "TEAMS-CALLING",
    service_categorie: "NXO",
    service_name: "Service SIP d interco Cloud",
    Disponibilite: 100,
    indispo: 0,
    maintenance: 0,
  },
  {
    ts: 1696716000,
    offre_name: "TEAMS-CALLING",
    service_categorie: "Ressource distante",
    service_name: "Service Telephonie Microsoft",
    Disponibilite: 100,
    indispo: 0,
    maintenance: 0,
  },
  {
    ts: 1696802400,
    offre_name: "NXO",
    service_categorie: "NXO",
    service_name: "Service de téléphonie opérateur SIP",
    Disponibilite: 100,
    indispo: 0,
    maintenance: 0,
  },
  {
    ts: 1696802400,
    offre_name: "NXO",
    service_categorie: "Ressource distante",
    service_name: "Service Telephonie public",
    Disponibilite: 100,
    indispo: 0,
    maintenance: 0,
  },
  {
    ts: 1696802400,
    offre_name: "TEAMS-CALLING",
    service_categorie: "NXO",
    service_name: "Service SIP d interco Cloud",
    Disponibilite: 100,
    indispo: 0,
    maintenance: 0,
  },
  {
    ts: 1696802400,
    offre_name: "TEAMS-CALLING",
    service_categorie: "Ressource distante",
    service_name: "Service Telephonie Microsoft",
    Disponibilite: 100,
    indispo: 0,
    maintenance: 0,
  },
];
//TODO Revoir la nom de cette fonction
async function getDispoBar(offerName) {
  // Fonction pour formater le nom du service en camelCase
  function formatServiceName(service_name) {
    return service_name
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase());
  }

  //Exect du sql et retourne les data (ici fakeDate)
  //1 Je veux les repartirs dans 4 tableaux en fonction de leur service_name (attention rien a voir avec le service_name dans ma env var)
  const serviceGroups = {};

  for await (let item of fakeData) {
    const formattedServiceName = formatServiceName(item.service_name);

    // Vérifiez si le tableau pour ce service_name existe, sinon, créez-le
    if (!serviceGroups[formattedServiceName]) {
      serviceGroups[formattedServiceName] = [];
    }

    // Ajoutez l'élément au tableau approprié
    serviceGroups[formattedServiceName].push(item);
  }
  return serviceGroups;
}
