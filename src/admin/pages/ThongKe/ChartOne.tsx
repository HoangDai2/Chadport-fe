import { ApexOptions } from "apexcharts";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactApexChart from "react-apexcharts";
import DatePicker from "react-datepicker"; // Import thư viện DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Import CSS cho DatePicker
import { vi } from "date-fns/locale"; // Import ngôn ngữ tiếng Việt từ date-fns

// Cấu hình biểu đồ ApexCharts
const defaultOptions: ApexOptions = {
  chart: {
    type: "bar",
    height: 350,
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "55%",
      borderRadius: 10, // Sử dụng borderRadius thay vì endingShape
    },
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: false,
  },
  colors: ["#28A745"], // Màu xanh cho biểu đồ
  xaxis: {
    categories: [], // Được cập nhật động sau khi chọn tháng hoặc năm
  },
  yaxis: {
    title: {
      text: "Doanh Thu (VND)",
    },
  },
  tooltip: {
    shared: true,
    intersect: false,
    y: {
      formatter: (value) =>
        value.toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
    },
  },
};

interface ChartState {
  series: {
    name: string;
    data: number[];
  }[];
}

const ChartOne: React.FC = () => {
  const [state, setState] = useState<ChartState>({ series: [] });
  const [options, setOptions] = useState<ApexOptions>(defaultOptions); // State cho options
  const [selectedYear, setSelectedYear] = useState<string>(
    new Date().getFullYear().toString()
  ); // Lọc theo năm, mặc định năm hiện tại
  const [selectedMonth, setSelectedMonth] = useState<string>(""); // Lọc theo tháng, mặc định không chọn tháng nào
  const [startDate, setStartDate] = useState<Date | null>(null); // Lọc theo ngày bắt đầu
  const [endDate, setEndDate] = useState<Date | null>(null); // Lọc theo ngày kết thúc
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString()); // Tháng từ 1 đến 12
  const years = Array.from({ length: 10 }, (_, i) =>
    (new Date().getFullYear() - i).toString()
  ); // 10 năm gần nhất

  // Lấy dữ liệu và lọc theo năm/tháng/ngày
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/showAllOrder")
      .then((response) => {
        const orders = response.data.data;
        const yearlySales: { [key: string]: number } = {}; // Lưu doanh thu từng năm
        const dailySales = Array(31).fill(0); // Mảng 31 ngày, mỗi ngày có doanh thu
        const monthlySales = Array(12).fill(0); // Mảng 12 tháng, mỗi tháng có doanh thu

        if (orders && orders.length > 0) {
          orders.forEach((order: any) => {
            const orderDate = new Date(order.created_at);
            const orderYear = orderDate.getFullYear();
            const orderMonth = orderDate.getMonth();
            const orderDay = orderDate.getDate();

            // Cộng doanh thu cho từng năm
            if (!yearlySales[orderYear]) yearlySales[orderYear] = 0;
            yearlySales[orderYear] += order.total_money;

            if (
              (!selectedYear || orderYear.toString() === selectedYear) &&
              (!startDate || orderDate >= startDate) &&
              (!endDate || orderDate <= endDate)
            ) {
              if (selectedMonth) {
                if (orderMonth + 1 === parseInt(selectedMonth)) {
                  dailySales[orderDay - 1] += order.total_money;
                }
              } else {
                monthlySales[orderMonth] += order.total_money;
              }
            }
          });

          // Nếu không chọn năm nào, hiển thị doanh thu của tất cả năm
          if (!selectedYear) {
            setState({
              series: [
                {
                  name: "Doanh Thu",
                  data: Object.values(yearlySales),
                },
              ],
            });
            setOptions((prevOptions) => ({
              ...prevOptions,
              xaxis: {
                ...prevOptions.xaxis,
                categories: Object.keys(yearlySales).map(
                  (year) => `Năm ${year}`
                ),
              },
            }));
          } else {
            setState({
              series: [
                {
                  name: "Doanh Thu",
                  data: selectedMonth ? dailySales : monthlySales,
                },
              ],
            });
            setOptions((prevOptions) => ({
              ...prevOptions,
              xaxis: {
                ...prevOptions.xaxis,
                categories: selectedMonth
                  ? Array.from({ length: 31 }, (_, i) => `Ngày ${i + 1}`)
                  : Array.from({ length: 12 }, (_, i) => `Tháng ${i + 1}`),
              },
            }));
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching orders data:", error);
      });
  }, [selectedYear, selectedMonth, startDate, endDate]);

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    setSelectedMonth("");
    setStartDate(null);
    setEndDate(null);
  };

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7 pb-5 drop-shadow-xl dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex items-center justify-right mb-4">
        <select
          onChange={(e) => handleYearChange(e.target.value)}
          value={selectedYear}
          className="border border-gray-300 rounded mr-2 p-2"
        >
          <option value="">Tất cả các năm</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <select
          onChange={(e) => handleMonthChange(e.target.value)}
          value={selectedMonth}
          className="border border-gray-300 rounded p-2"
        >
          <option value="">Tất cả các tháng</option>
          {months.map((month) => (
            <option key={month} value={month}>
              Tháng {month}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap gap-5">
        <div className="w-full md:w-2/3">
          <ReactApexChart
            options={options}
            series={state.series}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
