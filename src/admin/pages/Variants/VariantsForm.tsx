import React, { useEffect, useState } from "react";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import { FaSave } from "react-icons/fa";
import { Color, Size } from "../../../Types/TProduct";
import apisphp from "../../../Service/api";

// Interface định nghĩa cấu trúc dữ liệu của một biến thể sản phẩm
interface Variant {
  id: number; // ID duy nhất cho mỗi biến thể
  sizes: string[]; // Danh sách kích thước của biến thể
  colors: string[]; // Danh sách màu sắc của biến thể
  quantity: number; // Số lượng của biến thể
}

// Định nghĩa kiểu Props cho component VariantsForm
type Props = {
  variant: Array<{ quantity: number; color: string; size: string }>;
  setVariantAddress: React.Dispatch<
    React.SetStateAction<
      Array<{ quantity: number; color: string; size: string }>
    >
  >; // Hàm để cập nhật danh sách biến thể ở component cha
  setSizes: React.Dispatch<React.SetStateAction<Size[]>>; // Hàm cập nhật kích thước từ component cha
  setColors: React.Dispatch<React.SetStateAction<Color[]>>; // Hàm cập nhật màu sắc từ component cha
};

const VariantsForm: React.FC<Props> = ({
  variant,
  setVariantAddress,
  setSizes,
  setColors,
}) => {
  // State lưu trữ danh sách các biến thể
  const [variants, setVariants] = useState<Variant[]>([]);
  // State lưu trữ danh sách kích thước và màu sắc
  const [sizes, setLocalSizes] = useState<Size[]>([]);
  const [colors, setLocalColors] = useState<Color[]>([]);

  // useEffect để tải danh sách kích thước và màu sắc khi component được render lần đầu
  useEffect(() => {
    fetchSizes();
    fetchColors();
  }, []);

  // Hàm tải danh sách kích thước từ API
  const fetchSizes = async () => {
    try {
      const response = await apisphp.get("/sizes");
      setLocalSizes(response.data.data); // Lưu kích thước vào state local
      setSizes(response.data.data); // Cập nhật kích thước lên component cha
    } catch (error) {
      console.error("Error fetching sizes:", error);
    }
  };

  // Hàm tải danh sách màu sắc từ API
  const fetchColors = async () => {
    try {
      const responseColor = await apisphp.get("/colors");
      setLocalColors(responseColor.data.data); // Lưu màu sắc vào state local
      setColors(responseColor.data.data); // Cập nhật màu sắc lên component cha
    } catch (error) {
      console.error("Error fetching colors:", error);
    }
  };

  // Hàm thêm một biến thể mới
  const addVariant = () => {
    const newVariant = { id: Date.now(), sizes: [], colors: [], quantity: 1 };
    setVariants((prevVariants) => {
      const updatedVariants = [...prevVariants, newVariant];

      // Cập nhật biến thể về component cha sau khi thêm
      setVariantAddress(
        updatedVariants.map((variant) => ({
          size: variant.sizes.join(", "), // Ghép các kích thước thành chuỗi
          color: variant.colors.join(", "), // Ghép các màu sắc thành chuỗi
          quantity: variant.quantity, // Lấy số lượng
        }))
      );

      return updatedVariants;
    });
  };

  // Hàm xóa một biến thể theo ID
  const removeVariant = (id: number) => {
    setVariants((prevVariants) => {
      const updatedVariants = prevVariants.filter(
        (variant) => variant.id !== id
      );

      // Cập nhật biến thể về component cha sau khi xóa
      setVariantAddress(
        updatedVariants.map((variant) => ({
          size: variant.sizes.join(", "),
          color: variant.colors.join(", "),
          quantity: variant.quantity,
        }))
      );

      return updatedVariants;
    });
  };

  // Hàm chọn hoặc bỏ chọn kích thước hoặc màu sắc
  const toggleSelection = (id: number, field: keyof Variant, value: string) => {
    setVariants((prevVariants) => {
      const updatedVariants = prevVariants.map((variant) => {
        if (variant.id !== id) return variant; // Nếu không phải biến thể cần chỉnh sửa, trả về như cũ

        // Kiểm tra xem variant[field] có phải là mảng string[] hoặc number[] không
        const updatedField = Array.isArray(variant[field]) // Kiểm tra nếu là mảng
          ? (variant[field] as string[]).includes(value)
            ? (variant[field] as string[]).filter((v) => v !== value) // Bỏ giá trị nếu đã chọn
            : [...(variant[field] as string[]), value] // Thêm giá trị nếu chưa chọn
          : variant[field]; // Nếu không phải mảng, giữ nguyên giá trị

        return {
          ...variant,
          [field]: updatedField, // Cập nhật giá trị mới cho biến thể
        };
      });

      // Cập nhật biến thể về component cha
      setVariantAddress(
        updatedVariants.map((variant) => ({
          size: variant.sizes.join(", "),
          color: variant.colors.join(", "),
          quantity: variant.quantity,
        }))
      );

      return updatedVariants;
    });
  };

  // Hàm cập nhật số lượng cho biến thể
  const updateVariant = (id: number, field: keyof Variant, value: number) => {
    setVariants((prevVariants) => {
      const updatedVariants = prevVariants.map((variant) =>
        variant.id === id ? { ...variant, [field]: value } : variant
      );

      // Cập nhật biến thể về component cha
      setVariantAddress(
        updatedVariants.map((variant) => ({
          size: variant.sizes.join(", "),
          color: variant.colors.join(", "),
          quantity: variant.quantity,
        }))
      );

      return updatedVariants;
    });
  };

  // Hàm xử lý khi nhấn nút lưu
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Ngăn chặn reload trang
    console.log("Submitted Variants:", variants); // Log biến thể ra console
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

        <div className="flex items-center space-x-4">
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
