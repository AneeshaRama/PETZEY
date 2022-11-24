import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBFwlgjelC_ZHce42AvdlrMwQRKemvqMSk",
  authDomain: "petzey-image-upload.firebaseapp.com",
  projectId: "petzey-image-upload",
  storageBucket: "petzey-image-upload.appspot.com",
  messagingSenderId: "954054464159",
  appId: "1:954054464159:web:82d1d590bb5733734448aa",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
