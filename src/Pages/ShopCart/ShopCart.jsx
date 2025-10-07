import React, { useEffect, useState } from "react";
import AxiosSetup from "../../Services/AxiosSetup";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { fetchProfileCustomer } from "../../Services/Profile";
import './ShopCart.css';
import { Toast } from "bootstrap";
import { toast } from "react-toastify";

const ShopCart = () => {
    const [cart, setCart] = useState([]);
    const [coupons, setCoupons] = useState([]);
    const [selectedCoupon, setSelectedCoupon] = useState(null);
    const [currentTab, setCurrentTab] = useState(1);
    const [profile, setProfile] = useState(null);
    const [profile1, setProfile1] = useState(null);
    const [qrUrl, setQrUrl] = useState(null);
    const [paymentId, setPaymentId] = useState(null);


    const fetchCart = async (page = 0, size = 12) => {
        try {
            const response = await AxiosSetup.get(`/customers/me/carts?page=${page}&size=${size}`);
            setCart(response.data.data.content);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchCoupon = async () => {
        try {
            const response = await AxiosSetup.get("/coupons");
            setCoupons(response.data.data || []);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchProfile = async () => {
        try {
            const data = await fetchProfileCustomer();
            setProfile(data)
            setProfile1(data.userResponse)

        } catch (error) {
            console.log(error)
        }
    };


    const deleteCart = async (cartId) => {
        try {
            await AxiosSetup.delete(`/carts/${cartId}`);
            fetchCart();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchCart();
        fetchCoupon();
        fetchProfile();
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentTab]);

    const changeQuantity = async (item, delta) => {
        if (item.quantity + delta < 1) return;
        try {
            await AxiosSetup.post("/carts", {
                bagId: item.bagResponse.id,
                quantity: delta,
                totalPrice: item.bagResponse.price * delta,
            });

            setCart((prevCart) =>
                prevCart.map((c) =>
                    c.cartId === item.cartId
                        ? { ...c, quantity: c.quantity + delta }
                        : c
                )
            );
        } catch (error) {
            console.log(error);
        }
    };

    const creatingOrder = async () => {
        try {
            const orderPayload = {
                address: profile1?.address || '',
                couponId: selectedCoupon ? selectedCoupon.couponId : null,
                subTotal: subTotal,
                feeOfDelivery: 0,
                total: total,
                method: document.querySelector('input[name="paymentMethod"]:checked')?.value || 'COD',
                createDetailRequests: cart.map(item => ({
                    cartId: item.cartId,
                    bagId: item.bagResponse.id,
                    quantity: item.quantity,
                    totalPrice: item.bagResponse.price * item.quantity,
                }))
            };

            const response = await AxiosSetup.post("/orders", orderPayload);
            console.log("Order created:", response.data);
            if (orderPayload.method === "CARD") {
                const paymentId = response.data.data.paymentResponse.paymentId;
                setPaymentId(paymentId);
                const paymentRes = await AxiosSetup.post(`/payments?paymentId=${paymentId}&amount=${orderPayload.total}`);
                setQrUrl(paymentRes.data.data.urlQR);
                setCurrentTab(3);
            } else {
                setCurrentTab(4);
            }

        } catch (error) {
            console.log("Error creating order:", error);
        }
    };

    const checkPaymentStatus = async () => {
        try {
            if (!paymentId) return;

            const res = await AxiosSetup.get(`/payments/${paymentId}/check-status`);
            const status = res.data?.data?.status

            if (status === "PAID" || status === true) {
                setCurrentTab(4);
            } else {
                alert("Thanh toán chưa được xác nhận. Vui lòng thử lại sau!");
            }
        } catch (error) {
            console.log(error);
            alert("Có lỗi xảy ra khi kiểm tra trạng thái thanh toán!");
        }
    };





    const subTotal = cart.reduce(
        (sum, item) => sum + item.bagResponse.price * item.quantity,
        0
    );
    const discountAmount = selectedCoupon
        ? subTotal * selectedCoupon.discount
        : 0;
    const total = subTotal - discountAmount;

    return (
        <>
            <Navbar />
            <div className="container my-5">
                <h2
                    style={{ textAlign: "center", fontWeight: "bold" }}
                    className="py-5 textPlatForm"
                >
                    {currentTab === 2 ? "CHECKOUT" : currentTab === 3 ? "COMPLETE !!" : "CART"}
                </h2>

                <div className="d-flex justify-content-center mb-5">
                    <div className={`me-5 textDmSan border-bottom border-2 pb-1 ${currentTab >= 1 ? 'text-dark fw-bold border-dark' : 'text-muted'}`} >
                        <span className={`badge ${currentTab >= 1 ? 'bg-primary' : 'bg-secondary'} me-2`}>1</span>
                        Shopping cart
                    </div>

                    <div className={`me-5 border-bottom border-2 ${currentTab >= 2 ? 'text-dark fw-bold border-dark' : 'text-muted'}`} >
                        <span className={`badge ${currentTab >= 2 ? 'bg-primary' : 'bg-secondary'} me-2`}>2</span>
                        Checkout details
                    </div>

                    <div className={`me-5 border-bottom border-2 ${currentTab >= 3 ? 'text-dark fw-bold border-dark' : 'text-muted'}`} >
                        <span className={`badge ${currentTab >= 3 ? 'bg-primary' : 'bg-secondary'} me-2`}>3</span>
                        QR Pay
                    </div>

                    <div className={`border-bottom border-2 ${currentTab >= 4 ? 'text-dark fw-bold border-dark' : 'text-muted'}`}  >
                        <span className={`badge ${currentTab >= 4 ? 'bg-primary' : 'bg-secondary'} me-2`}>4</span>
                        Order completed
                    </div>

                </div>



                <div className="row">
                    <div className="col-md-8 textDmSan">
                        {currentTab === 1 && (
                            <>
                                {cart.length === 0 ? (
                                    <div className="text-center py-5 text-muted">
                                        Please select something to buy in Tí.lab shop
                                    </div>
                                ) : (
                                    <table className="table align-middle textDmSan">
                                        <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th style={{ width: "150px" }}>Quantity</th>
                                                <th>Total</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cart.map((item, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <img
                                                                src={
                                                                    item.bagResponse.bagImages[0].url
                                                                        ? encodeURI(item.bagResponse.bagImages[0].url)
                                                                        : `https://picsum.photos/300/250?`
                                                                }
                                                                alt={item.bagResponse.name}
                                                                style={{ width: "60px", marginRight: "10px" }}
                                                            />
                                                            <div>
                                                                <strong>{item.bagResponse.name}</strong>
                                                                <p className="text-muted mb-0">
                                                                    Color: #{item.bagResponse.color}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="d-inline-flex align-items-center rounded p-1" style={{ backgroundColor: "#EEEEEE" }}>
                                                            <button
                                                                className="btn btn-sm border-0 bg-transparent text-muted px-2"
                                                                onClick={() => changeQuantity(item, -1)}
                                                                disabled={item.quantity <= 1}
                                                            >
                                                                <i className="bi bi-dash"></i>
                                                            </button>

                                                            <span className="mx-2 fw-medium text-dark">
                                                                {item.quantity}
                                                            </span>

                                                            <button
                                                                className="btn btn-sm border-0 bg-transparent text-muted px-2"
                                                                onClick={() => changeQuantity(item, 1)}
                                                                disabled={item.quantity >= item.bagResponse.quantity}
                                                            >
                                                                <i className="bi bi-plus"></i>
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {(item.bagResponse.price * item.quantity).toLocaleString()} VND
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="btn btn-sm btn-outline-danger"
                                                            onClick={() => deleteCart(item.cartId)}
                                                        >
                                                            <FaTrash />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                                <Link to={"/shop"} className="btn btn-outline-dark mb-4 textDmSan">
                                    Update Cart
                                </Link>
                            </>
                        )}


                        {/*checkout detail */}
                        {currentTab === 2 && (
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-lg-8 col-md-10 col-sm-12">
                                        <div className="card shadow-sm" style={{ borderRadius: '15px' }}>
                                            <div className="card-body p-4">

                                                {/* Contact */}
                                                <div className="mb-4">
                                                    <h5 className="fw-semibold mb-3">Contact</h5>
                                                    <div className="form-floating mb-3">
                                                        <input
                                                            type="email"
                                                            className="form-control form-control-lg"
                                                            id="email"
                                                            placeholder="Email"
                                                            value={profile1?.email || ''}
                                                            onChange={(e) => setProfile1({ ...profile1, email: e.target.value })}
                                                            disabled
                                                            style={{
                                                                backgroundColor: '#f8f9fa',
                                                                borderRadius: '8px',
                                                                border: '2px solid #dee2e6',
                                                                fontSize: '14px'
                                                            }}
                                                        />
                                                        <label htmlFor="email" className="text-secondary">Email</label>
                                                    </div>
                                                </div>

                                                {/* Address */}
                                                <div className="mb-4">
                                                    <h5 className="fw-semibold mb-3">Shopping address</h5>

                                                    <div className="form-floating mb-3">
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-lg"
                                                            id="fullName"
                                                            placeholder="Full Name"
                                                            value={profile.fullName}
                                                            onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                                                            disabled
                                                            style={{
                                                                backgroundColor: '#f8f9fa',
                                                                borderRadius: '8px',
                                                                border: '2px solid #dee2e6',
                                                                fontSize: '14px'
                                                            }}
                                                        />
                                                        <label htmlFor="fullName" className="text-secondary">Full Name</label>
                                                    </div>

                                                    <div className="form-floating mb-3">
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-lg"
                                                            id="address"
                                                            placeholder="Address"
                                                            value={profile1?.address || ''}
                                                            onChange={(e) => setProfile1({ ...profile1, address: e.target.value })}
                                                            style={{
                                                                backgroundColor: '#f8f9fa',
                                                                borderRadius: '8px',
                                                                border: '2px solid #dee2e6'
                                                            }}
                                                        />
                                                        <label htmlFor="address" className="text-secondary">Address</label>
                                                    </div>

                                                    <div className="form-floating mb-3">
                                                        <input
                                                            type="tel"
                                                            className="form-control form-control-lg"
                                                            id="phone"
                                                            placeholder="Phone"
                                                            value={profile1?.phone || ''}
                                                            onChange={(e) => setProfile1({ ...profile1, phone: e.target.value })}
                                                            style={{
                                                                backgroundColor: '#f8f9fa',
                                                                borderRadius: '8px',
                                                                border: '2px solid #dee2e6'
                                                            }}
                                                        />
                                                        <label htmlFor="phone" className="text-secondary">Phone</label>
                                                    </div>
                                                </div>

                                                {/* Payment */}
                                                <div className="mb-3">
                                                    <h5 className="fw-semibold mb-3">Pay</h5>

                                                    <div className="mb-3">
                                                        <div className="card border-2" style={{ borderRadius: '8px', borderColor: '#dee2e6', backgroundColor: '#f8f9fa' }}>
                                                            <div className="card-body py-3">
                                                                <div className="form-check">
                                                                    <input
                                                                        className="form-check-input"
                                                                        type="radio"
                                                                        name="paymentMethod"
                                                                        id="CARD"
                                                                        value="CARD"
                                                                        style={{ accentColor: '#28a745' }}
                                                                    />
                                                                    <label className="form-check-label fw-normal" htmlFor="CARD">
                                                                        Payment via VNPAY-QR
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="mb-3">
                                                        <div className="card border-2" style={{ borderRadius: '8px', borderColor: '#28a745', backgroundColor: '#e8f5e8' }}>
                                                            <div className="card-body py-3">
                                                                <div className="form-check">
                                                                    <input
                                                                        className="form-check-input"
                                                                        type="radio"
                                                                        name="paymentMethod"
                                                                        id="COD"
                                                                        value="COD"
                                                                        defaultChecked
                                                                        style={{ accentColor: '#28a745' }}
                                                                    />
                                                                    <label className="form-check-label fw-normal" htmlFor="COD">
                                                                        Cash on Delivery (COD)
                                                                    </label>
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
                        )}



                    </div>
                    {/*complete */}
                    {currentTab === 4 && (
                        <div className="container d-flex align-items-center justify-content-center">
                            <div className="row justify-content-center w-100 textDmSan">
                                <div className="col-lg-6 col-md-8 col-sm-10">
                                    <div className="card shadow-sm border-0" style={{ borderRadius: '15px', backgroundColor: '#f8f9fa' }}>
                                        <div className="card-body text-center py-5">
                                            <div className="mb-4">
                                                <div
                                                    className="d-inline-flex align-items-center justify-content-center rounded-circle"
                                                    style={{ width: '80px', height: '80px', backgroundColor: '#28a745', color: 'white' }}
                                                >
                                                    <svg width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
                                                        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                                                    </svg>
                                                </div>
                                            </div>

                                            <div className="mb-4">
                                                <h2 className="fw-light text-uppercase mb-0" style={{ letterSpacing: '2px', fontSize: '24px' }}>
                                                    YOUR ORDER
                                                </h2>
                                                <h2 className="fw-light text-uppercase" style={{ letterSpacing: '2px', fontSize: '24px' }}>
                                                    HAS BEEN RECEIVED
                                                </h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/*QR */}
                    {currentTab === 3 && qrUrl && (
                        <div className="container d-flex align-items-center justify-content-center">
                            <div className="card shadow-sm p-4 text-center">
                                <h4>Scan QR Code to pay</h4>
                                <img src={qrUrl} alt="QR Payment" style={{ width: "300px", margin: "20px auto" }} />
                                <button
                                    className="btn mt-3 fw-bold"
                                    onClick={checkPaymentStatus}
                                    style={{ backgroundColor: "#0168EB", color: "white" }}
                                >
                                    Checkout Transaction
                                </button>
                            </div>
                        </div>
                    )}




                    {(currentTab === 1 || currentTab === 2) && (
                        <div className="col-md-4">
                            <div className="border p-3 rounded textDmSan">
                                <h6>Order Summary</h6>

                                {/* voucher */}
                                <div className="d-flex mb-3">
                                    <select
                                        className="form-select"
                                        value={selectedCoupon ? selectedCoupon.couponId : ""}
                                        onChange={(e) => {
                                            const chosen = coupons.find(
                                                (c) => c.couponId === Number(e.target.value)
                                            );
                                            setSelectedCoupon(chosen || null);
                                        }}
                                    >
                                        <option value=""> Discount voucher </option>
                                        {coupons.map((coupon) => (
                                            <option key={coupon.couponId} value={coupon.couponId}>
                                                {coupon.code} - Discount  {coupon.discount * 100}%
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {selectedCoupon && (
                                    <div className="d-flex justify-content-between mb-2">
                                        <span>
                                            {selectedCoupon.code} ({selectedCoupon.discount * 100}%)
                                        </span>
                                        <span className="text-danger">
                                            -{discountAmount.toLocaleString()} VND
                                        </span>
                                    </div>
                                )}

                                <div className="d-flex justify-content-between mb-2">
                                    <span>Delivery fee</span>
                                    <span>0 VND</span>
                                </div>
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Sub Total</span>
                                    <span>{subTotal.toLocaleString()} VND</span>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between mb-3">
                                    <strong>Total</strong>
                                    <strong>{total.toLocaleString()} VND</strong>
                                </div>
                                <div className="d-flex gap-2">
                                    {currentTab === 2 && (
                                        <button
                                            className="btn btn-outline-secondary w-50 textDmSan"
                                            onClick={() => setCurrentTab(1)}
                                        >
                                            Back
                                        </button>
                                    )}
                                    <button
                                        className={`textDmSan btn w-100 ${currentTab === 1 ? 'btn-primary' : 'btn-primary'}`}
                                        onClick={() => {
                                            if (currentTab === 1) {
                                                setCurrentTab(2);
                                            } else {
                                                if (!profile1?.address?.trim() || !profile1?.phone?.trim()) {
                                                    toast.warn("Please enter address and phone!");
                                                    return;
                                                }

                                                creatingOrder();
                                            }
                                        }}
                                        disabled={currentTab === 1 && cart.length === 0}
                                        style={{
                                            backgroundColor: currentTab === 1 && cart.length === 0 ? '#6c757d' : '',
                                            borderColor: currentTab === 1 && cart.length === 0 ? '#6c757d' : '',
                                        }}
                                    >
                                        {currentTab === 1 ? 'Checkout Now' : 'Order'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div >
            <Footer />
        </>
    );
};

export default ShopCart;
