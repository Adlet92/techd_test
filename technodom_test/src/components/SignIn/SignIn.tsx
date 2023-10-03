import { useCallback, useEffect, useState } from "react";
import { PatternFormat } from 'react-number-format';
import 'react-phone-number-input/style.css';
import { Link, useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import { requestOTP } from "../context/authUtils";
import { routes } from "../utils/routes";
import { checkPhoneNumberExists, verifyOTP } from "../utils/verification";
import "./SignIn.css";


const SignIn = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [expandForm, setExpandForm] = useState(false);
  const [OTP, setOTP] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const checkPhoneNumber = useCallback(async () => {
    const strippedPhoneNumber = phoneNumber.replace(/[^\d]/g, '');
    if (strippedPhoneNumber.length === 11) {
      setLoading(true);
      const phoneNumberExists = await checkPhoneNumberExists(phoneNumber);
      setLoading(false);
      if (phoneNumberExists) {
        setExpandForm(true);
        setError("");
      } else {
        setError(
          "Номер телефона не зарегистрирован. Пожалуйста, сначала зарегистрируйтесь."
        );
      }
    } else {
      setError("");
      setLoading(false);
    }
  }, [phoneNumber]);

  useEffect(() => {
    checkPhoneNumber();
  }, [phoneNumber, checkPhoneNumber]);

  useEffect(() => {
    const handleRequestOTP = async () => {
      try {
        setLoading(true);
        await requestOTP(phoneNumber);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        // Handle the error as needed.
      }
    };

    if (expandForm) {
      handleRequestOTP();
    }
  }, [expandForm, phoneNumber]);

  const handleVerifyOTP = (e: React.ChangeEvent<HTMLInputElement>) => {
    let otp = e.target.value;
    setOTP(otp);
    verifyOTP(otp, navigate);
  };


  return (
    <div className="main">
      <div className={`main-container-signin ${expandForm ? "error-signin" : ""}`}>
        <div className="container-signin">
          <div className="signin-container">
            <div className="text-signin">Sign in with phone number</div>
            <form>
              <div className="data-signin">
                <label>Phone number</label>
                <PatternFormat
                  format="+7 (###) #### ###"
                  allowEmptyFormatting mask="_"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className={error ? "error-input-signin" : ""}
                />
              </div>
              {expandForm === true ? (
              <div className="data-signin">
                <label>OTP</label>
                <input
                    type="number"
                    value={OTP}
                    onChange={handleVerifyOTP}
                    // className={error ? "error-input-signin" : ""}
                />
                </div>
                ) : null}
             {phoneNumber.length === 17 ? (
                loading ? (
                  <Loading />
                ) : (
                  error && <div className="error-message-signin">{error}</div>
                )
              ) : null}
              <div id="sign-in-button"></div>
              <div className="btn-signin">
                <button type="submit" disabled={!expandForm}>
                  {/* {loading ? <Loading /> : "Войти"} */}
                </button>
              </div>

              <div className="signin-link">
                Don’t have an account?{" "}
                <Link to={routes.signup}>
                  <label className="slide-signin">Sign up</label>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
};

export default SignIn;


