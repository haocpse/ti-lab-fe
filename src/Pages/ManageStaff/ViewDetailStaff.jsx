import React, { useEffect, useState } from "react";
import AxiosSetup from "../../Services/AxiosSetup";
import { useParams, useNavigate } from "react-router-dom";
import avt from "../../assets/hinhdaidien.jpg"

const ViewDetailStaff = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const fetchProfile = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await AxiosSetup.get(`/staffs/${id}`);
            if (response.data.code === 200) {
                setProfile(response.data.data);
            } else {
                setError('Unable to load customer information');
            }
        } catch (error) {
            console.error("Error loading customer information:", error);
            setError('An error occurred while loading data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchProfile();
        }
    }, [id]);

    const formatPoints = (points) => {
        return points?.toLocaleString() || '0';
    };

    const getRoleBadge = (role) => {
        switch (role) {
            case 'ADMIN':
                return 'bg-danger';
            case 'MANAGER':
                return 'bg-warning';
            case 'STAFF':
                return 'bg-info';
            case 'CUSTOMER':
                return 'bg-success';
            default:
                return 'bg-secondary';
        }
    };

    const getMembershipBadge = (membershipName) => {
        switch (membershipName?.toLowerCase()) {
            case 'seed':
                return 'bg-success';
            case 'grow':
                return 'bg-warning';
            case 'glow':
                return 'bg-secondary';
            case 'gold':
                return 'bg-warning text-dark';
            default:
                return 'bg-primary';
        }
    };

    if (loading) {
        return (
            <div className="container-fluid py-5">
                <div className="row">
                    <div className="col-12 text-center">
                        <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-3 text-muted">Loading customer information...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !profile) {
        return (
            <div>
                <p className="text-center text-danger">View detail fail!</p>
                <button
                    className="btn btn-primary"
                    onClick={() => navigate('/admin/manage-staff')}
                >
                    <i className="fas fa-arrow-left"></i> Back to Admin Page
                </button>
            </div>
        )
    }


    return (
        <div className="container-fluid py-4">
            <div className="row mb-4">
                <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            <button
                                className="btn btn-outline-secondary me-3"
                                onClick={() => navigate('/admin/manage-staff')}
                                title="Back to customer list"
                            >
                                <i className="fas fa-arrow-left"></i>
                            </button>
                        </div>


                        <div className="btn-group" role="group">
                            <button
                                className="btn btn-outline-danger"
                                onClick={() => console.log('Ban customer:', profile.userResponse.id)}
                            >
                                <i className="fas fa-ban"></i> Ban Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mb-4">
                <div className="col-12">
                    <div className="card shadow-sm border-0" style={{ borderRadius: '15px' }}>
                        <div className="card-body p-4">
                            <div className="row">
                                <div className="col-md-4 text-center">
                                    <div className="mb-3">
                                        <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto overflow-hidden" style={{ width: '120px', height: '120px' }} >
                                            <img src={avt} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                    </div>


                                    <h3 className="mb-2">{profile.fullName}</h3>
                                    <p className="text-muted mb-3">@{profile.userResponse.username}</p>

                                    <div className="d-flex flex-column gap-2 align-items-center">
                                        <span className={`badge ${getRoleBadge(profile.role)} fs-6`}>
                                            <i className="fas fa-user-tag"></i> {profile.role}
                                        </span>

                                        <span className={`badge ${profile.userResponse.active ? 'bg-success' : 'bg-danger'} fs-6`}>
                                            <i className={`fas ${profile.userResponse.active ? 'fa-check-circle' : 'fa-times-circle'}`}></i>
                                            {profile.userResponse.active ? 'Active' : 'Banned'}
                                        </span>

                                        {profile.userResponse.reasonBan && (
                                            <div className="alert alert-warning mt-2 small">
                                                <strong>Ban Reason:</strong> {profile.userResponse.reasonBan}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="col-md-8">
                                    <h5 className="mb-3">
                                        <i className="fas fa-info-circle text-primary"></i> Account Information
                                    </h5>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="fw-semibold text-muted small">User ID:</label>
                                                <p className="mb-0 font-monospace">
                                                    {profile.userResponse.id}
                                                </p>
                                            </div>

                                            <div className="mb-3">
                                                <label className="fw-semibold text-muted small">Email:</label>
                                                <p className="mb-0">
                                                    <i className="fas fa-envelope text-muted me-1"></i>
                                                    {profile.userResponse.email}
                                                </p>
                                            </div>

                                            <div className="mb-3">
                                                <label className="fw-semibold text-muted small">Phone Number:</label>
                                                <p className="mb-0">
                                                    <i className="fas fa-phone text-muted me-1"></i>
                                                    {profile.userResponse.phone ||
                                                        <span className="text-muted fst-italic">Not provided</span>
                                                    }
                                                </p>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="fw-semibold text-muted small">User Name:</label>
                                                <p className="mb-0">
                                                    <i className="fas fa-user text-muted me-1"></i>
                                                    {profile.userResponse.username}
                                                </p>
                                            </div>

                                            <div className="mb-3">
                                                <label className="fw-semibold text-muted small">Loyalty Points:</label>
                                                <p className="mb-0">
                                                    <i className="fas fa-star text-warning me-1"></i>
                                                    <span className="fw-bold text-success">
                                                        {formatPoints(profile.point)} points
                                                    </span>
                                                </p>
                                            </div>

                                            <div className="mb-3">
                                                <label className="fw-semibold text-muted small">Membership Tier:</label>
                                                <div>
                                                    <span className={`badge ${getMembershipBadge(profile.membershipResponse?.name)} fs-6`}>
                                                        <i className="fas fa-crown"></i>
                                                        {profile.membershipResponse?.name?.toUpperCase() || 'UNDEFINED'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewDetailStaff;