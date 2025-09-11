import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import bgg from "../../assets/Tilab.png";
import './Home.css'
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <>
            <Navbar />
            <div className="backgroundHome">
                <div className="backgoundImg mb-5">
                    <img 
                        src={bgg} 
                        alt="Tilab Logo" 
                        className="img-fluid home-logo"
                    />
                </div>
                <div className="home-action">
                    <Link to="/about" className="home-link">About tí.lab <span>→</span></Link>
                    <Link to="/shop" className="home-link" style={{ marginLeft: "40px" }}>Shop Now <span>→</span></Link>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Home;