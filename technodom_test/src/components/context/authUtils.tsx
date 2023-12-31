import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../firebase";

let recaptchaVerifier: RecaptchaVerifier | null = null;

export const generateRecaptcha = () => {
  recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
      'size': 'invisible',
      'callback': () => {
      }
    });
};

export const requestOTP = async (phoneNumber: string) => {
  generateRecaptcha();
  const appVerifier = recaptchaVerifier;
  if (!appVerifier) {
    console.error("RecaptchaVerifier is null.");
    return;
  }
  await new Promise<void>((resolve) => {
    window.grecaptcha.ready(() => {
      resolve();
    });
  });

  try {
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    (window as any).confirmationResult = confirmationResult;
    return confirmationResult;
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error;
  }
};


