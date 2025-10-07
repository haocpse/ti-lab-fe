import React from "react";
import "./LoadingPage.css";
import bgg from "../../assets/Tilab.png";
import TruckLoader from "../../Components/TruckLoader/TruckLoader";

const LoadingPage = () => {
    return (
        <div className="loading-page">
            <img src={bgg} alt="Logo" style={{ width: "400px", marginBottom: "40px" }} />
            <TruckLoader />
            <h2 style={{ color: "#CAFF01", marginTop: "20px" }}>Welcome to tí.lab</h2>
        </div>
    );
};

export default LoadingPage;
