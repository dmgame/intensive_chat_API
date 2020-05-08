const admin = require('./admin');

async function verifyToken(token) {
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    return decodedToken;
  } catch (err) {
    return Promise.reject(err);
  }
}

module.exports = {
  verifyToken,
};
