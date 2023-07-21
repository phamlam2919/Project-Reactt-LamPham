import React, { useEffect, useState } from "react";
import Header from "../../commons/header/Header";
import "./cart.css";
import { InputNumber } from "antd";
import Footer from "../../commons/footer/Footer";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";

function Cart() {
    const [user, setUser] = useState({});
    const [cartItems, setCartItems] = useState([]);
    const userId = localStorage.getItem("userId");

    const getUser = async () => {
        await axios
            .get(`http://localhost:8000/users/${userId}`)
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        getUser();
    }, [userId]);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/users/${userId}`)
            .then((response) => {
                setCartItems(response.data.cart);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [userId]);

    const removeFromCart = (productId) => {
        const updatedCart = cartItems.filter(
            (product) => product.id.id !== productId
        );
        setCartItems(updatedCart);

        axios
            .patch(`http://localhost:8000/users/${userId}`, {
                cart: updatedCart,
            })
            .then(() => {
                console.log("Cart updated successfully");
            })
            .catch((error) => {
                console.error("Error updating cart:", error);
            });
    };

    const updateQuantity = (productId, quantity) => {
        const updatedCart = cartItems.map((product) =>
            product.id.id === productId
                ? { ...product, quantity: quantity }
                : product
        );
        setCartItems(updatedCart);

        axios
            .patch(`http://localhost:8000/users/${userId}`, {
                cart: updatedCart,
            })
            .then(() => {
                console.log("Cart updated successfully");
            })
            .catch((error) => {
                console.error("Error updating cart:", error);
            });
    };

    const calculateTotalPrice = () => {
        let total = 0;
        cartItems.forEach((product) => {
            total += product.id.price * product.quantity;
        });
        return total;
    };

    console.log(cartItems);
    return (
        <div>
            <Header />
            <div>
                <h1 className="cart-h1">Giỏ hàng của tôi</h1>
                <div className="cart-tong">
                    <div className="carttt">
                        {cartItems
                            ?.map((product, index) => (
                                <div className="cart1" key={index}>
                                    {console.log(product.id)}
                                    <img
                                        className="image-cart"
                                        src={product.id.img}
                                        alt=""
                                    />
                                    <div className="cart-combo">
                                        <p style={{ fontWeight: "700" }}>
                                            {product.id.title}
                                        </p>
                                        <p className="combo-detail">
                                            {product.id.text}
                                        </p>
                                        <div className="cart-i">
                                            <i
                                                className="fa-solid fa-trash-can"
                                                onClick={() =>
                                                    removeFromCart(
                                                        product.id.id
                                                    )
                                                }
                                            ></i>
                                            <InputNumber
                                                className="cart-inputnumber"
                                                min={1}
                                                max={10000}
                                                defaultValue={product.quantity}
                                                onChange={(value) =>
                                                    updateQuantity(
                                                        product.id.id,
                                                        value
                                                    )
                                                }
                                            />
                                        </div>
                                        <p style={{ fontWeight: "700" }}>
                                            {product.id.price}₫
                                        </p>
                                    </div>
                                </div>
                            ))
                            .reverse()}
                    </div>
                    <div className="cart2">
                        <h4>Thanh Toán</h4>
                        <hr />
                        <div className="textline">
                            <p>Bạn có Mã giảm giá?</p>
                            <div className="input-container">
                                <input
                                    placeholder="Mã giảm giá"
                                    className="input-field"
                                    type="text"
                                />
                                <label
                                    htmlFor="input-field"
                                    className="input-label"
                                >
                                    Mã giảm giá
                                </label>
                                <span className="input-highlight" />
                                <button>Áp Dụng</button>
                            </div>
                            <hr />

                            <div className="mony">
                                <span>Tổng đơn hàng</span>
                                <span>{calculateTotalPrice()}.000₫</span>
                            </div>

                            <div className="mony1">
                                <span>Tổng thanh toán</span>
                                <span>{calculateTotalPrice()}.000₫</span>
                            </div>
                        </div>
                        <hr />
                        <NavLink style={{ textDecoration: "none" }} to="/pay">
                            <button className="mony2">
                                <span>Thanh Toán</span>
                                <span>{calculateTotalPrice()}.000₫</span>
                            </button>
                        </NavLink>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Cart;
