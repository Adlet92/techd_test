import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import 'react-phone-number-input/style.css';
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { requestOTP } from "../context/authUtils";
import { routes } from "../utils/routes";


const SignIn = () => {
  const countryCode = "+7";
  const [phoneNumber, setPhoneNumber] = useState(countryCode);
  const [expandForm, setExpandForm] = useState(false);
  const [OTP, setOTP] = useState("");
  const navigate = useNavigate();

  // useEffect(() => {
  //   const checkPhoneNumberExists = async () => {
  //     if (phoneNumber.length >= 12) {
  //       const colRef = collection(db, 'contacts');
  //       const snapshots = await getDocs(colRef);

  //       const phoneNumberExists = snapshots.docs.some((doc) => {
  //         const data = doc.data();
  //         return data.phone === phoneNumber;
  //       });
  //       if (phoneNumberExists) {
  //         setExpandForm(true);
  //       }
  //     }
  //   };

  //   checkPhoneNumberExists();
  // }, [phoneNumber]);

  //   const handleRequestOTP = async (e) => {
  //   e.preventDefault();
  //   if (phoneNumber.length >= 12) {
  //     setExpandForm(true);
  //     try {
  //       await requestOTP(phoneNumber);

  //     } catch (error) {

  //     }
  //   }
  // };

  // const checkPhoneNumberExists = async () => {
  //   if (phoneNumber.length >= 12) {
  //     const colRef = collection(db, 'contacts');
  //     const snapshots = await getDocs(colRef);

  //     const phoneNumberExists = snapshots.docs.some((doc) => {
  //       const data = doc.data();
  //       return data.phone === phoneNumber;
  //     });

  //     if (phoneNumberExists) {
  //       setExpandForm(true);
  //     }
  //   }
  // };


  // useEffect(() => {
  //   const checkPhoneNumberExists = async () => {
  //     if (phoneNumber.length >= 12) {
  //       const colRef = collection(db, 'contacts');
  //       const snapshots = await getDocs(colRef);

  //       const phoneNumberExists = snapshots.docs.some((doc) => {
  //         const data = doc.data();
  //         return data.phone === phoneNumber;
  //       });

  //       if (phoneNumberExists) {
  //         setExpandForm(true);
  //       }
  //     }
  //   };

  //   checkPhoneNumberExists();
  // }, [phoneNumber]);

  // const handleRequestOTP = async (e) => {
  //   console.log("here")
  //   e.preventDefault();
  //   // checkPhoneNumberExists()
  //   try {
  //     await requestOTP(phoneNumber);
  //   } catch (error) {
  //   }
  // };

  const checkPhoneNumberExists = async () => {
    if (phoneNumber.length >= 12) {
      const colRef = collection(db, 'contacts');
      const snapshots = await getDocs(colRef);

      const phoneNumberExists = snapshots.docs.some((doc) => {
        const data = doc.data();
        return data.phone === phoneNumber;
      });

      if (phoneNumberExists) {
        setExpandForm(true);
      }
    }
  };

  useEffect(() => {
    checkPhoneNumberExists();
  }, [phoneNumber]);

  const handleRequestOTP = async () => {
    if (phoneNumber.length >= 12) {
      try {
        await requestOTP(phoneNumber);
      } catch (error) {
      }
    }
  };

  useEffect(() => {
    if (expandForm) {
      handleRequestOTP();
    }
  }, [expandForm]);

  const verifyOTP = (e) => {
    let otp = e.target.value;
    setOTP(otp);
      if (otp.length === 6) {
        // Check if confirmationResult is defined
        if (window.confirmationResult) {
          window.confirmationResult.confirm(otp).then((result) => {
            // User signed in successfully.
            const user = result.user;
            navigate(routes.main)
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
  }


  return (
    <div>
      {/* <form onSubmit={handleRequestOTP}> */}
      <form>
        <div>
          <h1>Sign in with phone number</h1>
          <label htmlFor="otpInput">Phone number</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        {expandForm === true ? (
          <>
            <div>
            <label htmlFor="otpInput">OTP</label>
            <input type="number" value={OTP} onChange={verifyOTP}/>
            <div>Please enter the one-time code</div>
          </div>
          </>
        ) : null}
        <div id="sign-in-button"></div>
      </form>
    </div>
  );
};

export default SignIn;


