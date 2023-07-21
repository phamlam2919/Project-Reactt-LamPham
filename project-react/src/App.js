import logo from "./logo.svg";
import "./App.css";
import Header from "./commons/header/Header";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/login/Login";
import Register from "./Pages/register/Register";
import Shop from "./Pages/shop/Shop";
import ShopAdd from "./Amin/shopListfood/ShopAdd";
import DetailProduct from "./Pages/detail/DetailProduct";
import Cart from "./Pages/cart/Cart";
import Pay from "./Pages/Pay/Pay";
import { Navigate, Route, Routes } from "react-router-dom";
import ListFood from "./commons/listfood/ListFood";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Amin from "./Amin/Amin";
import ShopEdit from "./Amin/shopListfood/ShopEdit";
import AddUser from "./Amin/users/AddUser";
import LoginAdmin from "./Amin/LoginAdmin/LoginAdmin";
function App() {
    const isLoggedIn = !!localStorage.getItem("isAdminAuthenticated");
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/pay" element={<Pay />} />
                <Route path="/detail/:id" element={<DetailProduct />} />
            </Routes>
            <Routes>
                <Route
                    path="/admin"
                    element={
                        isLoggedIn ? (
                            <Amin />
                        ) : (
                            <Navigate to="/login-admin" replace />
                        )
                    }
                />
                <Route path="/login-admin" element={<LoginAdmin />} />
                <Route element={<LoginAdmin />}></Route>
                <Route path="/admin" element={<Amin />} />
                <Route path="/shopadd" element={<ShopAdd />} />
                <Route path="/product/edit/:id" element={<ShopEdit />} />
                <Route path="/adduser" element={<AddUser />} />
            </Routes>

            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}

export default App;
