import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Loading from "../Loading/Loading"
import { UserAuth } from "../context/AuthContext"
import { routes } from "../utils/routes"
import "./SignIn.css"

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const auth = UserAuth();
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setLoading(true);

    if (!email || !password) {
      setError(
        "Login failed! Please, check your email and password and try again.",
      )
      setLoading(false);

      return
    }

    try {
      if (auth && auth.signIn) {
        await auth.signIn(email, password);
        navigate(routes.topics)
      }
    } catch {
      setError(
        "Login failed! Please, check your email and password and try again.",
      )
    }
    setLoading(false);
  };

  return (
    <div className="main">
      <div className={`main-container-signin ${error ? "error-signin" : ""}`}>
        <div className="container-signin">
          <div className="signin-container">
            <div className="text-signin">LogIn</div>

            <form onSubmit={handleSubmit}>
              <div className="data-signin">
                <label>Email</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter your email"
                  className={error ? "error-input-signin" : ""}
                />
              </div>
              <div className="data-signin">
                <label>Password</label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Enter your password"
                  className={error ? "error-input-signin" : ""}
                />
              </div>
              {error && <div className="error-message-signin">{error}</div>}
              <div className="btn-signin">
                <button type="submit" disabled={!email || !password || loading}>
                  {loading ? <Loading /> : "Login"}
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
}

export default SignIn
