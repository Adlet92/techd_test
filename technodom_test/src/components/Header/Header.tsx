import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { routes } from "../utils/routes";
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const { username, clearUserData } = useUser();
  const handleLogout = () => {
    clearUserData();
    navigate(routes.signin);
  };

  return (
    <div className="header">
      <div className="frame4">
          <div className="account-label">{username}</div>
          <button className="logout-button" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </div>
  );
};

export default Header;
