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
function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>


        <Route path="/" element={<Home />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/core-collection" element={<ShopCore />} />
        <Route path="/shop/core-collection/:id" element={<ShopViewDetail />} />
        <Route path="/shop/artist-collection" element={<ShopArtist />} />
        <Route path="/shop/artist-collection/:id" element={<ShopViewDetail />} />
        <Route path="/shop/cart" element={<ShopCart />} />
        <Route path="/customer/profile" element={<Profile />} />


        <Route element={<ProtectedRoutesAdmin />}>
          <Route path='/admin' element={<LayoutAdmin />}>
            <Route path="manage-bag" element={<ManageBag />} />
            <Route path="manage-bag/view/:id" element={<ViewDetailBag />} />
          </Route>
        </Route>



      </Routes>
    </Router >
  );
}

export default App;
