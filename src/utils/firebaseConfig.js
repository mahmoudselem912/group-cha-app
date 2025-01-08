import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// Setup Recaptcha
export const setupRecaptcha = async () => {
  if (typeof window !== 'undefined') {
    const recaptchaContainer = document.getElementById('recaptcha-container');

    if (recaptchaContainer) {
      // Now correctly pass the DOM element, reCAPTCHA options, and auth object
      const recaptchaVerifier = new RecaptchaVerifier(
        auth, // The DOM element for the reCAPTCHA widget
        'recaptcha-container',
        {
          size: 'invisible', // Invisible reCAPTCHA
          callback: (response) => {
            console.log('Recaptcha verified', response);
          },
          'expired-callback': () => {
            console.log('Recaptcha expired');
          },
        },
      );

      await recaptchaVerifier.render().then(() => {
        console.log('reCAPTCHA rendered');
      });
      
      window.recaptchaVerifier = recaptchaVerifier;

      return recaptchaVerifier;
    } else {
      console.error('reCAPTCHA container element not found!');
    }
  }
  return null;
};