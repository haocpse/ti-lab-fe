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
      </Routes>
    </Router >
  );
}

export default App;
