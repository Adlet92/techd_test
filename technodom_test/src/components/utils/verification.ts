import { collection, getDocs } from "firebase/firestore";
import { NavigateFunction } from "react-router-dom";
import { db } from "../../firebase";
import { routes } from "./routes";

export const checkPhoneNumberExists = async (phoneNumber: string) => {
  if (phoneNumber.length >= 12) {
    const colRef = collection(db, 'contacts');
    const snapshots = await getDocs(colRef);

    const phoneNumberExists = snapshots.docs.some((doc) => {
      const data = doc.data();
      return data.phone === phoneNumber;
    });

    return phoneNumberExists;
  }
  return false;
};

export const verifyOTP = (otp: string, navigate: NavigateFunction) => {
  if (otp.length === 6) {
    // Check if confirmationResult is defined
    if (window.confirmationResult) {
      window.confirmationResult.confirm(otp).then((result) => {
        // User signed in successfully.
        const user = result.user;
        navigate(routes.main);
        // ...
      }).catch((error) => {
        // User couldn't sign in (bad verification code?)
        console.error("Error confirming OTP:", error);
        // Handle the error as needed.
      });
    } else {
      console.error("Confirmation result is not defined");
      // Handle the case where confirmationResult is not defined.
    }
  }
};
