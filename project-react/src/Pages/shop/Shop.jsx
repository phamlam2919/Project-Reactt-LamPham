import React, { useEffect, useState } from "react";
import Header from "../../commons/header/Header";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./shop.css";
import axios from "axios";
import Footer from "../../commons/footer/Footer";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function Shop() {
    const [user, setUser] = useState({});
    const userId = localStorage.getItem("userId");

    const createNewUser = () => {
        const newCart = { cart: [] };
        axios
            .post("http://localhost:8000/users", newCart)
            .then((response) => {
                const newUserId = response.data.id;
                localStorage.setItem("userId", newUserId);
                setUser({ id: newUserId, cart: [] });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        const existingUserId = localStorage.getItem("userId");
        if (existingUserId) {
            axios
                .get(`http://localhost:8000/users/${existingUserId}`)
                .then((res) => {
                    setUser(res.data);
                })
                .catch((err) => console.log(err));
        } else {
            createNewUser();
        }
    }, []);

    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8000/product").then((response) => {
            setData(response.data);
        });
    }, []);

    const addToCart = (id) => {
        const existingProduct = user.cart.find((product) => product.id === id);
        let updatedCart;
        console.log(existingProduct);

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
                notify(id);
            })
            .catch((error) => {
                console.error("Lỗi khi add cart:", error);
                Swal.fire("Oops...", "Lỗi khi add cart!", "error");
            });
    };

    const notify = () => {
        toast.success("Đã Thêm Thành Công Vào giỏ hàng", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

    return (
        <div>
            <Header />
            <div className="container">
                {data
                    .sort((a, b) => b.price - a.price)
                    .map((element, index) => (
                        <Card className="card" key={index}>
                            <Link
                                style={{
                                    color: "black",
                                    textDecoration: "none",
                                }}
                                to={`/detail/${element.id}`}
                            >
                                <Card.Img variant="top" src={element.img} />
                                <Card.Body className="dodai">
                                    <Card.Title>{element.title}</Card.Title>
                                    <Card.Text>{element.text}</Card.Text>
                                </Card.Body>
                            </Link>
                            <Card.Footer className="card-footer">
                                <p>{element.price}₫</p>
                                <Button
                                    onClick={() => addToCart(element)}
                                    variant="primary"
                                >
                                    Thêm
                                </Button>
                            </Card.Footer>
                        </Card>
                    ))}
            </div>
            <Footer />
        </div>
    );
}

export default Shop;
