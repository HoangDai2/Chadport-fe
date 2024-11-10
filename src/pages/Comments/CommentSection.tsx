import React, { useState } from "react";
import imm1 from "../../img/WMNS+AIR+JORDAN+1.jpg";
import TComments from "../../Types/TComments";
import { useEffect } from "react";
import apisphp from "../../Service/api";
import { useParams } from "react-router-dom";
import { postComment } from "./CommentsAdd";
import TUser from "../../Types/TUsers";
import { handleDislike, handleLike } from "./LikeAndDislike";

type Props = {};

const CommentSection = ({ commentId }: any) => {
  const { id } = useParams();
  const [likeCounts, setLikeCounts] = useState<Record<number, number>>({});
  const [dislikeCounts, setDislikeCounts] = useState<Record<number, number>>(
    {}
  );

  const [openSection, setOpenSection] = useState(null);
  const [visibleCommentsCount, setVisibleCommentsCount] = useState(3);
  const [comment, setComments] = useState<TComments[]>([]);
  const [newComment, setNewComment] = useState<TComments>({
    comment_id: 0,
    product_id: Number(id),
    user_id: 1,
    user: {} as TUser,
    content: "",
    rating: 0,
    like_count: 0,
    dislike_count: 0,
    reported: false,
    created_at: "",
    updated_at: "",
  });
  const [menuVisibleCommentId, setMenuVisibleCommentId] = useState<
    number | null
  >(null);

  // Xác định số lượng bình luận hiển thị
  const visibleComments = comment.slice(0, visibleCommentsCount);

  const toggleSection = (section: any) => {
    setOpenSection(openSection === section ? null : section);
  };

  // lấy data từ bên server show ra người dung
  useEffect(() => {
    const fetchDataComments = async () => {
      try {
        // đoạn này sẽ lấy data comments
        const commetsResponse = await apisphp.get(`/getall/comments/${id}`);
        setComments(commetsResponse.data.data);
        console.log(commetsResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataComments();
  }, []);

  // Hàm xử lý khi nhấn nút Post Comment
  const handlePostComment = async () => {
    const commentData = { ...newComment };

    if (commentData.content.trim()) {
      try {
        console.log("Posting Comment:", commentData);
        const createdComment = await postComment(commentData);
        setComments([createdComment, ...comment]); // Thêm bình luận mới vào đầu danh sách
        setNewComment({ ...newComment, content: "", rating: 0 }); // Reset nội dung và đánh giá
      } catch (error) {
        console.error("Error posting comment:", error);
      }
    } else {
      alert("Vui lòng nhập nội dung trước khi đăng!");
    }
  };

  // xổ menu
  const handleMenuToggle = (commentId: number) => {
    setMenuVisibleCommentId(
      menuVisibleCommentId === commentId ? null : commentId
    );
  };

  const handleEditComment = (commentId: number) => {
    alert(`Edit comment ID: ${commentId}`);
  };

  const handleDeleteComment = (commentId: number) => {
    alert(`Delete comment ID: ${commentId}`);
  };

  // hàm này để lưu rating
  const handleRatingSelect = (star: number) => {
    setNewComment({ ...newComment, rating: star });
  };

  // hàm này để chuyển đổi giá trị number ở db sang biếu tưởng hình sao
  const renderStars = (rating: any) => {
    return "★".repeat(rating);
  };

  const handleEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Ngăn xuống dòng
      handlePostComment(); // Gọi hàm đăng bình luận
    }
  };

  // Tải số lượng like/dislike từ localStorage khi component mount
  useEffect(() => {
    comment.forEach((com) => {
      const storedLikes = localStorage.getItem(`likes_${com.comment_id}`);
      const storedDislikes = localStorage.getItem(`dislikes_${com.comment_id}`);
      setLikeCounts((prev) => ({
        ...prev,
        [com.comment_id]: storedLikes ? parseInt(storedLikes) : 0,
      }));
      setDislikeCounts((prev) => ({
        ...prev,
        [com.comment_id]: storedDislikes ? parseInt(storedDislikes) : 0,
      }));
    });
  }, [comment]);

  return (
    <>
      {/* Description Additional information Reviews */}
      <div className="w-full border-t border-gray-300 mt-[50px]">
        {/* Đánh giá */}
        <div className="border-b border-gray-300">
          <div
            className="flex justify-between items-center px-4 py-3 font-semibold cursor-pointer"
            onClick={() => toggleSection("reviews")}
          >
            <span className="text-lg">Đánh giá ({comment.length})</span>
            <span className="text-xl">
              {openSection === "reviews" ? "▲" : "▼"}
            </span>
          </div>
          {openSection === "reviews" && (
            <div className="w-full border-t border-gray-300 p-4 md:p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
                <h2 className="text-4xl font-bold">
                  4.9 <span className="text-green-500">★★★★★</span>
                </h2>
              </div>

              {/* Lọc và sắp xếp */}
              <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                <div className="flex space-x-2 mb-4 md:mb-0">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <button
                      key={star}
                      className={`px-3 py-1 border rounded ${
                        newComment.rating === star
                          ? "bg-yellow-400 text-white"
                          : "hover:bg-gray-200"
                      }`}
                      onClick={() => handleRatingSelect(star)}
                    >
                      ★ {star}
                    </button>
                  ))}
                </div>
                <div className="w-full md:w-auto">
                  <select className="w-full md:w-auto border border-gray-300 px-3 py-1 rounded">
                    <option value="newest">Tất Cả</option>
                    <option value="newest">Hình Ảnh</option>
                    <option value="oldest">Video</option>
                  </select>
                </div>
              </div>

              {/* Danh sách bình luận */}
              <div className="space-y-4">
                {visibleComments.map((com: TComments) => (
                  <div key={com.comment_id} className="border-b pb-4 mb-4">
                    <div className="grid grid-cols-5 gap-4">
                      <div className="col-span-1 row-span-2 flex flex-col items-center justify-center text-green-500 space-y-2">
                        <div>{renderStars(com.rating)}</div>
                        <img
                          src="https://via.placeholder.com/50"
                          alt="User Avatar"
                          className="w-12 h-12 rounded-full"
                        />
                      </div>

                      <div className="col-span-4 flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-3">
                        <span className="font-semibold">
                          {com.user ? com.user.first_name : "Unknown User"}
                        </span>

                        <span className="text-gray-500 text-sm">
                          {com.created_at}
                        </span>
                      </div>

                      <div className="col-span-4 row-span-1">
                        <p className="text-gray-700 text-left">{com.content}</p>
                        <div className="col-span-4 flex items-center mt-2 space-x-4 text-sm text-gray-500">
                          <button className="hover:text-black">Đọc thêm</button>
                          <button className="hover:text-black">
                            Báo cáo đánh giá
                          </button>

                          {/* phần này xử lí nút like và dislike fake */}
                          <div className="flex items-center space-x-1">
                            <button
                              onClick={() =>
                                handleLike(
                                  com.comment_id,
                                  likeCounts,
                                  setLikeCounts
                                )
                              }
                              className="hover:text-black"
                            >
                              👍
                            </button>
                            <span>{likeCounts[com.comment_id] || 0}</span>
                            <button
                              onClick={() =>
                                handleDislike(
                                  com.comment_id,
                                  dislikeCounts,
                                  setDislikeCounts
                                )
                              }
                              className="hover:text-black"
                            >
                              👎
                            </button>
                            <span>{dislikeCounts[com.comment_id] || 0}</span>
                          </div>

                          <div className="relative">
                            <button
                              style={{ fontSize: "15px" }}
                              onClick={() => handleMenuToggle(com.comment_id)}
                            >
                              ...
                            </button>
                            {menuVisibleCommentId === com.comment_id && (
                              <div className="absolute right-[-60px] bg-white border p-2 shadow-lg rounded-md">
                                <button
                                  key={com.comment_id}
                                  onClick={() =>
                                    handleEditComment(com.comment_id)
                                  }
                                  className="block px-2 py-1 hover:bg-gray-100"
                                >
                                  Sửa
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeleteComment(com.comment_id)
                                  }
                                  className="block px-2 py-1 hover:bg-gray-100"
                                >
                                  Xóa
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Post Comment */}
              <textarea
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Viết bình luận của bạn..."
                rows={4}
                value={newComment.content}
                onChange={(e) =>
                  setNewComment({ ...newComment, content: e.target.value })
                }
                onKeyDown={handleEnterPress}
                style={{
                  resize: "none", // Ngăn người dùng thay đổi kích thước
                  overflowWrap: "break-word", // Ngắt từ dài khi đạt chiều rộng tối đa
                  whiteSpace: "pre-wrap", // Giữ nguyên khoảng trắng và ngắt dòng tự động
                }}
              />

              {/* Link đến Xem thêm bình luận / Ẩn bình luận */}
              <div className="flex justify-center mt-4">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setVisibleCommentsCount(
                      visibleCommentsCount < comment.length
                        ? visibleCommentsCount + 3
                        : 3
                    );
                  }}
                  className="text-sm text-gray-500 hover:underline"
                >
                  {visibleCommentsCount < comment.length
                    ? "Xem thêm bình luận"
                    : "Ẩn bình luận"}
                </a>
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
