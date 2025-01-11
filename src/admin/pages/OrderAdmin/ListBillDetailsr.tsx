import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import ReactDOMServer from "react-dom/server";
import logoBase64 from "../../../img/logochadport.png";
import JsBarcode from "jsbarcode";
import { Barcode } from "./OrderQR";
import { toast, ToastContainer } from "react-toastify";

Modal.setAppElement("#root");

interface Order {
  id: number;
  voucher_id: string | null;
  user_id: number;
  oder_number: string;
  payment_method: string;
  total_money: number;
  phone_number: string;
  shipping_address: string;
  billing_address: string;
  firt_name: string;
  last_name: string;
  status: string;
  newImage: any;
  created_at: string;
  updated_at: string;
  QRCodeSVG: string;
  printed: any;
  products?: Array<{
    product_id: number;
    product_name: string;
    product_image: string;
    quantity: number;
    size_name: string;
    color_name: string;
    price: number;
  }>;
}

const BillTable = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("Tất cả");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [selectedOrders, setSelectedOrders] = useState<number[]>([]);

  const [barcodes, setBarcodes] = useState<{ [key: number]: string }>({});
  const [searchID, setSearchID] = useState<string>("");
  // phan rang
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const itemsPerPage = 10; // Số lượng mục trên mỗi trang

  // Tính toán số lượng trang
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  // Dữ liệu hiện tại dựa trên trang
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOrders = filteredOrders.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Hàm thay đổi trang
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  //  end phan rang
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/all-ordersAdmin")
      .then((response) => {
        if (response.data) {
          const data = response.data.data
            .map((order: Order) => ({
              ...order,
              printed: order.printed === 1,
            }))
            .sort((a, b) => b.id - a.id);
          setOrders(data);
          setFilteredOrders(data);
        }
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
      });
  }, []);
  const handleSearchIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setSearchID(input);

    if (!input) {
      // Nếu không có giá trị nhập, hiển thị toàn bộ danh sách
      setFilteredOrders(orders);
      return;
    }

    if (!/^\d+$/.test(input)) {
      // Kiểm tra nếu giá trị nhập không phải là số
      alert("Vui lòng nhập một số hợp lệ!");
      return;
    }

    // Tìm kiếm đơn hàng theo ID
    const id = parseInt(input, 10);
    const foundOrder = orders.find((order) => order.id === id);

    if (foundOrder) {
      setFilteredOrders([foundOrder]);
    } else {
      setFilteredOrders([]); // Nếu không tìm thấy, hiển thị danh sách rỗng
    }
  };
  // nọc
  useEffect(() => {
    let filtered = orders;

    if (filterStatus === "Chưa in") {
      filtered = orders.filter((order) => !order.printed);
      setSearchID("");
    } else if (filterStatus === "Đã in") {
      filtered = orders.filter((order) => order.printed);
      setSearchID("");
    }

    if (startDate) {
      const start = new Date(startDate);
      filtered = filtered.filter(
        (order) => new Date(order.created_at) >= start
      );
    }

    if (endDate) {
      const end = new Date(endDate);
      filtered = filtered.filter((order) => new Date(order.created_at) <= end);
    }

    setFilteredOrders(filtered);
    setSelectedOrders([]); // Reset selected orders when filters change
  }, [filterStatus, orders, startDate, endDate]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const toISODate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const handleResetFilters = () => {
    setStartDate("");
    setEndDate("");
    setFilterStatus("Tất cả");
    setFilteredOrders(orders);
    setSearchID("");
  };

  const openModal = (order: Order) => {
    setSelectedOrder(order);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedOrder(null);
  };
  const handleSelectAll = async (checked: boolean) => {
    if (checked) {
      const newSelectedOrders = filteredOrders.map((order) => order.id);
      setSelectedOrders(newSelectedOrders);

      const newBarcodes: { [key: string]: string } = {};

      await Promise.all(
        filteredOrders.map(async (order) => {
          const barcodeBase64 = await generateBarcodeBase64(
            `Order #${order.id}`
          );
          const QRCodeSVGString = ReactDOMServer.renderToString(
            <QRCodeSVG value={`Order #${order.id}`} />
          );
          newBarcodes[order.id] = barcodeBase64;
          newBarcodes[order.newImage] = logoBase64;
          newBarcodes[`QRCode_${order.id}`] = QRCodeSVGString;
        })
      );
      setBarcodes(newBarcodes);
    } else {
      setSelectedOrders([]);
      setBarcodes({});
    }
  };

  // chọn đơn ok luôn hưng
  const handleToggleOrderSelection = async (orderId: number) => {
    setSelectedOrders((prevSelected) => {
      if (prevSelected.includes(orderId)) {
        // Bỏ chọn nếu ID đã tồn tại trong danh sách
        return prevSelected.filter((id) => id !== orderId);
      } else {
        // Thêm ID nếu chưa tồn tại
        return [...prevSelected, orderId];
      }
    });

    // Tìm đơn hàng theo ID
    const order = filteredOrders.find((o) => o.id === orderId);
    if (order) {
      // Tạo barcode và QR code
      const barcodeBase64 = await generateBarcodeBase64(`Order #${order.id}`);
      const QRCodeSVGString = ReactDOMServer.renderToString(
        <QRCodeSVG value={`Order #${orderId}`} />
      );

      setBarcodes((prevBarcodes) => ({
        ...prevBarcodes,
        [order.newImage]: logoBase64,
        [order.id]: barcodeBase64,
        [`QRCode_${order.id}`]: QRCodeSVGString,
      }));
    }
  };

  // tạo barcode
  const generateBarcodeBase64 = async (value: string) => {
    try {
      const canvas = document.createElement("canvas");
      JsBarcode(canvas, value, {
        format: "CODE128",
        width: 2,
        height: 50,
        displayValue: false,
      });
      const barcodeBase64 = canvas.toDataURL("image/png");
      // console.log(`Generated barcode for "${value}":`, barcodeBase64);
      return barcodeBase64;
    } catch (error) {
      console.error("Error generating barcode:", error);
      return "";
    }
  };
  // in nhieuefu bill
  const handlePrintSelected = async () => {
    if (selectedOrders.length === 0) {
      alert("Chưa chọn hóa đơn nào để in!");
      return;
    }
    const printContentPromises = selectedOrders.map((orderId) => {
      const order = filteredOrders.find((o) => o.id === orderId);
      if (!order) {
        console.error(`Không tìm thấy order với ID: ${orderId}`);
        return "";
      }
      const barcodeBase64 = barcodes[orderId] || "";
      const logoBase64 = barcodes[order.newImage] || "";
      const QRCodeSVGString = barcodes[`QRCode_${order.id}`] || "";

      return `
  <div style="
    page-break-after: always; 
    width: 650px;
    padding: 20px;
    border: 1px solid black;
    border-radius: 5px;
    background-color: white;
    font-family: Arial, sans-serif;
    margin-bottom: 20px;
  ">
    <!-- Header -->
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <div>
        <img
          src="${logoBase64}"
          alt="Logo"
          style="width: 120px; height: auto;"
        />
        <p style="font-size: 14px; margin: 5px 0;">Chadport Xpress</p>
      </div>
      <div>
        <img
          src="${barcodeBase64}"
          alt="Barcode"
          style="width: 200px; height: auto;"
        />
      </div>
    </div>

    <!-- Sender and Receiver -->
    <div style="
      margin: 20px 0;
      border: 1px dashed black;
      padding: 10px;
      display: flex;
      justify-content: space-between;
    ">
      <!-- Sender Information -->
      <div style="width: 48%; border-right: 1px dashed black; padding-right: 10px;">
        <p style="margin: 5px 0; font-weight: bold;">Từ:</p>
        <p style="margin: 5px 0;">${order.billing_address}</p>
        <p style="margin: 5px 0;">SDT: ${order.phone_number}</p>
      </div>

      <!-- Receiver Information -->
      <div style="width: 48%; padding-left: 10px;">
        <p style="margin: 5px 0; font-weight: bold;">Đến:</p>
        <p style="margin: 5px 0;">${order.firt_name} ${order.last_name}</p>
        <p style="margin: 5px 0;">${order.shipping_address}</p>
      </div>
    </div>

    <!-- Order Details -->
    <p style="
      margin: 20px 0;
      padding: 10px 0;
      padding-right: 10px;
      text-align: right;
      font-weight: bold;
      border: 1px dashed black;
    ">
      Ngày đặt hàng: <span>${formatDate(order.created_at)}</span>
    </p>

    <div style="
      margin: 20px 0;
      border: 1px dashed black;
      padding: 10px;
    ">
      <div style="
        display: flex;
        justify-content: space-between;
        
        padding-bottom: 10px;
        margin-bottom: 10px;
      ">
        <div style="width: 70%;">
          <p style="font-weight: bold;">Nội dung hàng:</p>
          <ul style="list-style: none; padding: 0; margin: 0;">
            ${order.products
              .map(
                (product, index) => `
                  <li style="margin-bottom: 5px;">
                    ${index + 1}. ${product.product_name} - SL: ${
                  product.quantity
                }
                  </li>
                `
              )
              .join("")}
          </ul>
        </div>
        <div style="
          text-align: center; 
          width: 25%; 
          padding-left: 15px; 
          border-left: 1px dashed black;
        ">
          ${QRCodeSVGString}
        </div>
      </div>
    </div>

    <!-- Footer Details -->
    <div style="
      display: flex;
      justify-content: space-between;
      border: 1px dashed black;
      padding: 10px 20px;
    ">
      <div>
        <p style="margin-top: 40px;">
          Tiền thu Người nhận: <strong>${order.total_money.toLocaleString()} VND</strong>
        </p>
      </div>
      <div style="width: 100%; text-align: center; margin-top: 10px;">
        <p style="
          margin-left: 200px; 
          border-top: 1px solid black; 
          display: inline-block; 
          width: 150px;
          text-align: center; 
          margin-top: 40px;
        ">
          Chữ ký người nhận
        </p>
      </div>
    </div>

    <!-- Notes -->
    <div style="
      text-align: center;
      font-size: 12px;
      margin-top: 20px;
      border-top: 1px dashed black;
      padding-top: 10px;
    ">
      <p>
        Kiểm tra tên sản phẩm và đối chiếu Mã vận đơn/Mã đơn hàng
        trên ứng dụng Shopee trước khi nhận hàng.
      </p>
      <p>
        Chỉ dẫn giao hàng: Không đồng kiểm; Chuyển hoàn sau 3 lần
        phát; Lưu kho tối đa 5 ngày.
      </p>
    </div>

    <!-- Footer -->
    <div style="
      text-align: center;
      font-size: 12px;
      margin-top: 20px;
      color: red;
    ">
      <p>
        Tuyển dụng Tài xế/Điều phối kho SPX - Thu nhập 8-20 triệu -
        Gọi 1900 6885
      </p>
    </div>
  </div>
`;
    });

    const printContent = (await Promise.all(printContentPromises)).join(
      "<hr />"
    );

    if (!printContent) {
      alert("Không có nội dung để in!");
      return;
    }

    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      toast.warn("Không thể mở cửa sổ in. Trình duyệt có thể đang chặn popup.");
      return;
    }
    let printCompleted = false;
    printWindow.document.open();
    printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>In Hóa Đơn</title>
      </head>
      <body>
        ${printContent}
      </body>
    </html>
  `);
    printWindow.document.close();

    // Lắng nghe sự kiện `onafterprint`
    printWindow.onafterprint = () => {
      printCompleted = true; // Đặt cờ in hoàn tất
      printWindow.close(); // Đóng cửa sổ in
    };

    // Sử dụng `setInterval` để kiểm tra xem cửa sổ đã bị đóng chưa
    const printCheckInterval = setInterval(() => {
      if (printWindow.closed) {
        clearInterval(printCheckInterval); // Dừng kiểm tra khi cửa sổ đóng
        if (printCompleted) {
          // Hiển thị xác nhận nếu in hoàn tất
          const confirmed = window.confirm(
            "Bạn đã hoàn thành việc in? Xác nhận nếu in thành công."
          );
          if (confirmed) {
            axios
              .post(`http://127.0.0.1:8000/api/updateOrdersPrintedStatus`, {
                id: selectedOrders,
              })
              .then((response) => {
                console.log(response.data.message);
                setOrders((prevOrders) =>
                  prevOrders.map((order) =>
                    selectedOrders.includes(order.id)
                      ? { ...order, printed: true }
                      : order
                  )
                );
                toast.success("Trạng thái hóa đơn đã được cập nhật.");
              })
              .catch((error) => {
                console.error("Lỗi khi cập nhật trạng thái hóa đơn:", error);
                toast.error("Có lỗi xảy ra khi cập nhật trạng thái hóa đơn.");
              });
          } else {
            toast.info("Trạng thái hóa đơn không thay đổi.");
          }
        } else {
          // Không làm gì nếu người dùng ấn Cancel
          toast.info("In đã bị hủy.");
        }
      }
    }, 500); // Kiểm tra mỗi 500ms

    // Gọi lệnh in
    printWindow.print();
    setModalIsOpen(false);
    setSelectedOrder(null);
  };

  // in 1 bill
  // const handlePrint = (order: Order) => {
  //   const billElement = document.getElementById(`bill-${order.id}`);
  //   if (!billElement) {
  //     console.error("Không tìm thấy bill cần in");
  //     return;
  //   }

  //   const printWindow = window.open("", "_blank");
  //   if (!printWindow) return;

  //   printWindow.document.open();
  //   printWindow.document.write(`
  //   <html>
  //     <head>
  //       <title>Print Bill</title>
  //       <style>
  //         @media print {
  //           body {
  //             margin: 0;
  //             padding: 0;
  //             font-family: Arial, sans-serif;
  //           }
  //         }
  //       </style>
  //     </head>
  //     <body>
  //       ${billElement.outerHTML}
  //     </body>
  //   </html>
  // `);
  //   printWindow.document.close();
  //   printWindow.focus();
  //   printWindow.print();
  //   printWindow.close();

  //   axios
  //     .post(`http://127.0.0.1:8000/api/updateOrdersPrintedStatus`, {
  //       id: order.id,
  //     })
  //     .then((res) => {
  //       setOrders((prevOrders) =>
  //         prevOrders.map((o) =>
  //           o.id === order.id ? { ...o, printed: true } : o
  //         )
  //       );
  //       console.log(res.data.message);
  //     })

  //     .catch((error) => {
  //       console.error("Lỗi khi cập nhật trạng thái hóa đơn:", error);
  //     });
  //   setModalIsOpen(false);
  //   setSelectedOrder(null);
  // };
  const handlePrint = (order: Order) => {
    const billElement = document.getElementById(`bill-${order.id}`);
    if (!billElement) {
      console.error("Không tìm thấy bill cần in");
      return;
    }

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    let printCompleted = false; // Cờ để theo dõi trạng thái in

    printWindow.document.open();
    printWindow.document.write(`
    <html>
      <head>
        <title>Print Bill</title>
        <style>
          @media print {
            body {
              margin: 0;
              padding: 0;
              font-family: Arial, sans-serif;
            }
          }
        </style>
      </head>
      <body>
        ${billElement.outerHTML}
      </body>
    </html>
  `);
    printWindow.document.close();

    // Lắng nghe sự kiện `onafterprint`
    printWindow.onafterprint = () => {
      printCompleted = true; // Đặt cờ in hoàn tất
      printWindow.close(); // Đóng cửa sổ in
    };

    // Sử dụng `setInterval` để kiểm tra xem cửa sổ đã bị đóng chưa
    const printCheckInterval = setInterval(() => {
      if (printWindow.closed) {
        clearInterval(printCheckInterval); // Dừng kiểm tra khi cửa sổ đóng
        if (printCompleted) {
          // Hiển thị xác nhận nếu in hoàn tất
          const confirmed = window.confirm(
            "Bạn đã hoàn thành việc in? Xác nhận nếu in thành công."
          );
          if (confirmed) {
            axios
              .post(`http://127.0.0.1:8000/api/updateOrdersPrintedStatus`, {
                id: order.id,
              })
              .then((response) => {
                console.log(response.data.message);
                setOrders((prevOrders) =>
                  prevOrders.map((o) =>
                    o.id === order.id ? { ...o, printed: true } : o
                  )
                );
                toast.success("Trạng thái hóa đơn đã được cập nhật.");
              })
              .catch((error) => {
                console.error("Lỗi khi cập nhật trạng thái hóa đơn:", error);
                toast.error("Có lỗi xảy ra khi cập nhật trạng thái hóa đơn.");
              });
          } else {
            toast.info("Trạng thái hóa đơn không thay đổi.");
          }
        } else {
          // Không làm gì nếu người dùng ấn Cancel
          toast.info("In đã bị hủy.");
        }
      }
    }, 500); // Kiểm tra mỗi 500ms

    // Gọi lệnh in
    printWindow.print();
    setModalIsOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <ToastContainer
        theme="light"
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
      />
      <h1>Quản Lý Hóa Đơn</h1>

      <div style={{ marginBottom: "20px" }}>
        <label>
          Lọc theo trạng thái:
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{ marginLeft: "10px", padding: "5px", fontSize: "14px" }}
          >
            <option value="Tất cả">Tất cả</option>
            <option value="Chưa in">Chưa in</option>
            <option value="Đã in">Đã in</option>
          </select>
        </label>
        <input
          type="text"
          value={searchID}
          onChange={handleSearchIDChange}
          placeholder="Nhập ID"
          style={{
            marginLeft: "10px",
            padding: "5px",
            fontSize: "14px",
            width: "150px",
          }}
        />
        <label>
          Từ ngày:
          <input
            type="date"
            value={startDate ? toISODate(startDate) : ""}
            onChange={(e) => setStartDate(e.target.value)}
            style={{ marginLeft: "10px", padding: "5px", fontSize: "14px" }}
          />
        </label>
        <label>
          Đến ngày:
          <input
            type="date"
            value={endDate ? toISODate(endDate) : ""}
            onChange={(e) => setEndDate(e.target.value)}
            style={{ marginLeft: "10px", padding: "5px", fontSize: "14px" }}
          />
        </label>
        <button
          onClick={handleResetFilters}
          style={{
            padding: "5px 10px",
            fontSize: "14px",
            backgroundColor: "#FF5722",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginLeft: "10px",
          }}
        >
          Đặt lại
        </button>
        <button
          onClick={handlePrintSelected}
          style={{
            padding: "5px 10px",
            fontSize: "14px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginLeft: "10px",
          }}
        >
          In Hóa Đơn Đã Chọn
        </button>
      </div>
      <div className="relative overflow-y-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    checked={
                      selectedOrders.length === filteredOrders.length &&
                      filteredOrders.length > 0
                    }
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                Trạng thái
              </th>
              <th scope="col" className="px-6 py-3">
                Hóa đơn
              </th>
              <th scope="col" className="px-6 py-3">
                Ngày
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order) => (
              <tr
                key={order.id}
                className="border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer"
                onClick={() => handleToggleOrderSelection(order.id)} // Xử lý chọn hàng
              >
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id={`checkbox-${order.id}`}
                      type="checkbox"
                      checked={selectedOrders.includes(order.id)}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleToggleOrderSelection(order.id);
                      }}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor={`checkbox-${order.id}`} className="sr-only">
                      checkbox
                    </label>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {order.printed ? "Đã in" : "Chưa in"}
                </td>
                <td className="px-6 py-4">
                  Hóa đơn #{order.id}
                  {barcodes[order.id] && (
                    <div style={{ maxWidth: "0px" }}>
                      <img src={barcodes[order.id]} />
                      <img src={barcodes[order.newImage]} alt="" />
                    </div>
                  )}
                </td>

                <td className="px-6 py-4">{formatDate(order.created_at)}</td>

                <td
                  className="flex items-center px-6 py-4"
                  style={{
                    display: "flex",
                    justifyContent: "center", // Căn giữa theo chiều ngang
                    alignItems: "center", // Căn giữa theo chiều dọc
                  }}
                >
                  <button
                    className="font-medium btn btn-primary text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={(e) => {
                      e.stopPropagation(); // Ngăn sự kiện click trên hàng khi nhấp vào nút
                      openModal(order);
                    }}
                  >
                    view
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center items-center mt-4 mb-5">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                className={`px-3 py-1 mx-1 rounded ${
                  page === currentPage
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-black"
                }`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            )
          )}
        </div>
      </div>
      {/* Modal for order details */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Hóa Đơn Đã Chọn"
        style={{
          content: {
            maxWidth: "700px",
            margin: "auto",
            // padding: "20px",
            borderRadius: "10px",
            border: "1px solid black",
            fontFamily: "Arial, sans-serif",
            // left: "300px",
          },
        }}
      >
        {selectedOrder && (
          <div>
            <h2>Chi Tiết Hóa Đơn #{selectedOrder.id}</h2>
            <div
              style={{
                textAlign: "center",
                fontFamily: "Arial, sans-serif",
                // padding: "20px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <div
                id={`bill-${selectedOrder.id}`}
                style={{
                  width: "650px",
                  margin: "auto",
                  padding: "20px",
                  border: "1px solid black",
                  borderRadius: "5px",
                  backgroundColor: "white",
                }}
              >
                {/* Header */}
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <img
                      src={logoBase64}
                      alt="logochadport"
                      style={{ width: "120px" }}
                    />
                    <p style={{ fontSize: "14px", margin: "5px 0" }}>
                      Chadport Xpress
                    </p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <Barcode
                      value={`Order #${selectedOrder.id}`}
                      width={2}
                      height={50}
                      displayValue={false}
                    />
                  </div>
                </div>

                {/* Sender and Receiver */}
                <div
                  style={{
                    margin: "20px 0",
                    border: "1px dashed black",
                    padding: "10px",
                    display: "flex",
                    textAlign: "left",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{ width: "48%", borderRight: "1px dashed black" }}
                  >
                    <p style={{ margin: "5px 0", fontWeight: "bold" }}>Từ:</p>
                    <p style={{ margin: "5px 0" }}>
                      {selectedOrder.billing_address}
                    </p>
                    {/* <p style={{ margin: "5px 0" }}>
                      {selectedOrder.sender.address}
                    </p> */}
                    <p style={{ margin: "5px 0" }}>
                      SDT: {selectedOrder.phone_number}
                    </p>
                  </div>
                  <div style={{ width: "48%" }}>
                    <p style={{ margin: "5px 0", fontWeight: "bold" }}>Đến:</p>
                    <p style={{ margin: "5px 0" }}>
                      {`${selectedOrder.firt_name} ${selectedOrder.last_name}`}
                    </p>
                    <p style={{ margin: "5px 0" }}>
                      {selectedOrder.shipping_address}
                    </p>
                  </div>
                </div>

                {/* Order Details */}
                <div
                  style={{
                    margin: "20px 0",
                    border: "1px dashed black",
                    padding: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderBottom: "1px dashed black",
                      paddingBottom: "10px",
                    }}
                  >
                    <p
                      style={{
                        textAlign: "right",
                        marginRight: "10px",
                        flex: 1,
                        // textJustify: "right",
                      }}
                    >
                      Ngày đặt hàng:{" "}
                      <strong>{formatDate(selectedOrder.created_at)}</strong>
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      // flexDirection: "column",
                      borderBottom: "1px dashed black",
                      paddingBottom: "10px",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: "bold", // Chuyển từ className="font-bold"
                        margin: "0", // Nếu có bất kỳ margin mặc định nào trong "m-0"
                        fontSize: "inherit", // Đảm bảo giữ nguyên kích thước chữ gốc
                        textAlign: "left",
                      }}
                    >
                      Nội dung hàng :{" "}
                      {`(Tổng SL sản phẩm:${selectedOrder.products.length})`}
                      <span
                        style={{
                          fontSize: "0.875rem", // Chuyển từ className="text-sm" (khoảng 14px)
                          margin: "0", // Chuyển từ className="m-0"
                          fontWeight: "300", // Chuyển từ className="font-light"
                        }}
                      >
                        {selectedOrder.products.map((product, index) => (
                          <ul
                            key={index}
                            style={{
                              display: "flex", // Chuyển từ className="flex"
                              listStyle: "none", // Ẩn dấu chấm đầu dòng của ul
                              padding: "0", // Loại bỏ padding mặc định
                              margin: "0", // Loại bỏ margin mặc định
                            }}
                          >
                            <li style={{ marginRight: "0.5rem" }}>
                              {index + 1}.
                            </li>
                            <li>
                              {product.product_name} - SL: {product.quantity}
                            </li>
                          </ul>
                        ))}
                      </span>
                    </div>

                    <div
                      style={{
                        borderLeft: "1px dashed black",
                        paddingLeft: "10px",
                        marginLeft: "10px",
                      }}
                    >
                      <QRCodeSVG value={`Order #${selectedOrder.id}`} />
                    </div>
                  </div>
                </div>

                {/* Footer Details */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",

                    marginTop: "10px",
                    border: "1px dashed black",
                    padding: "10px",
                  }}
                >
                  <div>
                    Tiền thu Người nhận:{" "}
                    <strong style={{ fontSize: "16px", marginRight: "10px" }}>
                      {selectedOrder.total_money.toLocaleString()} VND
                    </strong>
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      borderLeft: "1px dashed black",
                    }}
                  >
                    <p style={{ marginTop: "20px", marginLeft: "15px" }}>
                      Chữ ký người nhận: ______________________
                    </p>
                  </div>
                </div>

                {/* Notes */}
                <div
                  style={{
                    fontSize: "12px",
                    marginTop: "20px",
                    borderTop: "1px dashed black",
                    paddingTop: "10px",
                    textAlign: "center",
                  }}
                >
                  <p>
                    Kiểm tra tên sản phẩm và đối chiếu Mã vận đơn/Mã đơn hàng
                    trên ứng dụng Shopee trước khi nhận hàng.
                  </p>
                  <p>
                    Chỉ dẫn giao hàng: Không đồng kiểm; Chuyển hoàn sau 3 lần
                    phát; Lưu kho tối đa 5 ngày.
                  </p>
                </div>

                {/* Footer */}
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "12px",
                    marginTop: "20px",
                    color: "red",
                  }}
                >
                  <p>
                    Tuyển dụng Tài xế/Điều phối kho SPX - Thu nhập 8-20 triệu -
                    Gọi 1900 6885
                  </p>
                </div>
              </div>

              {/* Print Button */}
            </div>

            {/* Nút in và đóng */}
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <button
                onClick={() => handlePrint(selectedOrder)}
                style={{
                  marginRight: "10px",
                  padding: "10px 20px",
                  fontSize: "14px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                In Hóa Đơn
              </button>
              <button
                onClick={closeModal}
                style={{
                  padding: "10px 20px",
                  fontSize: "14px",
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Đóng
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default BillTable;
