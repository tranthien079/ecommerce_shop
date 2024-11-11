import React, { useEffect } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductCart, getUserCart, updateProductCart } from "../redux/user/userSlice";
import { formatPrice } from "../utils/helper";
import Table from 'react-bootstrap/Table';
import { TiShoppingCart } from "react-icons/ti";
const CartPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserCart());
  }, [dispatch]);

  const cartState = useSelector((state) => state?.auth?.cartUser);

  const totalAmount = cartState?.reduce((total, item) => total + item.price * item.quantity, 0) || 0;

  const updateProductQuantity  = async (cartId, newQuantity) => {
    await dispatch(updateProductCart({ cartId, newQuantity }));
  }; 

  const handleQuantityChange = async (cartId, valueQuantity) => {
    const newQuantity = Number(valueQuantity);
    if (newQuantity) {
      await updateProductQuantity(cartId, newQuantity);
      await dispatch(getUserCart());
    }
  };

  const deleteProduct = async (cartId) => {
    await dispatch(deleteProductCart(cartId));
    await dispatch(getUserCart());
  };

  return (
    <>
      <Meta title={"Giỏ hàng"} />
      <BreadCrumb title="Giỏ hàng" />
      <section className="cart-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="cart-header">
                <h4 className="text-center">Giỏ hàng của bạn</h4>
              </div>
              <Table  bordered  responsive>
                <thead>
                  <tr className="text-secondary text-center">
                    <th scope="col">Sản phẩm</th>
                    <th scope="col">Giá</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Thành tiền</th>
                    <th scope="col">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {cartState === null || cartState?.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center">
                      <TiShoppingCart size={200} />
                      </td>
                    </tr>
                  ) :  null }
                  {cartState &&
                    cartState?.map((item, index) => (
                      <tr key={index}>
                        <td scope="row" className="d-flex flex-row">
                          <img src={item?.productId?.images[0]?.url} alt="" width={100} />
                          <div className="d-flex flex-column ms-4 justify-content-start">
                            <p className="mb-0">{item?.name}</p>
                            <p className="mb-0 py-2">Màu sắc: {item?.color}</p>
                            <p className="mb-0">Size: {item?.size}</p>
                            <p className="mb-0">SKU: {item?.sku}</p>
                          </div>
                        </td>
                        <td>{formatPrice(item?.price)}</td>
                        <td>
                          <input
                            type="number"
                            className="form-control"
                            style={{ width: "70px", height: "30px" }}
                            min={1}
                            
                            value={item?.quantity}
                            onChange={(e) => handleQuantityChange(item?._id, e.target.value)}
                          />
                        </td>
                        <td>{formatPrice(item?.price * item?.quantity)}</td>
                        <td className="">
                          <AiFillDelete
                            className="text-danger fs-4 ms-5"
                            onClick={() => deleteProduct(item?._id)}
                            style={{ cursor: "pointer" }}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
                </Table>
            </div>
            <div className="col-12 py-2 mt-4">
              <div className="d-flex justify-content-between align-items-baseline">
                <Link to="/product" className="button">
                  Tiếp tục mua sắm
                </Link>
                <div className="d-flex flex-column align-items-end ">
                  <h4 className="text-right">Tổng tiền: {formatPrice(totalAmount)}</h4>
                  <Link to="/checkout" className="button">
                    Thanh toán
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CartPage;
