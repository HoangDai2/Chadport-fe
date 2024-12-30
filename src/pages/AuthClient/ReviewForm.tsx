// src/pages/AuthClient/ReviewForm.tsx
import React, { useState } from "react";
import { FaStar } from "react-icons/fa"; // Import icon thư viện
import axios from "axios";
import { useUserContext } from "./UserContext"; // Import UserContext
import TComments from "../../Types/TComments";

interface ReviewFormProps {
  commentData: TComments | null; // Dữ liệu comment
  onClose: () => void; // Hàm để đóng modal
  productName: string; // Tên sản phẩm
  productImage: string; // URL hình ảnh sản phẩm
}

const ReviewForm: React.FC<ReviewFormProps> = ({ commentData, onClose, productName, productImage }) => {
  const { token } = useUserContext(); // Lấy token từ UserContext

  // Kiểm tra dữ liệu đầu vào
  const product_item_id = commentData?.product_item_id;
  const user_id = commentData?.user_id;

  const [reviewData, setReviewData] = useState({
    rating: 0,
    content: "",
    image: null as File | null,
  });

  // Hàm thay đổi rating
  const handleReviewChange = (rating: number) => {
    setReviewData((prev) => ({ ...prev, rating }));
  };

  // Hàm thay đổi nội dung bình luận
  const handleReviewContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setReviewData((prev) => ({ ...prev, content: value }));
  };

  // Hàm thay đổi hình ảnh
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReviewData((prev) => ({ ...prev, image: file }));
    }
  };

  // Hàm gửi đánh giá
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!product_item_id || !user_id) {
      alert("Không tìm thấy thông tin sản phẩm hoặc người dùng.");
      return;
    }

    const formData = new FormData();
    formData.append("product_item_id", product_item_id.toString());
    formData.append("user_id", user_id.toString());
    formData.append("content", reviewData.content);
    formData.append("rating", reviewData.rating.toString());
    if (reviewData.image) {
      formData.append("image", reviewData.image);
    }

    try {
      console.log("Authorization Token:", token);
      console.log("Form Data:", {
        product_item_id,
        user_id,
        content: reviewData.content,
        rating: reviewData.rating,
        image: reviewData.image,
      });
      const response = await axios.post("http://127.0.0.1:8000/api/user/add/comments", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        alert("Đánh giá thành công!");
        onClose(); // Đóng modal
        setReviewData({ rating: 0, content: "", image: null }); // Reset form
      }
    } catch (error: any) {
      console.error("Error adding comment:", error);
      alert("Đã có lỗi xảy ra khi gửi đánh giá: " + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="bg-white rounded-lg w-3/4 lg:w-1/2 p-6">
      {/* Display Product Name and Image */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold">{productName}</h3>
        {productImage && (
          <img src={productImage} alt={productName} className="w-full h-auto rounded-md mb-2" />
        )}
      </div>
      <h3 className="text-2xl font-semibold mb-4">Đánh Giá Sản Phẩm</h3>
      <div className="mb-4">
        <label className="block text-gray-700">Chất lượng sản phẩm:</label>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className={`cursor-pointer ${star <= reviewData.rating ? "text-yellow-500" : "text-gray-300"}`}
              onClick={() => handleReviewChange(star)}
              size={30}
            />
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Nội dung:</label>
        <textarea
          value={reviewData.content}
          onChange={handleReviewContentChange}
          className="border rounded-md p-2 w-full"
          rows={4}
          placeholder="Hãy chia sẻ những điều bạn thích về sản phẩm này với những người mua khác."
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Hình ảnh:</label>
        <input
          type="file"
          onChange={handleFileChange}
          className="border rounded-md p-2 w-full"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
        >
          Trở lại
        </button>
        <button
          type="button"
          onClick={handleSubmitReview}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Hoàn Thành
        </button>
      </div>
    </div>
  );
};

export default ReviewForm;
