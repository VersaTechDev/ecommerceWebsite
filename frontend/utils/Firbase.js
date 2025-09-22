import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRBASE_APIKEY,
  authDomain: "loginwithonecart.firebaseapp.com",
  projectId: "loginwithonecart",
  storageBucket: "loginwithonecart.firebasestorage.app",
  messagingSenderId: "923828052406",
  appId: "1:923828052406:web:1f44a23468b46b23be6117"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider() 


export {auth , provider}