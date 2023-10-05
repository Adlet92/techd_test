import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { PatternFormat } from "react-number-format";
import { ToastContainer, toast } from 'react-toastify';
import { db } from "../../firebase";
import Loading from "../Loading/Loading";
import { formatPhoneNumber, validateForm } from "../utils/validation";
import "./SignUp.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);

  const strippedPhoneNumber = formatPhoneNumber(phoneNumber);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);
    setLoading(true);

    try {
      const errors = await validateForm(email, phoneNumber, name);

      if (errors.length > 0) {
        setErrors(errors);
        setLoading(false);
        return;
      }

    } catch (error) {
      console.error('Error validating form:', error);
      setLoading(false);
    }

    try {
      await addDoc(collection(db, "contacts"), {
        phone: strippedPhoneNumber,
        name: name,
        email: email,
      });

      toast.success('Вы успешно зарегистрировались', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3500,
      });
      setName("");
      setEmail("");
      setPhoneNumber("");
    } catch (error) {
      alert(error.message);
    }finally {
      setLoading(false);
    }
  };

  const isFormIncomplete = !name || !email || !phoneNumber || !consentChecked;

  return (
    <div className="main">
       <div className={`main-container ${errors.length ? "error" : ""}`}>
        <div className="container">
          <div className="signup-container">
            <div className="text">Регистрация</div>
            <form onSubmit={handleSubmit}>
              <div className="data">
                <label>Номер телефона</label>
                <PatternFormat
                  format="+7 (###) #### ###"
                  allowEmptyFormatting mask="_"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className={
                    errors.includes("Номер телефона обязателен") || errors.includes("Номер телефона введён не полностью") || errors.includes("Номер телефона уже существует")
                      ? "error-input"
                      : ""
                  }
                  />
              </div>
              <div className="data">
                <label>Имя</label>
                <input
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={
                    errors.includes("Имя не заполнено")
                      ? "error-input"
                      : ""
                  }
                />
              </div>
              <div className="data">
                <label>Email</label>
                <input
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={
                    errors.includes("Email обязателен") || errors.includes("Email введён неверно") || errors.includes("Email уже существует")
                      ? "error-input"
                      : ""
                  }
                />
              </div>
              <div className="checkbox-div">
                <label>
                  <input
                    type="checkbox"
                    checked={consentChecked}
                    onChange={() => setConsentChecked(!consentChecked)}
                  />
                  Я прочитал(а) и соглашаюсь с правилами сайта
                </label>
              </div>
              {errors.length > 0 && (
                <div className="error-message">
                  {errors.map((error, index) => (
                    <p key={index} className="error-paragraph">{error}</p>
                  ))}
                </div>
              )}
              <div className={`btn-signin ${isFormIncomplete ? "disabled" : ""}`}>
                <button type="submit" disabled={isFormIncomplete}>
                {loading ? <Loading/> : "Зарегистрироваться"}
                </button>
              </div>
              {/* <div className="signup-link">
                Already have an account?{" "}
                <Link to={routes.signin}>
                  <label className="slide">Login</label>
                </Link>
              </div> */}
            </form>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  )
};

export default SignUp;
