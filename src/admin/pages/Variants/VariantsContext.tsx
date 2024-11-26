import React, { createContext, useState, useEffect, ReactNode } from "react";
import apisphp from "../../../Service/api";
import { Color, Size, TProduct, TVariant } from "../../../Types/TProduct";

interface ProductContextType {
  sizes: Size[];
  colors: Color[];
  variants: TVariant[];
  setVariants: React.Dispatch<React.SetStateAction<TVariant[]>>;
  fetchSizesAndColors: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sizes, setSizes] = useState<Size[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [variants, setVariants] = useState<TVariant[]>([]);

  useEffect(() => {
    fetchSizesAndColors();
  }, []);

  const fetchSizesAndColors = async () => {
    try {
      const sizeResponse = await apisphp.get("/sizes");
      const colorResponse = await apisphp.get("/colors");
      setSizes(sizeResponse.data.data);
      setColors(colorResponse.data.data);
    } catch (error) {
      console.error("Error fetching sizes and colors:", error);
    }
  };

  return (
    <ProductContext.Provider
      value={{ sizes, colors, variants, setVariants, fetchSizesAndColors }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
