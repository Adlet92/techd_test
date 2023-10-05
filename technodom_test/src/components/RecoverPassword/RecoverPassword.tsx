import { useCallback, useEffect, useState } from "react";
import { PatternFormat } from 'react-number-format';
import 'react-phone-number-input/style.css';
import { Link, useNavigate } from "react-router-dom";
import { requestOTP } from "../context/authUtils";
import { routes } from "../utils/routes";
import { formatPhoneNumber, phoneNumberLength } from "../utils/validation";
import { checkPhoneNumberExists, verifyOTP } from "../utils/verification";
import "./RecoverPassword.css";


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
    const strippedPhoneNumber = formatPhoneNumber(phoneNumber);
    if (phoneNumberLength(strippedPhoneNumber)) {
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
            <div className="text-signin">Восстановить пароль</div>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="data-signin">
                <label>Номер телефона</label>
                <PatternFormat
                  format="+7 (###) #### ###"
                  allowEmptyFormatting mask="_"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className={error ? "error-input-signin" : ""}
                />
              </div>
                <div className={`btn-signin ${(isButtonEnabled && isCaptchaVisible) ? "" : "disabled"}`}>
                  <button
                    type="submit"
                    disabled={(!isButtonEnabled || !isCaptchaVisible)}
                    onClick={handleSubmit}>
                    Восстановить
                  </button>
                </div>
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


