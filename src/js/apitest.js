const axios = require('axios');

const apilist = ['http://free1.fujufrp.cf:19514', 'http://backup.qoriginal.vip:9998'];
let endpoint = null;

async function testConnectivity(api) {
  try {
    await axios.get(api);
    return true;
  } catch (error) {
    return false;
  }
}

export async function findWorkingEndpoint() {
  for (const api of apilist) {
    if (await testConnectivity(api)) {
      endpoint = api;
      return api;
    }
  }
  return null; 
}
findWorkingEndpoint()
