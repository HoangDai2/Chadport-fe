import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TVariant } from "../../../Types/TProduct"; // Điều chỉnh lại import cho đúng

type Props = {
  variants: TVariant[];
};

const ListVariantsForm: React.FC<Props> = ({ variants }) => {
  if (variants.length === 0) {
    toast.warn("Không có biến thể nào.");
  }

  return (
    <div className="container">
      <h3>Danh sách Variants</h3>
      {variants.length > 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Size</th>
              <th>Color</th>
              <th>Số lượng</th>
            </tr>
          </thead>
          <tbody>
            {variants.map((variant) => (
              <tr key={variant.id}>
                <td>{variant.id}</td>
                <td>{variant.size?.name}</td>
                <td style={{ color: variant.color?.hex }}>{variant.color?.name}</td>
                <td>{variant.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Không có variants nào cho sản phẩm này.</p>
      )}
      <ToastContainer />
    </div>
  );
};

export default ListVariantsForm;
