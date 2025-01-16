import React, { createContext, useContext, useState, ReactNode } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// Tạo kiểu dữ liệu cho context
interface LoadingContextType {
  loading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}

// Tạo context mặc định
const LoadingContext = createContext<LoadingContextType>({
  loading: false,
  startLoading: () => { },
  stopLoading: () => { },
});

// Hook để sử dụng context dễ dàng
export const useLoading = () => useContext(LoadingContext);

// Provider để bọc toàn bộ ứng dụng
export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);

  // Bắt đầu loading
  const startLoading = () => {
    setLoading(true);
    NProgress.start(); // Hiển thị thanh tiến trình
  };

  // Kết thúc loading
  const stopLoading = () => {
    setLoading(false);
    NProgress.done(); // Dừng thanh tiến trình
  };

  return (
    <LoadingContext.Provider value={{ loading, startLoading, stopLoading }}>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
          <div className="w-full max-w-md">
            {/* Thanh loading */}
            <div className="h-1 w-full bg-gray-300 rounded overflow-hidden">
              <div className="h-full bg-black animate-[loading-bar_1.5s_infinite_linear]"></div>
            </div>
          </div>
        </div>
      )}
      {children}
    </LoadingContext.Provider>
  );
};
