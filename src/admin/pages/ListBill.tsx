import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Order {
  order_id: string;
  user_id: number;
  product_id: number;
  quantity: number;
  product_price: number;
  voucher_id: string;
  order_shipping: string;
  cart_id: string;
  order_payment: string;
  order_total: number;
  address: string;
  ward: string;
  status: string;
  date_create: string;
  date_update: string;
}

const statusOptions = [
  'Pending',
  'Processing',
  'Shipped',
  'Delivered',
  'Cancelled',
];

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch orders from json-server
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Order[]>('http://localhost:3000/orders');
        setOrders(response.data);
      } catch (err) {
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      // Update the order status on the server
      await axios.patch(`http://localhost:3000/orders/${orderId}`, {
        status: newStatus,
      });

      // Update the state locally
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.order_id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error('Failed to update order status', err);
      setError('Failed to update order status');
    }
  };

  if (loading) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Order Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse block md:table">
          <thead className="block md:table-header-group">
            <tr className="border-b border-gray-200 md:border-none block md:table-row absolute -top-full -left-full md:top-auto md:left-auto md:relative">
              <th className="bg-gray-100 p-2 text-gray-600 font-bold text-left block md:table-cell">Order ID</th>
              <th className="bg-gray-100 p-2 text-gray-600 font-bold text-left block md:table-cell">User ID</th>
              <th className="bg-gray-100 p-2 text-gray-600 font-bold text-left block md:table-cell">Product ID</th>
              <th className="bg-gray-100 p-2 text-gray-600 font-bold text-left block md:table-cell">Quantity</th>
              <th className="bg-gray-100 p-2 text-gray-600 font-bold text-left block md:table-cell">Price</th>
              <th className="bg-gray-100 p-2 text-gray-600 font-bold text-left block md:table-cell">Total</th>
              <th className="bg-gray-100 p-2 text-gray-600 font-bold text-left block md:table-cell">Shipping</th>
              <th className="bg-gray-100 p-2 text-gray-600 font-bold text-left block md:table-cell">Payment</th>
              <th className="bg-gray-100 p-2 text-gray-600 font-bold text-left block md:table-cell">Status</th>
              <th className="bg-gray-100 p-2 text-gray-600 font-bold text-left block md:table-cell">Address</th>
              <th className="bg-gray-100 p-2 text-gray-600 font-bold text-left block md:table-cell">Ward</th>
              <th className="bg-gray-100 p-2 text-gray-600 font-bold text-left block md:table-cell">Date Created</th>
              <th className="bg-gray-100 p-2 text-gray-600 font-bold text-left block md:table-cell">Date Updated</th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {orders.map((order) => (
              <tr key={order.order_id} className="border border-gray-200 md:border-none block md:table-row mb-4 md:mb-0">
                <td className="p-2 text-gray-700 block md:table-cell">{order.order_id}</td>
                <td className="p-2 text-gray-700 block md:table-cell">{order.user_id}</td>
                <td className="p-2 text-gray-700 block md:table-cell">{order.product_id}</td>
                <td className="p-2 text-gray-700 block md:table-cell">{order.quantity}</td>
                <td className="p-2 text-gray-700 block md:table-cell">${order.product_price.toFixed(2)}</td>
                <td className="p-2 text-gray-700 block md:table-cell">${order.order_total.toFixed(2)}</td>
                <td className="p-2 text-gray-700 block md:table-cell">{order.order_shipping}</td>
                <td className="p-2 text-gray-700 block md:table-cell">{order.order_payment}</td>
                <td className="p-2 text-gray-700 block md:table-cell">
                  <select
                    className="border border-gray-300 rounded p-2"
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.order_id, e.target.value)}
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-2 text-gray-700 block md:table-cell">{order.address}</td>
                <td className="p-2 text-gray-700 block md:table-cell">{order.ward}</td>
                <td className="p-2 text-gray-700 block md:table-cell">{new Date(order.date_create).toLocaleString()}</td>
                <td className="p-2 text-gray-700 block md:table-cell">{new Date(order.date_update).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
