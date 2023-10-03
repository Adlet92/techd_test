import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../firebase";
import { PatternFormat } from "react-number-format";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [loader, setLoader] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoader(true);

    try {
      await addDoc(collection(db, "contacts"), {
        phone: phoneNumber,
        name: name,
        email: email,
      });

      setLoader(false);
      alert("Your message has been submitted👍");
      setName("");
      setEmail("");
      setPhoneNumber("");
    } catch (error) {
      alert(error.message);
      setLoader(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1>Register</h1>

      <label>Phone number</label>
      <PatternFormat
        format="+7 (###) #### ###"
        allowEmptyFormatting mask="_"
        type="tel"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <label>Name</label>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>Email</label>
      <input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        type="submit"
        style={{ background: loader ? "#ccc" : " rgb(2, 2, 110)" }}
      >
        Submit
      </button>
    </form>
  );
};

export default SignUp;
