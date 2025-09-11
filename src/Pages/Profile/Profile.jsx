import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { fetchProfileCustomer } from "../../Services/Profile";

const Profile = () => {
    const [profile, setProfile] = useState(null);

    const [profile1, setProfile1] = useState(null);
    const fetchProfile = async () => {
        try {
            const data = await fetchProfileCustomer();
            setProfile(data)
            setProfile1(data.userResponse)

        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fetchProfile();
    }, [])



    return (
        <>
            <Navbar />
            <div className="text-light min-vh-100 py-5" style={{ backgroundColor: "black" }}>
                <div className="container">
                    <h2 className="text-center mb-4" style={{ color: "#caff01", fontSize: "2.5rem", fontWeight: 500 }}>YOUR ACCOUNT</h2>

                    <div className="d-flex justify-content-center mb-5">
                        <div className="me-5 border-bottom border-2 pb-1" style={{ color: "#caff01", fontWeight: 500, cursor: "pointer" }}>Account Information</div>
                        <div className="pb-1" style={{ color: "#caff01", opacity: 0.6, cursor: "pointer" }}>Latest List</div>
                    </div>

                    <div className="row justify-content-center align-items-center">
                        <div className="col-12 col-md-4 d-flex justify-content-center mb-4 mb-md-0">
                            <img
                                src={profile?.bagImages ? encodeURI(profile?.bagImages) : `https://picsum.photos/300/250?`}
                                alt="User Avatar"
                                className="rounded-4"
                                style={{ width: "250px", height: "250px", objectFit: "cover" }}
                            />
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="mb-3 d-flex">
                                <span className="me-3" style={{ width: 130, color: "#caff01" }}>Full name:</span>
                                <span>{(profile?.fullName || "Name").toUpperCase()}</span>
                            </div>
                            <div className="mb-3 d-flex">
                                <span className="me-3" style={{ width: 130, color: "#caff01" }}>Date of birth:</span>
                                <span>{profile?.dob || "Birth"}</span>
                            </div>
                            <div className="mb-3 d-flex">
                                <span className="me-3" style={{ width: 130, color: "#caff01" }}>Phone number:</span>
                                <span>{profile1?.phone || "Phone"}</span>
                            </div>
                            <div className="mb-3 d-flex">
                                <span className="me-3" style={{ width: 130, color: "#caff01" }}>Email:</span>
                                <span>{profile1?.email || "Gmail"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};
export default Profile;