import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Help from "./components/Help/Help";
import Details from "./components/Details/Details";
import ProductsList from "./components/ProductsList/ProductsList";
import Cart from "./components/Cart/Cart";
import './global.css'
import CreateProduct from "./components/CreateProduct/CreateProduct";
import WishList from "./components/WishList/WishList";
import RegisterPage from "./components/RegisterPage/RegisterPage"
import ArmaTuPC from "./components/ArmaTuPc/ArmaTuPC";
import LoginPage from "./components/LoginPage/LoginPage";
import DashBoard from "./components/Admin/DashBoard/DashBoard";
import Footer from "./components/Footer/Footer";
import DetailsAdmin from "./components/Admin/DetailsAdmin/DetailsAdmin";
import Profile from "./components/Profile/Profile";
import PaymentMethod from "./components/PaymentMethod/PaymentMethod.jsx";
import Payment from "./components/Payment/Payment";

import PaymentMercaPago from "./components/PaymentMethodMercaPago.jsx/PaymentMercaPago";

import PaymentHistory from "./components/Admin/PaymentHistory/PaymentHistory";
import PaymentList from "./components/Admin/PaymentList/PaymentList";
import UserProfile from "./components/Admin/UserProfile/UserProfile";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/help" element={<Help />} />
        <Route exact path="/product/:id" element={<Details />} />
        <Route exact path="/products" element={<ProductsList />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/createProduct" element={<CreateProduct />} />
        <Route exact path="/wishlist" element={<WishList/>} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route exact path="/ArmaTuPc" element={<ArmaTuPC />} />
        <Route exact path="/Login" element={<LoginPage />} />
        <Route exact path="/Dashboard" element={<DashBoard/>} />
        <Route exact path="/paymentMethod" element={<PaymentMethod />} />
        <Route exact path="/paymentMethod/Checkout" element={<Payment />} />
        <Route exact path="/paymentMethod/MercadoPago" element={<PaymentMercaPago />} />
        <Route exact path="/detailsAdmin/:id" element={<DetailsAdmin />} />
        <Route exact path="/MyProfile" element={<Profile />} />
        <Route exact path="/payments/:id" element={<PaymentHistory></PaymentHistory>} />
        <Route exact path="/totalPayment" element={<PaymentList/>} />
        <Route exact path="/userProfile/:id" element={<UserProfile/>}/>
      </Routes>
      <Footer />
    </>
  );
}
