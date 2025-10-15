import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Membership from "./Pages/Membership/Membership";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import Shop from "./Pages/Shop/Shop";
import ShopCore from "./Pages/ShopCore/ShopCore";
import ShopArtist from "./Pages/ShopArtist/ShopArtist";
import ShopViewDetail from "./Pages/ShopViewDetail/ShopViewDetail";
import ShopCart from "./Pages/ShopCart/ShopCart";
import Profile from "./Pages/Profile/Profile";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
import AdminSideBar from "./Components/AdminSideBar/AdminSideBar";
import ManageBag from "./Pages/ManageBag/ManageBag";
import LayoutAdmin from "./Components/LayoutAdmin/LayoutAdmin";
import ProtectedRoutesAdmin from "./Utils/ProtectedRoutesAdmin";
import ViewDetailBag from "./Pages/ManageBag/ViewDetailBag";
import ManageCollection from "./Pages/ManageCollection/ManageCollection";
import ViewDetailCollection from "./Pages/ManageCollection/ViewDetailCollection";
import ManageCustomer from "./Pages/ManageCustomer/ManageCustomer";
import ViewDetailCustomer from "./Pages/ManageCustomer/ViewDetailCustomer";
import ManageOrder from "./Pages/ManageOrder/ManageOrder";
import AboutUs from "./Pages/AboutUs/AboutUs";
import Blog from "./Pages/Blog/Blog";
import Custom from "./Pages/Custom/Custom";
import ManageStaff from "./Pages/ManageStaff/ManageStaff";
import ViewDetailStaff from "./Pages/ManageStaff/ViewDetailStaff";
import LoadingPage from "./Pages/LoadingPage/LoadingPage";
import { useEffect, useState } from "react";
import VerifiedPage from "./Pages/SignUp/VerifiedPage";
import i18n from "./i18n/i18n";
import { I18nextProvider } from "react-i18next";
function App() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);
  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <ScrollToTop />
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/custom" element={<Custom />} />
          <Route path="/shop/core-collection" element={<ShopCore />} />
          <Route path="/shop/core-collection/:id" element={<ShopViewDetail />} />
          <Route path="/shop/artist-collection" element={<ShopArtist />} />
          <Route path="/shop/artist-collection/:id" element={<ShopViewDetail />} />
          <Route path="/shop/cart" element={<ShopCart />} />
          <Route path="/customer/profile" element={<Profile />} />
          <Route path="/verified" element={<VerifiedPage />} />


          <Route element={<ProtectedRoutesAdmin />}>
            <Route path='/admin' element={<LayoutAdmin />}>
              <Route path="manage-bag" element={<ManageBag />} />
              <Route path="manage-bag/view/:id" element={<ViewDetailBag />} />
              <Route path="manage-collection" element={<ManageCollection />} />
              <Route path="manage-collection/view/:id" element={<ViewDetailCollection />} />
              <Route path="manage-staff" element={<ManageStaff />} />
              <Route path="manage-staff/view/:id" element={<ViewDetailStaff />} />
              <Route path="manage-customer" element={<ManageCustomer />} />
              <Route path="manage-customer/view/:id" element={<ViewDetailCustomer />} />
              <Route path="manage-order" element={<ManageOrder />} />
            </Route>
          </Route>



        </Routes>
      </Router >
    </I18nextProvider>
  );
}

export default App;
