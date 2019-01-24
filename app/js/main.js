const API_URL = 'ENV.API_URL',
  DOMAIN_URL = 'ENV.DOMAIN_URL';

const dateToBR = function (data) {

  let dados = data.split('-');

  return `${dados[2]}/${dados[1]}/${dados[0]}`;

};

const domain = `Domain: ${DOMAIN_URL}`;
const endpoint = `Endpoint: ${API_URL}`;
