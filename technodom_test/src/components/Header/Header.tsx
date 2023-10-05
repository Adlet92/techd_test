import { useNavigate } from "react-router-dom";
import { logout } from "../context/authUtils";
import { routes } from "../utils/routes";
import './Header.css';

const Header = () => {
  // const authUser = UserAuth();
  // const user = authUser && authUser.user;
  const navigate = useNavigate();

  const handleLogout = () => {
    if (logout) {
      logout().then(() => navigate(routes.signin));
    }
  };

  return (
    <div className="header">
        <div className="frame4">
          {/* <div className="account-label">{user && user.email}</div> */}
          <button className="logout-button" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </div>
  );
};

export default Header;
