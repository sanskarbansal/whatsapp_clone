import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyA_io9YHoTr9fxqlhIwys82TJbP9lteG4M",
    authDomain: "whatsapp-letsdive.firebaseapp.com",
    databaseURL: "https://whatsapp-letsdive-default-rtdb.firebaseio.com",
    projectId: "whatsapp-letsdive",
    storageBucket: "whatsapp-letsdive.appspot.com",
    messagingSenderId: "77831242377",
    appId: "1:77831242377:web:cf25f4a613d2da93d27c58",
};
const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore();

export default db;
