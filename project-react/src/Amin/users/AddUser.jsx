// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import Tab from "react-bootstrap/Tab";
// import Table from "react-bootstrap/Table";
// import Button from "react-bootstrap/Button";
// function AddUser() {
//     const [user, setUser] = useState([]);
//     useEffect(() => {
//         axios.get("http://localhost:8000/users").then((response) => {
//             setUser(response.data);
//         });
//     }, []);

//     const handleDeleteUser = (id) => {
//         axios
//             .delete(`http://localhost:8000/users/${id}`)
//             .then(() => {
//                 setUser(user.filter((userItem) => userItem.id !== id));
//                 console.log("Xóa thành công!");
//             })
//             .catch((error) => {
//                 console.error("Xóa thất bại:", error.message);
//             });
//     };

//     const handleLockAccount = (id) => {
//         axios
//             .put(`http://localhost:8000/users/${id}`, { locked: true })
//             .then(() => {
//                 const updatedUsers = user.map((userItem) => {
//                     if (userItem.id === id) {
//                         return { ...userItem, locked: true };
//                     }
//                     return userItem;
//                 });
//                 setUser(updatedUsers);
//                 console.log("Khóa tài khoản thành công!");
//             })
//             .catch((error) => {
//                 console.error("Khóa tài khoản thất bại:", error.message);
//             });
//     };

//     const handleUnlockAccount = (id) => {
//         axios
//             .put(`http://localhost:8000/users/${id}`, { locked: false })
//             .then(() => {
//                 const updatedUsers = user.map((userItem) => {
//                     if (userItem.id === id) {
//                         return { ...userItem, locked: false };
//                     }
//                     return userItem;
//                 });
//                 setUser(updatedUsers);
//                 console.log("Mở khóa tài khoản thành công!");
//             })
//             .catch((error) => {
//                 console.error("Mở khóa tài khoản thất bại:", error.message);
//             });
//     };
//     return (
//         <div>
//             {/* <Tab eventKey="home" title="Home"> */}
//             <Table
//                 striped
//                 bordered
//                 hover
//                 style={{ textAlign: "center", marginTop: "30px" }}
//             >
//                 <thead>
//                     <tr>
//                         <th>STT</th>
//                         <th>ID</th>
//                         <th>Name</th>
//                         <th>Email</th>
//                         <th>Password</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {user.map((userItem, index) => (
//                         <tr key={index}>
//                             <td>{index + 1}</td>
//                             <td>{userItem.id}</td>
//                             <td>{userItem.name}</td>
//                             <td>{userItem.email}</td>
//                             <td>{userItem.password}</td>
//                             <td>
//                                 {userItem.locked ? (
//                                     <Button
//                                         variant="warning"
//                                         onClick={() =>
//                                             handleUnlockAccount(userItem.id)
//                                         }
//                                     >
//                                         Mở khóa
//                                     </Button>
//                                 ) : (
//                                     <Button
//                                         variant="danger"
//                                         onClick={() =>
//                                             handleLockAccount(userItem.id)
//                                         }
//                                     >
//                                         Khóa
//                                     </Button>
//                                 )}
//                             </td>
//                             <td>
//                                 <Button
//                                     variant="danger"
//                                     onClick={() =>
//                                         handleDeleteUser(userItem.id)
//                                     }
//                                 >
//                                     Delete
//                                 </Button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>
//             {/* </Tab> */}
//         </div>
//     );
// }

// export default AddUser;
