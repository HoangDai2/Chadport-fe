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
  const [startMonth, setStartMonth] = useState<string>(""); // Lọc theo tháng bắt đầu
  const [endMonth, setEndMonth] = useState<string>(""); // Lọc theo tháng kết thúc
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
        const dailySales = Array(30).fill(0); // Mảng 30 ngày, mỗi ngày có doanh thu
        const monthlySales = Array(12).fill(0); // Mảng 12 tháng, mỗi tháng có doanh thu

        if (orders && orders.length > 0) {
          orders.forEach((order: any) => {
            const orderDate = new Date(order.created_at);
            const orderYear = orderDate.getFullYear(); // Lấy năm
            const orderMonth = orderDate.getMonth(); // Lấy tháng (0-11)
            const orderDay = orderDate.getDate(); // Lấy ngày trong tháng
            const orderDateStr = orderDate.toISOString().split("T")[0]; // "YYYY-MM-DD"

            // Lọc theo năm
            if (selectedYear) {
              if (orderYear.toString() === selectedYear) {
                if (
                  (!startDate || orderDate >= startDate) &&
                  (!endDate || orderDate <= endDate) &&
                  (!startMonth || orderMonth + 1 >= parseInt(startMonth)) &&
                  (!endMonth || orderMonth + 1 <= parseInt(endMonth))
                ) {
                  if (order.status === "đã hoàn thành") {
                    if (selectedMonth) {
                      dailySales[orderDay - 1] += order.total_money;
                    } else {
                      monthlySales[orderMonth] += order.total_money;
                    }
                  }
                }
              }
            }
            // Lọc theo tháng
            else if (selectedMonth) {
              if (
                orderMonth + 1 === parseInt(selectedMonth) &&
                (!startDate || orderDate >= startDate) &&
                (!endDate || orderDate <= endDate)
              ) {
                if (order.status === "đã hoàn thành") {
                  dailySales[orderDay - 1] += order.total_money;
                }
              }
            }
            // Lọc theo tháng bắt đầu và tháng kết thúc
            else if (startMonth && endMonth) {
              const startMonthNum = parseInt(startMonth);
              const endMonthNum = parseInt(endMonth);

              if (
                orderMonth + 1 >= startMonthNum &&
                orderMonth + 1 <= endMonthNum &&
                (!startDate || orderDate >= startDate) &&
                (!endDate || orderDate <= endDate)
              ) {
                if (order.status === "đã hoàn thành") {
                  monthlySales[orderMonth] += order.total_money;
                }
              }
            }
          });

          // Cập nhật series cho biểu đồ
          setState({
            series: [
              {
                name: "Doanh Thu",
                data:
                  selectedMonth || startMonth || endMonth
                    ? dailySales
                    : monthlySales,
              },
            ],
          });

          // Cập nhật các giá trị cho trục X
          setOptions((prevOptions) => ({
            ...prevOptions,
            xaxis: {
              ...prevOptions.xaxis,
              categories:
                selectedMonth || startMonth || endMonth
                  ? Array.from({ length: 30 }, (_, i) => `Ngày ${i + 1}`)
                  : Array.from({ length: 12 }, (_, i) => `Tháng ${i + 1}`),
            },
          }));
        }
      })
      .catch((error) => {
        console.error("Error fetching orders data:", error);
      });
  }, [startDate, endDate, selectedMonth, selectedYear, startMonth, endMonth]);

  // Xử lý thay đổi năm
  const handleYearChange = (year: string) => {
    setSelectedYear(year); // Cập nhật năm khi chọn
    setStartDate(null); // Xóa ngày bắt đầu khi chọn năm
    setEndDate(null); // Xóa ngày kết thúc khi chọn năm
    setStartMonth(""); // Xóa tháng bắt đầu khi chọn năm
    setEndMonth(""); // Xóa tháng kết thúc khi chọn năm
  };

  // Xử lý thay đổi tháng
  const handleMonthChange = (month: string) => {
    setSelectedMonth(month); // Cập nhật tháng khi chọn
    setStartDate(null); // Xóa ngày bắt đầu khi chọn tháng
    setEndDate(null); // Xóa ngày kết thúc khi chọn tháng
    setStartMonth(""); // Xóa tháng bắt đầu khi chọn tháng
    setEndMonth(""); // Xóa tháng kết thúc khi chọn tháng
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7 pb-5 drop-shadow-xl dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <select
            onChange={(e) => handleYearChange(e.target.value)}
            value={selectedYear}
            className="border border-gray-300 rounded p-2"
          >
            <option value="">Chọn năm</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            onChange={(e) => handleMonthChange(e.target.value)}
            value={selectedMonth}
            className="border border-gray-300 rounded p-2"
          >
            <option value="">Tổng quan</option>
            {months.map((month) => (
              <option key={month} value={month}>
                Tháng {month}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2">
          <DatePicker
            selected={startDate}
            onChange={(date: Date) => {
              if (date) {
                // Lấy năm từ lựa chọn trước đó và gắn vào ngày tháng
                const fullDate = new Date(
                  date.setFullYear(parseInt(selectedYear))
                );
                setStartDate(fullDate);
              }
            }}
            placeholderText="Ngày bắt đầu"
            dateFormat="MM-dd" // Chỉ chọn tháng và ngày
            showMonthDropdown
            showYearDropdown={false} // Ẩn dropdown chọn năm
            locale={vi} // Đặt ngôn ngữ là tiếng Việt
            className="border border-gray-300 rounded p-2"
            isClearable
          />
          <DatePicker
            selected={endDate}
            onChange={(date: Date) => {
              if (date) {
                // Lấy năm từ lựa chọn trước đó và gắn vào ngày tháng
                const fullDate = new Date(
                  date.setFullYear(parseInt(selectedYear))
                );
                setEndDate(fullDate);
              }
            }}
            placeholderText="Ngày kết thúc"
            dateFormat="MM-dd" // Chỉ chọn tháng và ngày
            showMonthDropdown
            showYearDropdown={false} // Ẩn dropdown chọn năm
            locale={vi} // Đặt ngôn ngữ là tiếng Việt
            className="border border-gray-300 rounded p-2"
            isClearable
          />
        </div>
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
