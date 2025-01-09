import React, { useEffect, useState } from "react";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import apisphp from "../../../Service/api";
import { Color, Size } from "../../../Types/TProduct";
import { toast, ToastContainer } from "react-toastify";

type Variant = {
  id: number;
  size: number | null;
  color: number | null;
  quantity: number;
};

type Props = {
  productId: number;
  variant: Array<{ quantity: number; color: number; size: number }>;
  setVariantAddress: React.Dispatch<
    React.SetStateAction<
      Array<{ quantity: number; color: number; size: number }>
    >
  >;
  setSizes: React.Dispatch<React.SetStateAction<Size[]>>;
  setColors: React.Dispatch<React.SetStateAction<Color[]>>;
};

const VariantsProCreat: React.FC<Props> = ({
  productId,
  setVariantAddress,
  setSizes,
  setColors,
}) => {
  const [localVariants, setLocalVariants] = useState<Variant[]>([]);
  const [sizes, setLocalSizes] = useState<Size[]>([]);
  const [colors, setLocalColors] = useState<Color[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [sizesRes, colorsRes] = await Promise.all([
        apisphp.get("/sizes"),
        apisphp.get("/colors"),
      ]);
      setLocalSizes(sizesRes.data.data);
      setLocalColors(colorsRes.data.data);
      setSizes(sizesRes.data.data);
      setColors(colorsRes.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Lỗi khi tải dữ liệu kích thước và màu sắc.");
    }
  };

  const addVariant = () => {
    setLocalVariants((prev) => [
      ...prev,
      { id: Date.now(), size: null, color: null, quantity: 1 },
    ]);
  };

  const removeVariant = (id: number) => {
    setLocalVariants((prev) => prev.filter((variant) => variant.id !== id));
  };

  const updateVariant = (
    id: number,
    field: "size" | "color" | "quantity",
    value: number
  ) => {
    setLocalVariants((prev) =>
      prev.map((variant) =>
        variant.id === id ? { ...variant, [field]: value } : variant
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (localVariants.some((variant) => !variant.size || !variant.color)) {
      toast.warn("Mỗi biến thể phải chọn một kích thước và một màu sắc!");
      return;
    }

    try {
      const res = await apisphp.get(`/productsvariants/${productId}`);
      const existingVariants = res.data.variants;
      console.log("existingVariants", existingVariants);
      const duplicate = localVariants.some((variant) =>
        existingVariants.some(
          (existing: Variant) =>
            existing.color_id === variant.color &&
            existing.size_id === variant.size
        )
      );
      console.log(duplicate);
      console.log("localVariants", localVariants);
      if (duplicate) {
        toast.warn("Biến thể với kích thước và màu sắc này đã tồn tại!");
        return;
      }

      const payload = localVariants.map((variant) => ({
        product_id: productId,
        size_id: variant.size,
        color_id: variant.color,
        quantity: variant.quantity,
      }));

      const response = await apisphp.post("/products/creat", payload);

      if (response.status === 201) {
        toast.success("Thêm biến thể thành công!");
        setLocalVariants([]);
        setVariantAddress((prev) => [...prev, ...payload]);
      } else {
        toast.error("Thêm biến thể thất bại.");
      }
    } catch (error) {
      console.error("Error saving variants:", error);
      toast.error("Đã xảy ra lỗi khi lưu biến thể.");
    }
  };

  return (
    <div className="mx-auto mt-8 p-6 bg-white rounded-lg">
      <ToastContainer
        theme="light"
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
      <h2 className="text-left font-semibold mb-4 text-gray-800">
        Thêm Biến Thể Sản Phẩm
      </h2>
      <form onSubmit={handleSubmit}>
        {localVariants.map((variant) => (
          <div
            key={variant.id}
            className="mb-6 p-6 bg-gray-50 border border-gray-200 rounded-md shadow-sm relative"
          >
            <div className="flex justify-center gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kích Thước
                </label>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size.id}
                      type="button"
                      onClick={() => updateVariant(variant.id, "size", size.id)}
                      className={`px-3 py-2 border rounded-md ${
                        variant.size === size.id
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      {size.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Màu Sắc
                </label>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <div
                      key={color.id}
                      className={`w-8 h-8 rounded-full border cursor-pointer transition-all ${
                        variant.color === color.id
                          ? "ring-2 ring-blue-500 scale-105"
                          : ""
                      }`}
                      style={{ backgroundColor: color.hex }}
                      onClick={() =>
                        updateVariant(variant.id, "color", color.id)
                      }
                      title={color.name}
                    ></div>
                  ))}
                </div>
              </div>

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
                  min={1}
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
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Thêm
          </button>
        </div>
      </form>
    </div>
  );
};

export default VariantsProCreat;
