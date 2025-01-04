import React, { useState } from "react";
import imm1 from "../../img/WMNS+AIR+JORDAN+1.jpg";

import { useEffect } from "react";
import apisphp from "../../Service/api";
import { useParams, useNavigate } from "react-router-dom";
import TUser from "../../Types/TUsers";

import { useUserContext } from "../AuthClient/UserContext";
type TComments = {
  comment_id: number;
  user_id: number;
  content: string;
  rating: number;
  created_at: string;
  user: {
    first_name: string;
    image_user: string;
  };
};

const CommentSection = () => {
  const { user } = useUserContext();

  const token = localStorage.getItem("jwt_token");
  const [showAlert, setShowAlert] = useState(false);
  const { id } = useParams();

  const [openSection, setOpenSection] = useState(null);
  const [visibleCommentsCount, setVisibleCommentsCount] = useState(3);
  const [comment, setComments] = useState<TComments[]>([]);
  
  const [menuVisibleCommentId, setMenuVisibleCommentId] = useState<
    number | null
  >(null);

  // Xác định số lượng bình luận hiển thị
  const visibleComments = comment.slice(0, visibleCommentsCount);

  const toggleSection = (section: any) => {
    setOpenSection(openSection === section ? null : section);
  };

  // lấy data từ bên server show ra người dung
  // Lấy bình luận từ API
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await apisphp.get(`user/getall/comments/${id}`);
        setComments(response.data.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
    console.log(fetchComments)
  }, [id]);


  // Hiển thị sao
  const renderStars = (rating: number) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
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
        {/* Đánh giá */}
        <div className="border-b border-gray-300">
        <div
          className="flex justify-between items-center px-4 py-3 font-semibold cursor-pointer"
          onClick={() => toggleSection("reviews")}
        >
          <span className="text-lg">Đánh giá ({comment.length})</span>
          <span className="text-xl">{openSection === "reviews" ? "▲" : "▼"}</span>
        </div>
        {openSection === "reviews" && (
          <div className="w-full border-t border-gray-300 p-4">
            {/* Danh sách bình luận */}
            <div className="space-y-4">
              {comment.map((comment) => (
                <div key={comment.comment_id} className="border-b pb-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={
                        comment.user?.image_user
                          ? `http://127.0.0.1:8000${comment.user.image_user}`
                          : "/default-avatar.png"
                      }
                      alt="User Avatar"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold">{comment.user?.first_name || "Unknown User"}</p>
                      <p className="text-gray-500 text-sm">{comment.created_at}</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-gray-700">{comment.content}</p>
                    <p className="text-yellow-500">{renderStars(comment.rating)}</p>
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
