// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const BillOrder = () => {
//   const [billData, setBillData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchBillData = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/bills");
//         setBillData(response.data[0]);
//         // console.log(billData);
//         setIsLoading(false);
//       } catch (error) {
//         console.error("Error fetching bill data:", error);
//         setIsLoading(false);
//       }
//     };
//     fetchBillData();
//   }, []);

//   if (isLoading) {
//     return <p>Loading...</p>;
//   }

//   if (!billData) {
//     return <p>No bill data available.</p>;
//   }

//   return (
//     <>
//       <div id="page" className="hfeed page-wrapper">
//         <div id="site-main" className="site-main ">
//           <div id="main-content" className="main-content">
//             <div id="primary" className="content-area">
//               <div id="title" className="page-title ">
//                 <div className="section-container">
//                   <div className="content-title-heading">
//                     <h1 className="text-title-heading">Bill Details</h1>
//                   </div>
//                   <div className="breadcrumbs">
//                     <a href="/">Home</a>
//                     <span className="delimiter" />
//                     Bill
//                   </div>
//                 </div>
//               </div>
//               <div id="content" className="site-content" role="main">
//                 <div className="content-bill">
//                   <div
//                     className="grid mt-5 mb-5 text-center"
//                     style={{
//                       display: "grid",
//                       gridTemplateColumns: "repeat(2, 1fr)",
//                     }}
//                   >
//                     <div className="g-col-6">
//                       <div className="fw-semibold text-uppercase mb-1 fs-6">
//                         Thông tin người nhận
//                       </div>
//                       <div className="mb-1">
//                         Name: {billData.firstName} {billData.lastName}
//                         <br />
//                         Address: {billData.address1}, {billData.address2},{" "}
//                         {billData.country}
//                         <br />
//                         Phone: {billData.phone}
//                         <br />
//                         Email: {billData.email}
//                       </div>
//                       <div className="fw-semibold text-uppercase mt-3 fs-6">
//                         Ngày tạo
//                       </div>
//                       <div className="mt-1">
//                         {new Date(billData.date_create).toLocaleDateString()}
//                       </div>
//                     </div>
//                     <div className="g-col-6">
//                       <div className="fw-semibold text-uppercase mt-4 fs-6">
//                         Trạng thái đơn hàng
//                       </div>
//                       <div className="text-red mt-1">{billData.message}</div>
//                     </div>
//                   </div>
//                   <hr />
//                   <table className="table-bill">
//                     <thead>
//                       <tr>
//                         <th style={{ width: "10%", textAlign: "center" }}>#</th>
//                         <th style={{ width: "10%", textAlign: "center" }}>
//                           img
//                         </th>
//                         <th style={{ width: "40%" }}>Description</th>
//                         <th style={{ width: "15%", textAlign: "center" }}>
//                           Qty
//                         </th>
//                         <th style={{ width: "17.5%", textAlign: "end" }}>
//                           Unit price
//                         </th>
//                         <th style={{ textAlign: "end" }}>Total</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr>
//                         <th>1</th>
//                         <td>
//                           <img src={billData.productImage} alt="" />
//                         </td>
//                         <td>{billData.productName}</td>
//                         <td className="text-center">
//                           {billData.productQuantity}
//                         </td>
//                         <td style={{ textAlign: "end" }}>
//                           ${billData.productPrice}
//                         </td>
//                         <td style={{ textAlign: "end" }}>
//                           ${billData.productQuantity * billData.productPrice}
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default BillOrder;
