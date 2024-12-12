import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import axios from "axios";

interface ChartThreeState {
  series: number[];
}

const options: ApexOptions = {
  chart: {
    fontFamily: "Satoshi, sans-serif",
    type: "donut",
  },
  colors: ["#FF5733", "#28A745", "#FFC107", "#17A2B8"], // Màu sắc cho các trạng thái đơn hàng
  labels: ["Đang xử lý", "Đã giao", "Đã hủy", "Chờ xác nhận"], // Các trạng thái đơn hàng
  legend: {
    show: false,
    position: "bottom",
  },
  plotOptions: {
    pie: {
      donut: {
        size: "65%",
        background: "transparent",
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 380,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
};

const ChartThree: React.FC = () => {
  const [trangThai, setTrangThai] = useState<any>(null); // Bạn có thể thay `any` bằng kiểu dữ liệu cụ thể nếu biết
  const [state, setState] = useState<ChartThreeState>({
    series: [0, 0, 0, 0], // Khởi tạo các series với giá trị mặc định là 0
  });

  // Hàm lấy dữ liệu từ API
  const fetchTotalMoney = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/totalMoney");
      setTrangThai(response.data); // Cập nhật dữ liệu vào state
    } catch (error) {
      console.error("Có lỗi khi lấy dữ liệu:", error);
    }
  };

  // Hàm tính toán số lượng trạng thái đơn hàng
  const countOrderStatuses = () => {
    if (!trangThai) return; // Nếu dữ liệu chưa có thì không làm gì

    const {
      "Chờ xử lí": waiting,
      "Đang giao": delivering,
      "Đã hoàn thành": completed,
      "Bị hủy": canceled,
    } = trangThai;

    // Cập nhật state với số lượng các trạng thái
    setState({
      series: [waiting, delivering, canceled, completed],
    });
  };

  // Gọi hàm tính toán khi component được render
  useEffect(() => {
    fetchTotalMoney(); // Lấy dữ liệu khi component mount
  }, []);

  // Cập nhật trạng thái khi dữ liệu từ API thay đổi
  useEffect(() => {
    countOrderStatuses(); // Tính toán các trạng thái đơn hàng khi trangThai thay đổi
  }, [trangThai]);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7 px-4  drop-shadow-xl dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Trạng thái đơn hàng
          </h5>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={options}
            series={state.series}
            type="donut"
          />
        </div>
      </div>

      <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
        <div className="sm:w-1/2 w-full px-8">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#FF5733]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> Đang xử lý </span>
              <span> {state.series[0]} </span>
            </p>
          </div>
        </div>
        <div className="sm:w-1/2 w-full px-8">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#28A745]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> Đã giao </span>
              <span> {state.series[1]} </span>
            </p>
          </div>
        </div>
        <div className="sm:w-1/2 w-full px-8">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#FFC107]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> Đã hủy </span>
              <span> {state.series[2]} </span>
            </p>
          </div>
        </div>
        <div className="sm:w-1/2 w-full px-8">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#17A2B8]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> Chờ xác nhận </span>
              <span> {state.series[3]} </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartThree;
