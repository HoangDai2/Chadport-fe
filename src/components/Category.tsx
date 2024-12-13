import React, { useEffect, useState } from "react";
import apisphp from "../Service/api";
import Tcategory from "../Types/TCategories"; // Giả sử bạn có định nghĩa type cho danh mục

const Category = () => {
  const [categories, setCategories] = useState<Tcategory[]>([]);
  const [loading, setLoading] = useState(true);

  // Gọi API khi component được mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const responses = await apisphp.get("getall/categories"); // Thay URL bằng endpoint API của bạn
        setCategories(responses.data.data); // Gán dữ liệu danh mục vào state
      } catch (error) {
        console.error("Lỗi khi gọi API danh mục:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <p>Đang tải dữ liệu danh mục...</p>;
  }

  return (
    <>
      <div className="block-title">
        <h2>CATEGORIES</h2>
      </div>
      <section className="section section-padding m-b-60 ">
        <div className="container mx-auto">
          <div className="grid grid-cols-3 gap-4">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className={`${
                  index === 0
                    ? "col-span-1 row-span-2 h-70"
                    : index === 1 || index === 2
                    ? "col-span-1 h-60"
                    : "col-span-2 h-64"
                } border border-gray-300 rounded-md bg-white p-4 relative group`}
              >
                <a href={`categoriesnike/${category.id}`}>
                  <img
                    src={category.imageURL}
                    alt={category.name}
                    className="w-full h-full object-contain"
                  />
                </a>
                <a
                  href={`categoriesnike/${category.id}`}
                  className="hidden group-hover:flex absolute inset-0 justify-center items-center bg-black bg-opacity-50 text-white text-lg font-medium transition-opacity duration-300"
                >
                  {category.name} →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Category;
