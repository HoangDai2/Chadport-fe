import React, { useEffect, useState } from "react";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import { FaSave } from "react-icons/fa";
import { Color, Size } from "../../../Types/TProduct";
import apisphp from "../../../Service/api";

interface Variant {
  id: number;
  sizes: string[];
  colors: string[];
  quantity: number;
}

type Props = {
  variant: Array<{ quantity: number; color: string; size: string }>;
  setVariantAddress: React.Dispatch<
    React.SetStateAction<
      Array<{ quantity: number; color: string; size: string }>
    >
  >;
};

const VariantsForm: React.FC<Props> = ({ variant, setVariantAddress }) => {
  const [variants, setVariants] = useState<Variant[]>([]);
  const [sizes, setSizes] = useState<Size[]>([]);
  const [colors, setColors] = useState<Color[]>([]);

  useEffect(() => {
    fetchSizes();
    fetchColors();
  }, []);

  const fetchSizes = async () => {
    try {
      const response = await apisphp.get("/sizes");
      setSizes(response.data.data);
    } catch (error) {
      console.error("Error fetching sizes:", error);
    }
  };

  const fetchColors = async () => {
    try {
      const responseColor = await apisphp.get("/colors");
      setColors(responseColor.data.data);
    } catch (error) {
      console.error("Error fetching colors:", error);
    }
  };

  const addVariant = () => {
    const newVariants = [
      ...variants,
      { id: Date.now(), sizes: [], colors: [], quantity: 1 },
    ];
    setVariants(newVariants);
    setVariantAddress(
      newVariants.map((variant) => ({
        size: variant.sizes.join(", "),
        color: variant.colors.join(", "),
        quantity: variant.quantity,
      }))
    );
  };

  const removeVariant = (id: number) => {
    setVariants(variants.filter((variant) => variant.id !== id));
  };

  const toggleSelection = (id: number, field: keyof Variant, value: string) => {
    setVariants(
      variants.map((variant) =>
        variant.id === id
          ? {
              ...variant,
              [field]: variant[field].includes(value)
                ? (variant[field] as string[]).filter((v) => v !== value)
                : [...(variant[field] as string[]), value],
            }
          : variant
      )
    );
  };

  const updateVariant = (id: number, field: keyof Variant, value: number) => {
    setVariants(
      variants.map((variant) =>
        variant.id === id ? { ...variant, [field]: value } : variant
      )
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const transformedVariants = variants.map((variant) => ({
      size: variant.sizes.join(", "),
      color: variant.colors.join(", "),
      quantity: variant.quantity,
    }));

    setVariantAddress(transformedVariants); // Đẩy dữ liệu lên ProductAdd
    console.log("Submitted Variants:", transformedVariants);
  };

  return (
    <div className="max-w-5xl mx-auto mt-8 p-6 bg-white rounded-lg">
      <h2 className="text-left font-semibold mb-4 text-gray-800">
        Quản Lý Biến Thể Sản Phẩm
      </h2>
      <form onSubmit={handleSubmit}>
        {variants.map((variant) => (
          <div
            key={variant.id}
            className="mb-6 p-6 bg-gray-50 border border-gray-200 rounded-md shadow-sm relative"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Size */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kích Thước
                </label>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size.id}
                      type="button"
                      onClick={() =>
                        toggleSelection(variant.id, "sizes", size.name)
                      }
                      className={`px-3 py-2 border rounded-md ${
                        variant.sizes.includes(size.name)
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      {size.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Màu Sắc
                </label>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <div
                      key={color.id}
                      className={`w-8 h-8 rounded-full border cursor-pointer ${
                        variant.colors.includes(color.name)
                          ? "ring-2 ring-blue-500"
                          : ""
                      }`}
                      style={{
                        backgroundColor: color.hex,
                      }}
                      onClick={() =>
                        toggleSelection(variant.id, "colors", color.name)
                      }
                      title={color.name}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số Lượng
                </label>
                <input
                  type="number"
                  value={variant.quantity}
                  onChange={(e) =>
                    updateVariant(variant.id, "quantity", +e.target.value)
                  }
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => removeVariant(variant.id)}
              className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-black text-white rounded-full hover:bg-red-600"
            >
              <AiOutlineClose />
            </button>
          </div>
        ))}

        <div className="flex justify-center items-center space-x-4">
          <button
            type="submit"
            className="border text-gray-700 py-2 px-4 rounded-lg flex items-center"
          >
            <FaSave className="mr-2" />
            Lưu
          </button>
          <button
            type="button"
            onClick={addVariant}
            className="w-10 h-10 bg-black text-white rounded-lg flex justify-center items-center"
          >
            <AiOutlinePlus />
          </button>
        </div>
      </form>
    </div>
  );
};

export default VariantsForm;
