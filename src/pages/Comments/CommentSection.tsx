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

  // xổ menu
  const handleMenuToggle = (commentId: number) => {
    setMenuVisibleCommentId(
      menuVisibleCommentId === commentId ? null : commentId
    );
  };

  return (
    <>
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
                {comments.map((comment, index) => (
                  <div key={index} className="border-b pb-4">
                    <div>
                      <p className="font-semibold">{comment.name}</p>
                      {/* Nếu có ảnh, hiển thị ảnh */}
                      {comment.image && (
                        <img
                          src={comment.image}
                          alt={`Comment image by ${comment.name}`}
                          className="w-16 h-16 mt-2 rounded"
                        />
                      )}
                    </div>
                    <div className="mt-2">
                      <p className="text-gray-700">{comment.content}</p>
                      {renderStars(comment.rating)}
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
