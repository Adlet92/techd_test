import { useCallback, useEffect, useState } from "react";
import { PatternFormat } from 'react-number-format';
import 'react-phone-number-input/style.css';
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import { routes } from "../utils/routes";
import { formatPhoneNumber, phoneNumberLength } from "../utils/validation";
import { checkPhoneNumberExists } from "../utils/verification";
import "./RecoverPassword.css";


const RecoverPassword = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const checkPhoneNumber = useCallback(async () => {
    const strippedPhoneNumber = formatPhoneNumber(phoneNumber);
    if (phoneNumberLength(strippedPhoneNumber)) {
      setIsLoading(true);
      const phoneNumberExists = await checkPhoneNumberExists(strippedPhoneNumber);
      setIsLoading(false);
      if (phoneNumberExists) {
        setIsButtonEnabled(true);
        setError("");
      } else {
        setError(
          "Номер телефона не зарегистрирован."
        );
      }
    } else {
      setError("");
      setIsLoading(false);
      setIsButtonEnabled(false);
    }
  }, [phoneNumber]);

  useEffect(() => {
    checkPhoneNumber();
  }, [phoneNumber, checkPhoneNumber]);

  return (
    <div className="main">
      <div className= "main-container-signin">
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
              {error && (
                <div className="error-message-signin">{error}</div>
              )}
              <div className={`btn-signin ${isButtonEnabled ? "" : "disabled"}`}>
                <button
                  type="submit"
                  disabled={!isButtonEnabled}
                >
                  Восстановить
                </button>
              </div>
              {error && (
                <div className="signin-link">
                  Нет аккаунта?{" "}
                  <Link to={routes.signup}>
                    <label className="slide-signin">Зарегистрируйтесь</label>
                  </Link>
                </div>
              )}
              {isLoading && <Loading />}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
};

export default RecoverPassword;


