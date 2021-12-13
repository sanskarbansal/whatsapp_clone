const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const serviceAccount = require("./serviceAccountKey.json");
initializeApp({
    credential: cert(serviceAccount),
});
export default getFirestore();
