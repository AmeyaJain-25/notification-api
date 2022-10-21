import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';
import config from '.';
import TokenApi from '../api/token.api';

const firebaseConfig = {
  apiKey: config.FIREBASE_API_KEY,
  authDomain: config.FIREBASE_AUTH_DOMAIN,
  projectId: config.FIREBASE_PROJECT_ID,
  storageBucket: config.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: config.FIREBASE_MESSAGING_SENDER_ID,
  appId: config.FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const getFCMToken = async (cb: (token: string) => void) => {
  try {
    const token = await getToken(messaging, {
      vapidKey: config.FIREBASE_VAPID_KEY,
    });
    console.log(token);
    cb(token);
    await TokenApi.storeToken(token);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default messaging;
