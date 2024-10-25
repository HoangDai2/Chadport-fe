// import { AppDispatch } from '../Types/store';
// import { addToCart as addToCartAction } from '../Types/cartSlice';
// import TProduct from '../Types/TProduct';
// import { toast } from 'react-toastify';

// export const addToCart = (product: TProduct, dispatch: AppDispatch) => {
//   // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng hay chưa
//   dispatch((state: any, getState: any) => {
//     const isProductInCart = getState().cart.items.some(
//       (item: TProduct) => item.id === product.id
//     );

//     if (isProductInCart) {
//       // Thông báo sản phẩm đã tồn tại trong giỏ hàng
//       toast.info(`${product.name} đã có trong giỏ hàng!`, {
//         position: 'top-right',
//         autoClose: 1000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });
//     } else {
//       // Thêm sản phẩm vào giỏ hàng nếu chưa có
//       dispatch(addToCartAction(product));
//       toast.success(`${product.name} đã được thêm vào giỏ hàng!`, {
//         position: 'top-right',
//         autoClose: 1000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });
//     }
//   });
// };