import { collection, getDocs } from "firebase/firestore";
import { NavigateFunction } from "react-router-dom";
import { db } from "../../firebase";
import { routes } from "./routes";
import { isValidEmailFormat, phoneNumberLength } from "./validation";

export const checkPhoneNumberExists = async (phoneNumber: string) => {
  if (phoneNumberLength(phoneNumber)) {
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

export const getUserName = async (phoneNumber: string) => {
  const colRef = collection(db, 'contacts');
  const snapshots = await getDocs(colRef);

  try {
    for (const doc of snapshots.docs) {
      const data = doc.data();
      if (data.phone === phoneNumber) {
        return data.name || 'User';
      }
    }
  } catch (error) {
    console.error("Error fetching username:", error);
  }
  return 'User';
};



export const checkEmailExists = async (email: string) => {
  if (isValidEmailFormat(email)) {
    const colRef = collection(db, 'contacts');
    const snapshots = await getDocs(colRef);

    const emailExists = snapshots.docs.some((doc) => {
      const data = doc.data();
      return data.email === email;
    });

    return emailExists;
  }
  return false;
};


export const verifyOTP = (otp: string, navigate: NavigateFunction, setOtpError: (error: string) => void) => {
  if (otp.length === 6) {
    // Check if confirmationResult is defined
    if (window.confirmationResult) {
      window.confirmationResult.confirm(otp).then((result) => {
        const user = result.user;
        navigate(routes.main);
        setOtpError("");
      }).catch((error) => {
        console.error("Error confirming OTP:", error);
        setOtpError("Код подтверждения введён не правильно");
      });
    } else {
      console.error("Confirmation result is not defined");
      setOtpError("Код подтверждения не определен");
    }
  }
};

