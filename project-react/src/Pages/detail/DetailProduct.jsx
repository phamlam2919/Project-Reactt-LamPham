import React, { useEffect, useState } from "react";
import Header from "../../commons/header/Header";
import "./detail.css";
import { InputNumber } from "antd";
import Footer from "../../commons/footer/Footer";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function DetailProduct() {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
    useEffect(() => {
        axios
            .get(`http://localhost:8000/users/${userId}`)
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => console.log(err));
    }, []);
    console.log(user);
    const onChange = (value) => {
        console.log("changed", value);
    };
    const [product, setProduct] = useState({});
    const { id } = useParams();
    React.useEffect(() => {
        axios.get(`http://localhost:8000/product/${id}`).then((response) => {
            setProduct(response.data);
        });
    }, [id]);

    const addToCart = (id) => {
        const existingProduct = user.cart.find((product) => product.id === id);
        let updatedCart;

        if (existingProduct) {
            updatedCart = user.cart.map((product) =>
                product.id === id
                    ? { ...product, quantity: product.quantity + 1 }
                    : product
            );
            setUser((prevUser) => ({ ...prevUser, cart: updatedCart }));
        } else {
            const productToAdd = { id: id, quantity: 1 };
            updatedCart = [...user.cart, productToAdd];
            setUser((prevUser) => ({ ...prevUser, cart: updatedCart }));
        }

        axios
            .patch(`http://localhost:8000/users/${userId}`, {
                cart: updatedCart,
            })
            .then(() => {
                Swal.fire(
                    "Good job!",
                    "Đã Thêm Thành Công Vào Giỏ Hàng!",
                    "success",
                    "OK"
                ).then((result) => {
                    if (result.isConfirmed) {
                        navigate("/cart");
                    }
                });
            })
            .catch((error) => {
                console.error("Lỗi khi add cart:", error);
            });
    };
    return (
        <div>
            <Header />

            <div className="detail">
                <div className="detail-image">
                    <img src={product.img} alt="" />
                </div>
                <div className="combo">
                    <h1>{product.title}</h1>
                    <p>{product.text}</p>
                    <hr />

                    <div className="input-number">
                        {/* <Link to="/cart"> */}
                        <button onClick={() => addToCart(product)}>
                            Thêm vào giỏ ({product.price}₫)
                        </button>
                        {/* </Link> */}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default DetailProduct;
