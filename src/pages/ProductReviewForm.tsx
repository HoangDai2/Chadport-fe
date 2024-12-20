import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

interface Review {
  rating: number;
  reviewText: string;
}

const ProductReview: React.FC = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState<string | null>(null); // Để hiển thị lỗi

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      setError("Bạn phải chọn số sao trước khi gửi đánh giá!");
      return;
    }

    setError(null); // Xóa lỗi nếu có
    setReviews([...reviews, { rating, reviewText: review }]);
    setRating(0);
    setHover(0);
    setReview("");
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm border-0" style={{ maxWidth: "600px", margin: "auto" }}>
        <h3 className="text-center mb-4 text-primary">Đánh giá sản phẩm</h3>
        <form onSubmit={handleSubmit}>
          {/* Rating Stars */}
          <div className="mb-4 text-center">
            {[...Array(5)].map((_, index) => {
              const starValue = index + 1;
              return (
                <label key={index} style={{ cursor: "pointer" }}>
                  <input
                    type="radio"
                    name="rating"
                    value={starValue}
                    style={{ display: "none" }}
                    onClick={() => setRating(starValue)}
                  />
                  <FaStar
                    size={40}
                    color={starValue <= (hover || rating) ? "#ffcc00" : "#e4e5e9"}
                    onMouseEnter={() => setHover(starValue)}
                    onMouseLeave={() => setHover(0)}
                    style={{
                      transition: "color 0.2s ease-in-out",
                      marginRight: 8,
                    }}
                  />
                </label>
              );
            })}
            <p className="mt-2 text-muted">{rating > 0 ? `Bạn đã chọn ${rating} sao` : "Hãy chọn số sao"}</p>
          </div>

          {/* Error Message */}
          {error && <p className="text-danger text-center">{error}</p>}

          {/* Review Input */}
          <div className="mb-4">
            <textarea
              className="form-control rounded-3"
              rows={4}
              placeholder="Nhập đánh giá của bạn tại đây"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              style={{
                fontSize: "16px",
                padding: "10px",
                borderColor: "#ddd",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#ffffff",
                color: "#000000",
              }}
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-lg px-5"
              style={{
                backgroundColor: "#ffffff",
                color: "#000000",
                border: "2px solid #000000",
                fontSize: "16px",
                transition: "all 0.3s ease-in-out",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#000000"; // Nền đen khi hover
                e.currentTarget.style.color = "#ffffff"; // Chữ trắng khi hover
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#ffffff"; // Nền trắng khi không hover
                e.currentTarget.style.color = "#000000"; // Chữ đen khi không hover
              }}
            >
              Gửi đánh giá
            </button>
          </div>
        </form>
      </div>

      {/* Display Reviews */}
      <div className="mt-5">
        <h4 className="text-primary">Đánh giá từ người dùng</h4>
        {reviews.length === 0 ? (
          <p className="text-muted">Chưa có đánh giá nào.</p>
        ) : (
          reviews.map((rev, index) => (
            <div key={index} className="card p-3 mb-3">
              <div className="d-flex align-items-center">
                {[...Array(rev.rating)].map((_, i) => (
                  <FaStar key={i} size={20} color="#ffcc00" style={{ marginRight: 4 }} />
                ))}
                {[...Array(5 - rev.rating)].map((_, i) => (
                  <FaStar key={i} size={20} color="#e4e5e9" style={{ marginRight: 4 }} />
                ))}
              </div>
              <p className="mt-2">{rev.reviewText}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductReview;
