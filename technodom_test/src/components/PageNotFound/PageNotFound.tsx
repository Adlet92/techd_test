import React from "react";
import { useNavigate } from "react-router-dom";
// import Header from "../Header/Header";
import { routes } from "../utils/routes";
import "./PageNotFound.css";

const PageNotFound: React.FC = () => {
  const navigate = useNavigate();

const handleBackToTopics = () => {
    navigate(routes.topics);
  };

  return (
    <>
      {/* <Header backButton={false}/> */}
      <div className="notFound-container">
        <div className="title-404">404</div>
        <div className="page-not-found">Page not found</div>
        <button className="back-button" onClick={handleBackToTopics}>
          Back to Topics
        </button>
      </div>
    </>
  );
};

export default PageNotFound;
