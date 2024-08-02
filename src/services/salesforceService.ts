// src/services/salesforceService.ts
import axios from 'axios';
import { generateToken } from '../utils/generateToken';
import { getPrivateKey } from '../utils/getPrivateKey';
const privateKey = getPrivateKey();

export const fetchSalesforceData = async () => {
  try {
    const token = await generateToken(privateKey);

    const tokenResponse = await axios.post(
      'https://test.salesforce.com/services/oauth2/token',
      new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: token
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    const accessToken = tokenResponse.data.access_token;

    const dataResponse = await axios.get(
      'https://ameritas--test.sandbox.my.salesforce.com/services/apexrest/OpptyCPQRestService/QO-63235',
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return dataResponse.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};