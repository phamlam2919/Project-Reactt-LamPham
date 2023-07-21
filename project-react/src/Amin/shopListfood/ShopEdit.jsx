import React, { useEffect, useState } from "react";
import "./shopadd.css";
import axios from "axios";

import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
function ShopEdit() {
    const [data, setData] = useState({
        img: "",
        title: "",
        text: "",
        price: "",
    });

    const { img, title, text, price } = data;

    const handleChangeInput = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const naviGate = useNavigate();
    const { id } = useParams();
    const loadUser = async () => {
        let result = await axios.get(`http://localhost:8000/product/${id}`);
        setData(result.data);
    };

    useEffect(() => {
        loadUser();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8000/product/${id}`, data);
        naviGate("/admin");
    };
    return (
        <div>
            <div className="mx-auto shadow p-5 w-75">
                <h1> EDIT TO SHOP</h1>
                <form action="" onSubmit={handleSubmit}>
                    <div>
                        <label>img: </label>
                        <input
                            type="text"
                            name="img"
                            value={img}
                            onChange={handleChangeInput}
                        />
                    </div>
                    <br />
                    <div>
                        <label>title: </label>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={handleChangeInput}
                        />
                    </div>
                    <br />
                    <div>
                        <label htmlFor="">text: </label>
                        <input
                            type="text"
                            name="text"
                            value={text}
                            onChange={handleChangeInput}
                        />
                    </div>
                    <br />
                    <div>
                        <label>price: </label>
                        <input
                            type="text"
                            name="price"
                            value={price}
                            onChange={handleChangeInput}
                        />
                    </div>

                    <br />
                    <Button className="color" type="submit" variant="info">
                        EDIT TO SHOP
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default ShopEdit;
