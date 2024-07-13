// first run
// # Generate private key
// openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048
// 
// # Generate public key
// openssl rsa -pubout -in private_key.pem -out public_key.pem

const fs = require('fs');
const jose = require('node-jose');

// Read the public key
const publicKeyPem = fs.readFileSync('public_key.pem', 'utf8');

(async () => {
  // Create a key store
  const keystore = jose.JWK.createKeyStore();

  // Add the public key to the keystore
  await keystore.add(publicKeyPem, 'pem');

  // Get the public keys in JWKS format
  const jwks = keystore.toJSON();

  // Save the JWKS to a file
  fs.writeFileSync('jwks.json', JSON.stringify(jwks, null, 2));
})();
