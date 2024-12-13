import { ApexOptions } from "apexcharts";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactApexChart from "react-apexcharts";

const options: ApexOptions = {
  legend: {
    show: false,
    position: "top",
    horizontalAlign: "left",
  },
  colors: ["#3C50E0", "#80CAEE"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    height: 335,
    type: "area",
    dropShadow: {
      enabled: true,
      color: "#623CEA14",
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },
    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: "smooth",
  },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: "#fff",
    strokeColors: ["#3056D3", "#80CAEE"],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: "category",
    categories: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: "0px",
      },
    },
    min: 0,
    labels: {
      formatter: (value) => {
        // Format numbers with commas
        return value.toLocaleString("vi-VN"); // Adjust currency or format as needed
      },
    },
  },
  tooltip: {
    y: {
      formatter: (value) => {
        return value.toLocaleString("vi-VN"); // Format tooltip values with commas
      },
    },
  },
};

interface ChartOneState {
  series: {
    name: string;
    data: number[]; // Store raw numbers here for the chart
  }[];
}

const ChartOne: React.FC = () => {
  const [state, setState] = useState<ChartOneState>({
    series: [],
  });

  const [selectedYear, setSelectedYear] = useState<string>(
    new Date().getFullYear().toString()
  );
  const years = Array.from({ length: 5 }, (_, i) =>
    (new Date().getFullYear() - i).toString()
  ); // List of years for selection

  const [timeRange, setTimeRange] = useState<string>("All");

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/showAllOrder")
      .then((response) => {
        const orders = response.data.data;
        const monthlySales = {
          "Doanh thu": Array(12).fill(0),
          "Loi Nhuan": Array(12).fill(0),
        };

        if (orders && orders.length > 0) {
          orders.forEach((order: any) => {
            const orderDate = new Date(order.created_at);
            if (isNaN(orderDate.getTime())) {
              console.error("Invalid Date:", order.created_at);
            } else {
              const orderYear = orderDate.getFullYear();
              if (orderYear.toString() === selectedYear) {
                const orderMonth = orderDate.getMonth();
                if (order.status === "đã hoàn thành") {
                  monthlySales["Doanh thu"][orderMonth] += order.total_money;
                  monthlySales["Loi Nhuan"][orderMonth] +=
                    order.total_money * 0.3;
                }
              }
            }
          });
          setState({
            series: [
              {
                name: "Doanh Thu",
                data: filterData(monthlySales["Doanh thu"], timeRange),
              },
              {
                name: "Loi Nhuan",
                data: filterData(monthlySales["Loi Nhuan"], timeRange),
              },
            ],
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching orders data:", error);
      });
  }, [timeRange, selectedYear]);

  const filterData = (data: number[], timeRange: string) => {
    if (timeRange === "Year") {
      return data;
    }
    return data;
  };

  const handleYearChange = (year: string) => {
    setSelectedYear(year); // Update the selected year
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7 pb-5 drop-shadow-xl dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <select
              onChange={(e) => handleYearChange(e.target.value)}
              className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={state.series}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
