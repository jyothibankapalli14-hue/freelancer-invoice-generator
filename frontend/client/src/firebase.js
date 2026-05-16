import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

const firebaseConfig = {

  apiKey: "AIzaSyDkZaPhbbVxVMv0urP_sq-DSmkFt-sp2As",

  authDomain: "freelancer-invoice-38875.firebaseapp.com",

  projectId: "freelancer-invoice-38875",

  storageBucket: "freelancer-invoice-38875.firebasestorage.app",

  messagingSenderId: "457031972244",

  appId: "1:457031972244:web:5731789aa171fb6fb14b81",

  measurementId: "G-EY6KY7C7H6"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);