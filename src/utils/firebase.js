import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
    apiKey: "AIzaSyA_io9YHoTr9fxqlhIwys82TJbP9lteG4M",
    authDomain: "whatsapp-letsdive.firebaseapp.com",
    databaseURL: "https://whatsapp-letsdive-default-rtdb.firebaseio.com",
    projectId: "whatsapp-letsdive",
    storageBucket: "whatsapp-letsdive.appspot.com",
    messagingSenderId: "77831242377",
    appId: "1:77831242377:web:cf25f4a613d2da93d27c58",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
