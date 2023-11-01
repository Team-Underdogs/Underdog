const {expressjwt: jwt} = require("express-jwt");
const jwksRsa = require("jwks-rsa");
require("dotenv").config();

const PORT = process.env.PORT;

const authConfig = {
    domain: 'https://underdogs.au.auth0.com',
    audience: `http://localhost:${PORT}`
};

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
    }),
    audience: authConfig.audience,
    issuer: `https://${authConfig.domain}`,
    algorithms: ['RS256']
});

module.exports = checkJwt;