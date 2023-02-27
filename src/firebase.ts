import { FirebaseApp, initializeApp } from "firebase/app"
import "firebase/auth"
import { Auth, getAuth } from "firebase/auth"
import { FirebaseStorage, getStorage } from "firebase/storage";
import { Firestore, getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyC7C1wEOcEb60HhxvpQ12DxpW08_DLAIWw",
  authDomain: "quizzle-51f04.firebaseapp.com",
  projectId: "quizzle-51f04",
  storageBucket: "quizzle-51f04.appspot.com",
  messagingSenderId: "950697877898",
  appId: "1:950697877898:web:74f4495fb7546eca1ca873",
}
const app: FirebaseApp = initializeApp(firebaseConfig);


export const auth: Auth = getAuth(app)
export const storage: FirebaseStorage = getStorage()
export const db: Firestore = getFirestore(app)
export default app