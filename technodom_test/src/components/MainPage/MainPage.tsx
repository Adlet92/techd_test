import Header from "../Header/Header";
import "./MainPage.css";

function MainPage() {

  return (
    <div>
      <Header/>
      <div className="main-page">
        <div>
          <h2>Welcome to our page</h2>
        </div>
        <div>
          <div className="categories">
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
