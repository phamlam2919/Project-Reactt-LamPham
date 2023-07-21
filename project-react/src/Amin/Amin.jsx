import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import "./amin.css";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        "aria-controls": `vertical-tabpanel-${index}`,
    };
}

export default function Amin() {
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [data, setData] = React.useState([]);
    React.useEffect(() => {
        axios.get("http://localhost:8000/product").then((response) => {
            setData(response.data.filter());
        });
    }, []);

    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:8000/product/${id}`)
            .then(() => {
                setData(data.filter((element) => element.id !== id));
                console.log("Xóa thành công!");
            })
            .catch((error) => {
                console.error("Xóa thất bại:", error.message);
            });
    };

    const [user, setUser] = React.useState([]);
    React.useEffect(() => {
        axios
            .get("http://localhost:8000/users")
            .then((response) => {
                setUser(response.data);
            })
            .catch((err) => console.log(err));
    }, []);

    // const handleDeleteUser = (id) => {
    //     axios
    //         .delete(`http://localhost:8000/users/${id}`)
    //         .then(() => {
    //             setUser(user.filter((userItem) => userItem.id !== id));
    //             console.log("Xóa thành công!");
    //         })
    //         .catch((error) => {
    //             console.error("Xóa thất bại:", error.message);
    //         });
    // };

    const handleLockAccount = (id) => {
        axios
            .patch(`http://localhost:8000/users/${id}`, { locked: true })
            .then(() => {
                const updatedUsers = user.map((userItem) => {
                    if (userItem.id === id) {
                        return { ...userItem, locked: true };
                    }
                    return userItem;
                });
                setUser(updatedUsers);
                console.log("Khóa tài khoản thành công!");
            })
            .catch((error) => {
                console.error("Khóa tài khoản thất bại:", error.message);
            });
    };

    const handleUnlockAccount = (id) => {
        axios
            .patch(`http://localhost:8000/users/${id}`, { locked: false })
            .then(() => {
                const updatedUsers = user.map((userItem) => {
                    if (userItem.id === id) {
                        return { ...userItem, locked: false };
                    }
                    return userItem;
                });
                setUser(updatedUsers);
                console.log("Mở khóa tài khoản thành công!");
            })
            .catch((error) => {
                console.error("Mở khóa tài khoản thất bại:", error.message);
            });
    };
    const handleLogout = () => {
        localStorage.removeItem("isAdminAuthenticated");
        navigate("/login-admin");
    };

    return (
        <Box
            sx={{
                flexGrow: 1,
                bgcolor: "background.paper",
                display: "flex",
                height: 224,
            }}
        >
            <Tabs
                className="tabs"
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: "divider" }}
            >
                <Tab label="Users" {...a11yProps(0)} />
                <Tab label="Shop" {...a11yProps(1)} />
                <Tab label="Item Three" {...a11yProps(2)} />
            </Tabs>

            <TabPanel value={value} index={0}>
                <Button onClick={handleLogout} variant="danger">
                    Đăng Xuất
                </Button>
                <Table
                    className="table"
                    striped
                    bordered
                    hover
                    style={{ textAlign: "center", marginTop: "30px" }}
                >
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th colSpan={2}>Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.map((userItem, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{userItem.id}</td>
                                <td>{userItem.name}</td>
                                <td>{userItem.email}</td>
                                <td>{userItem.password}</td>

                                <td>
                                    {userItem.locked ? (
                                        <button
                                            style={{
                                                backgroundColor: "green",
                                                color: "white",
                                                border: "none",
                                            }}
                                            variant="warning"
                                            onClick={() =>
                                                handleUnlockAccount(userItem.id)
                                            }
                                        >
                                            Mở khóa
                                        </button>
                                    ) : (
                                        <button
                                            style={{
                                                backgroundColor: "red",
                                                color: "white",
                                                border: "none",
                                            }}
                                            variant="danger"
                                            onClick={() =>
                                                handleLockAccount(userItem.id)
                                            }
                                        >
                                            Khóa
                                        </button>
                                    )}
                                </td>
                                {/* <td>
                                    <button
                                        style={{
                                            backgroundColor: "red",
                                            color: "white",
                                            border: "none",
                                        }}
                                        variant="danger"
                                        onClick={() =>
                                            handleDeleteUser(userItem.id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Link to="/shopadd">
                    <Button variant="danger">Add to Shop</Button>
                </Link>
                <div className="container">
                    {data
                        .map((element, index) => (
                            <Card className="card" key={index}>
                                <Card.Img variant="top" src={element.img} />
                                <Card.Body className="dodai">
                                    <Card.Title>{element.title}</Card.Title>
                                    <Card.Text>{element.text}</Card.Text>
                                </Card.Body>
                                <Card.Footer className="card-footer">
                                    <p>{element.price}₫</p>
                                    <Button
                                        onClick={() => handleDelete(element.id)}
                                        variant="primary"
                                    >
                                        Delete
                                    </Button>
                                    <Link to={`/product/edit/${element.id}`}>
                                        <Button
                                            style={{ color: "white" }}
                                            variant="warning"
                                        >
                                            Edit
                                        </Button>
                                    </Link>
                                </Card.Footer>
                            </Card>
                        ))
                        .reverse()}
                </div>
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel>
        </Box>
    );
}
