import { QRCodeSVG } from "qrcode.react";
import Barcode from "react-barcode";

export const OrderQR = ({ selectedOrder }: any) => {
  // console.log(selectedOrder);
  if (!selectedOrder) {
    return <p>Không có dữ liệu đơn hàng.</p>;
  }
  const orderData = {
    orderId: selectedOrder.id,
    orderNumber: selectedOrder.oder_number,
    customerName: `${selectedOrder.firt_name} ${selectedOrder.last_name}`,
    shippingAddress: selectedOrder.shipping_address,
    billingAddress: selectedOrder.billing_address,
    paymentMethod: selectedOrder.payment_method,
    status: selectedOrder.status,
    totalAmount: selectedOrder.total_money,
    products: selectedOrder.products.map((item: any) => ({
      productName: item.product_name,
      quantity: item.quantity,
      price: item.price,
      size: item.size_name,
      color: item.color_name,
    })),
    createdAt: selectedOrder.created_at,
    updatedAt: selectedOrder.updated_at,
  };
  const orderDataBarcode = {
    orderId: selectedOrder.id,
  };

  const orderDataString = JSON.stringify(orderData);

  return (
    <>
      {/* <QRCodeSVG value={orderDataString} /> */}
      <Barcode
        value={JSON.stringify(orderDataBarcode)}
        width={1} // Chiều rộng mỗi vạch của mã vạch
        height={30} // Chiều cao của mã vạch
        displayValue={false} // Tùy chọn hiển thị giá trị dưới mã vạch
      />
    </>
  );
};
export { Barcode };
