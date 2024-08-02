
// src/utils/generateToken.ts
import { SignJWT, importPKCS8 } from 'jose';

const clientId = "MVG9W4cDaFe_Aan27rbSb2AqalKChGU24bgeVMhZKrdr6Z2GmHIORZvWPNZlEj99Uvu45FUfJ3rHBqAbL8tn"
const username = "adminuser1@ameritas.com.test"
export const generateToken = async (privateKey: string) => {
    try {
      // Convert the private key from PEM format to a CryptoKey object
      const key = await importPKCS8(privateKey, 'RS256');
  
      // Create and sign the JWT
      const token = await new SignJWT({/* payload */})
        .setProtectedHeader({ alg: 'RS256' })
        .setIssuer(clientId) // Consumer Key from Salesforce
        .setSubject(username) // Salesforce username
        .setAudience('https://test.salesforce.com') // Salesforce token endpoint
        .setExpirationTime('5m') // Token expiration time
        .sign(key);
  
      return token;
    } catch (error) {
      console.error('Error generating JWT token:', error);
      throw error;
    }
  };