import React, { useState } from "react";
import imm1 from "../../img/WMNS+AIR+JORDAN+1.jpg";

import { useEffect } from "react";
import apisphp from "../../Service/api";
import { useParams, useNavigate } from "react-router-dom";
import TUser from "../../Types/TUsers";

import { useUserContext } from "../AuthClient/UserContext";
type TComments = {
  comment_id: number;
  product_item_id: number;
  user_id: number;
  user: TUser;
  name: string;
  color_name: string;
  size_name: string;
  image: string;
  image_user: string;
  content: string;
  rating: number;
  reported: boolean;
  created_at: string;
  updated_at: string;
};

const CommentSection = () => {
  const { user } = useUserContext();

  const token = localStorage.getItem("jwt_token");
  const [showAlert, setShowAlert] = useState(false);
  const { id: productId } = useParams();
  const [comments, setComments] = useState<TComments[]>([]);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [visibleCommentsCount, setVisibleCommentsCount] = useState(3);

  const [menuVisibleCommentId, setMenuVisibleCommentId] = useState<
    number | null
  >(null);

  // Xác định số lượng bình luận hiển thị
  const visibleComments = comments.slice(0, visibleCommentsCount);

  const toggleSection = (section: any) => {
    setOpenSection(openSection === section ? null : section);
  };

  // Lấy bình luận từ API
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await apisphp.get(`/commentsByProductId/${productId}`);
        setComments(response.data.comments || []);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [productId]);

  // Tính tổng và trung bình số sao
  const calculateAverageRating = () => {
    if (comments.length === 0) return 0;
    const totalRating = comments.reduce((sum, comment) => sum + comment.rating, 0);
    return (totalRating / comments.length).toFixed(1); // Tính trung bình và làm tròn 1 chữ số thập phân
  };

  const averageRating = calculateAverageRating(); // Tính toán trung bình số sao

  // Render stars
  const renderStars = (rating: number) => {
    const filledStars = "★".repeat(rating);
    const emptyStars = "☆".repeat(5 - rating);
    return (
      <span className="text-yellow-500">
        {filledStars}
        <span className="text-gray-300">{emptyStars}</span>
      </span>
    );
  };

  // định dạng lại ngày giờ theo việt nam
  const formatDateToVietnamese = (dateString: any) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("vi-VN", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(date);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  const openModal = (content: React.ReactNode) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalContent(null);
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Modal phóng to ảnh bình luận của user  */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
          onClick={closeModal} // Đóng modal khi click bên ngoài
        >
          <div
            className="relative bg-white p-4 rounded-lg"
            onClick={(e) => e.stopPropagation()} // Ngăn đóng modal khi click vào nội dung
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={closeModal}
            >
              ✕
            </button>
            {modalContent}
          </div>
        </div>
      )}

      {showAlert}
      {/* Description Additional information Reviews */}
      <div className="w-full border-t border-gray-300 mt-[50px]">
        {/* Review Section */}
        <div className="border-b border-gray-300">
          <div
            className="flex justify-between items-center px-4 py-3 font-semibold cursor-pointer"
            onClick={() => setOpenSection(openSection === "reviews" ? null : "reviews")}
          >
            <span className="text-lg">Đánh giá ({comments.length})</span>
            <span className="text-xl">{openSection === "reviews" ? "▲" : "▼"}</span>
          </div>
          {openSection === "reviews" && (
            <div className="w-full border-t border-gray-300 p-4">
              {/* Tổng số sao */}
              <div className="flex items-center mb-4">
                <span className="text-xl font-bold text-yellow-500">
                  ★ {averageRating} / 5
                </span>
                <span className="ml-2 text-gray-600">
                  ({comments.length} đánh giá)
                </span>
              </div>

              <div className="space-y-4">
                {/* map data */}
                {comments.map((cmt) => (
                  <div className="p-4 border-b">
                    {/* img và biến thể */}
                    <div className="flex items-center gap-2">
                      <div>
                        <img
                          className="object-cover  w-10 h-10 rounded-full bg-gray-200"
                          src={`http://127.0.0.1:8000${cmt.image_user}`}
                          alt=""
                        />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-gray-700">{cmt.name}</div>
                        <div className="text-sm text-gray-500">
                          {formatDateToVietnamese(cmt.created_at)}  | Phân loại hàng : {cmt.color_name} - {cmt.size_name}
                        </div>
                      </div>
                    </div>

                    {/* content */}
                    <div className="pl-12">
                      <div className="text-left mt-2 text-yellow-500"> {renderStars(cmt.rating)}</div>

                      <div className="text-left mt-2 text-gray-700">
                        {cmt.content}
                      </div>

                      <div className="mt-4 flex gap-2">
                        <div className="relative group w-24 h-24">
                          <img
                            src={`http://127.0.0.1:8000/storage/${cmt.image}`}
                            alt="Ảnh"
                            className="w-full h-full object-cover rounded-lg"
                            onClick={() =>
                              openModal(
                                <img
                                  src={`http://127.0.0.1:8000/storage/${cmt.image}`}
                                  alt="QR"
                                  className=" w-[400px] max-h-screen"
                                />
                              )
                            }
                          />

                        </div>
                      </div>
                    </div>
                  </div>
                ))}

              </div>
            </div>
          )}
        </div>


        {/* Mô tả */}
        <div className="border-b border-gray-300">
          <div
            className="flex justify-between items-center px-4 py-3 font-semibold cursor-pointer"
            onClick={() => toggleSection("description")}
          >
            <span className="text-lg">Mô tả</span>
            <span className="text-xl">
              {openSection === "description" ? "▲" : "▼"}
            </span>
          </div>
          {openSection === "description" && (
            <div className="px-4 py-2 text-gray-600">
              <div className="grid grid-cols-4 grid-rows-5 gap-2">
                <div className="col-span-2 row-span-4 flex items-center justify-center">
                  <span className="text-left">
                    Giày Thể Thao Nike Air Jordan 1 High OG UNC University Blue
                    555088-134 575441-134 Màu Xanh Trắng là đôi giày thời trang
                    có thiết kế trẻ trung, năng động đến từ thương hiệu Nike nổi
                    tiếng của Mỹ. Nike Air Jordan 1 High OG UNC University Blue
                    555088-134 575441-134 được làm từ chất liệu cao cấp mang lại
                    cảm giác thoải mái khi đi lên chân.
                  </span>
                </div>
                <div className="row-span-2 col-start-3">
                  <img src={imm1} alt="" />
                </div>
                <div className="row-span-2 col-start-4 row-start-3">
                  <img src={imm1} alt="" />
                </div>
                <div className="row-span-2 col-start-3 row-start-3">
                  <img src={imm1} alt="" />
                </div>
                <div className="row-span-2 col-start-4 row-start-1">
                  <img src={imm1} alt="" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Thông tin chi tiết */}
        <div className="border-b border-gray-300">
          <div
            className="flex justify-between items-center px-4 py-3 font-semibold cursor-pointer"
            onClick={() => toggleSection("details")}
          >
            <span className="text-lg">Thông tin chi tiết</span>
            <span className="text-xl">
              {openSection === "details" ? "▲" : "▼"}
            </span>
          </div>
          {openSection === "details" && (
            <div className="px-4 py-6 text-gray-600 bg-white rounded-md ">
              <h3 className="text-xl font-bold mb-4">
                Thông tin chi tiết sản phẩm
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div>
                  <h4 className="font-semibold text-lg">Mô tả sản phẩm</h4>
                  <p className="text-gray-700 mt-1">
                    Giày Thể Thao Nike Air Jordan 1 High OG UNC University Blue
                    có thiết kế trẻ trung, phù hợp cho các hoạt động thể thao và
                    thời trang.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-lg">Chất liệu</h4>
                  <p className="text-gray-700 mt-1">
                    Da thật, cao su tự nhiên, và vật liệu cao cấp giúp tăng độ
                    bền và mang lại cảm giác thoải mái.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-lg">Kích thước</h4>
                  <p className="text-gray-700 mt-1">
                    Size: 38 - 44, Phù hợp với kích cỡ chân từ 24cm đến 28cm.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-lg">Hướng dẫn sử dụng</h4>
                  <p className="text-gray-700 mt-1">
                    Vệ sinh bằng khăn mềm, tránh tiếp xúc với nước và các hóa
                    chất mạnh để đảm bảo độ bền của sản phẩm.
                  </p>
                </div>

                <div className="col-span-1 md:col-span-2">
                  <h4 className="font-semibold text-lg">Thông tin bảo hành</h4>
                  <p className="text-gray-700 mt-1">
                    Bảo hành 6 tháng cho các lỗi do nhà sản xuất.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};




export default CommentSection;
