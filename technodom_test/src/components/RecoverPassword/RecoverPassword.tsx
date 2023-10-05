import { useState } from "react";
import { PatternFormat } from 'react-number-format';
import 'react-phone-number-input/style.css';
import { formatPhoneNumber } from "../utils/validation";
import { checkPhoneNumberExists } from "../utils/verification";
import "./RecoverPassword.css";


const SignIn = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const strippedPhoneNumber = formatPhoneNumber(phoneNumber);

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
                />
              </div>
              <div className={`btn-signin ${(!checkPhoneNumberExists(strippedPhoneNumber)) ? "" : "disabled"}`}>
              {/* <div className= "btn-signin"> */}
                <button
                  type="submit"
                  disabled={!checkPhoneNumberExists(strippedPhoneNumber)}
                >
                  Восстановить
                </button>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
};

export default SignIn;


