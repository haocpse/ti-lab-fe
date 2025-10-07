import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import bag1 from "../../assets/membership1.png";
import bag2 from "../../assets/membership2.png";
import bag3 from "../../assets/membership3.png";
import bag4 from "../../assets/membership4.png";
import bag5 from "../../assets/membership5.png";

const Custom = () => {
    return (
        <>
            <Navbar />
            <div className="membership-hero mt-5" style={{ position: "relative" }}>
                <div className="container-fluid h-100 p-0" style={{ filter: "blur(5px)" }}>
                    <div className="membership-container">
                        <div className="bag-layer layer-1">
                            <img src={bag1} alt="Japanese Typography Bag" className="bag-image bag-japanese" />
                        </div>
                        <div className="bag-layer layer-2">
                            <img src={bag2} alt="Blue Geometric Bag" className="bag-image bag-blue" />
                        </div>
                        <div className="bag-layer layer-1">
                            <img src={bag4} alt="Yellow Cartoon Bag" className="bag-image bag-cartoon" />
                        </div>
                        <div className="bag-layer layer-2">
                            <img src={bag3} alt="Flower Design Bag" className="bag-image bag-flower" />
                        </div>
                        <div className="bag-layer layer-3">
                            <img src={bag5} alt="Yellow Eat You Up Bag" className="bag-image bag-eat" />
                        </div>
                    </div>
                </div>

                <div className="login-modal-overlay">
                    <div className="login-modal">
                        <div>
                            <span className="text-center">FEATURE WILL COMING SOON !!!</span>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>)
};
export default Custom;