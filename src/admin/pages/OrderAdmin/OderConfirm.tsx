import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../style/OrderConfirm.css'; // Import Custom CSS

const OrderConfirm = () => {
  const orders = [
    {
      orderId: 1,
      userId: 1,
      productId: 4,
      quantity: 2,
      price: 300.00,
      total: 550.00,
      shipping: 'Standard',
      payment: 'Credit Card',
      status: 'Pending',
      address: '123 Main St, New York, NY',
      ward: 'Ward 1',
      dateCreated: '17:00:00 21/10/2024',
      dateUpdated: '17:00:00 21/10/2024'
    },
    {
      orderId: 2,
      userId: 2,
      productId: 5,
      quantity: 1,
      price: 250.00,
      total: 230.00,
      shipping: 'Express',
      payment: 'Paypal',
      status: 'Pending',
      address: '456 Elm St, Los Angeles, CA',
      ward: 'Ward 2',
      dateCreated: '21:30:00 22/10/2024',
      dateUpdated: '16:00:00 23/10/2024'
    },
    {
      orderId: 3,
      userId: 3,
      productId: 6,
      quantity: 3,
      price: 300.00,
      total: 880.00,
      shipping: 'Standard',
      payment: 'Cash On Delivery',
      status: 'Pending',
      address: '789 Oak St, Chicago, IL',
      ward: 'Ward 3',
      dateCreated: '15:45:00 20/10/2024',
      dateUpdated: '19:00:00 23/10/2024'
    },
    {
        orderId: 4,
        userId: 4,
        productId: 7,
        quantity: 8,
        price: 3005.00,
        total: 8809.00,
        shipping: 'Standard',
        payment: 'Cash On Delivery',
        status: 'Pending',
        address: '789 Oak St, Chicago, IL',
        ward: 'Ward 3',
        dateCreated: '15:45:00 20/10/2024',
        dateUpdated: '19:00:00 23/10/2024'
      }
  ];

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Order Management</h1>
      <table className="table table-hover table-striped table-responsive-md">
        <thead className="thead-dark">
          <tr>
            <th>Order ID</th>
            <th>User ID</th>
            <th>Product ID</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
            <th>Shipping</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Address</th>
            <th>Ward</th>
            <th>Date Created</th>
            <th>Date Updated</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{order.userId}</td>
              <td>{order.productId}</td>
              <td>{order.quantity}</td>
              <td>${order.price.toFixed(2)}</td>
              <td>${order.total.toFixed(2)}</td>
              <td>{order.shipping}</td>
              <td>{order.payment}</td>
              <td><button className="btn btn-success">Xác nhận</button></td>
              <td>{order.address}</td>
              <td>{order.ward}</td>
              <td>{order.dateCreated}</td>
              <td>{order.dateUpdated}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderConfirm;
