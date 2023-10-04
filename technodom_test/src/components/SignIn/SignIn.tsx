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
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [expandForm, setExpandForm] = useState<boolean>(false);
  const [OTP, setOTP] = useState<string>("");
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isCaptchaVisible, setIsCaptchaVisible] = useState<boolean>(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);
  const [otpError, setOtpError] = useState<string>("");

  const checkPhoneNumber = useCallback(async () => {
    const strippedPhoneNumber = phoneNumber.replace(/[^\d]/g, '');
    if (strippedPhoneNumber.length === 11) {
      setLoading(true);
      const phoneNumberExists = await checkPhoneNumberExists(strippedPhoneNumber);
      setLoading(false);
      if (phoneNumberExists) {
        setExpandForm(true);
        setError("");
      } else {
        setError(
          "Номер телефона не зарегистрирован."
        );
      }
    } else {
      setError("");
      setLoading(false);
      setExpandForm(false);
    }
  }, [phoneNumber]);

  useEffect(() => {
    checkPhoneNumber();
  }, [phoneNumber, checkPhoneNumber]);

  useEffect(() => {
    const handleRequestOTP = async () => {
      try {
        await requestOTP(phoneNumber);
        setIsCaptchaVisible(true);
      } catch (error) {
        setError("Ошибка при запросе OTP. Возможно телефонный номер не введен полностью");
        setExpandForm(false);
      }
    };

    if (expandForm) {
      handleRequestOTP();
    }
  }, [expandForm, phoneNumber]);

  const handleVerifyOTP = (e: React.ChangeEvent<HTMLInputElement>) => {
    let otp = e.target.value;
    setOTP(otp);
    setIsButtonEnabled(otp.length === 6);
    // verifyOTP(otp, navigate, setIsButtonEnabled);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isButtonEnabled) {
      setLoading(true);
      verifyOTP(OTP, navigate, setOtpError);
      setLoading(false);
    }
  };



  useEffect(() => {
    if (isCaptchaVisible) {
      setLoading(false);
    }
  }, [isCaptchaVisible]);

  return (
    <div className="main">
      <div className={`main-container-signin ${expandForm ? "error-signin" : ""}`}>
        <div className="container-signin">
          <div className="signin-container">
            <div className="text-signin">Sign in with phone number</div>
            <form onSubmit={(e) => e.preventDefault()}>
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
                  {otpError && (
                  <div className="error-message-signin">{otpError}</div>
                )}
                </div>
              ) : null}
              {loading ? (
                <div className="loading">
                 <Loading/>
                </div>
              ) : null}
             {error && (
                <div className="error-message-signin">{error}</div>
              )}
              {!error && (
                <div id="sign-in-button"></div>
              )}
              {!error && expandForm && (
                <div className={`btn-signin ${(isButtonEnabled && isCaptchaVisible) ? "" : "disabled"}`}>
                  <button
                    type="submit"
                    disabled={(!isButtonEnabled || !isCaptchaVisible)}
                    onClick={handleSubmit}>
                    Войти
                  </button>
                </div>
              )}
              {error && error !== "Ошибка при запросе OTP. Возможно телефонный номер не введен полностью" && (
                <div className="signin-link">
                  Нет аккаунта?{" "}
                  <Link to={routes.signup}>
                    <label className="slide-signin">Зарегистрируйтесь</label>
                  </Link>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
};

export default SignIn;


