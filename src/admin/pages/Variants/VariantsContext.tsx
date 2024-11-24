import React, { createContext, useState, useContext } from "react";
import { Color, Size } from "../../../Types/TProduct";

interface Variant {
  product: any;
  id: number;
  product_id: number;
  color_id: number;
  size_id: number;
  quatity: number;
  color?: Color; // Bao gồm thông tin màu sắc
  size?: Size; // Bao gồm thông tin kích cỡ
}

interface VariantsContextType {
  variants: Variant[];
  setVariants: React.Dispatch<React.SetStateAction<Variant[]>>;
}

// Tạo context mặc định
const VariantsContext = createContext<VariantsContextType | undefined>(
  undefined
);

// Provider để quản lý variants
export const VariantsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [variants, setVariants] = useState<Variant[]>([]);

  return (
    <VariantsContext.Provider value={{ variants, setVariants }}>
      {children}
    </VariantsContext.Provider>
  );
};

// Hook để sử dụng VariantsContext
export const useVariants = () => {
  const context = useContext(VariantsContext);
  if (!context) {
    throw new Error("useVariants must be used within a VariantsProvider");
  }
  return context;
};
