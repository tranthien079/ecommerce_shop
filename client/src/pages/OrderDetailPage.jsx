import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Badge,
  Image,
} from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getOrderDetail, resetState } from "../redux/user/userSlice";
import { formatPrice } from "../utils/helper";

const OrderDetailPage = () => {
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state?.auth?.gotOrder);
  const location = useLocation();
  const getOrderId = location.pathname.split("/")[3];

  // State để lưu tổng tiền hàng
  const [discountedPrice, setDiscountedPrice] = useState(0);

  useEffect(() => {
    // dispatch(resetState());
    dispatch(getOrderDetail(getOrderId));
  }, [getOrderId, dispatch]);

  // Tính tổng tiền hàng sau khi lấy được thông tin đơn hàng
  useEffect(() => {
    if (orderState?.orderItems) {
      const total = orderState.orderItems.reduce((sum, item) => {
        const itemPrice =
          item?.productId.discountPrice > 0
            ? item?.productId.discountPrice
            : item?.productId.price;
        return sum + itemPrice * item?.quantity;
      }, 0);

      setDiscountedPrice(total); // Cập nhật giá trị tổng tiền hàng
    }
  }, [orderState]);

  const orderDetails = {
    orderNumber: orderState?._id,
    status: orderState?.orderStatus,
    shopName: "Dev Shop",
    orderItems: orderState?.orderItems,
    shippingFee: orderState?.typeDelivery?.price || 0,
    totalPrice: orderState?.totalPrice,
    paymentMethod: orderState?.paymentInfo,
  };
  
  return (
    <Container className="">
      <Card>
        <Card.Header>
          <Row className="align-items-center">
            <Col>
              <Link
                to="/account/orders"
                variant="outline-secondary"
                size="sm"
                className="btn"
              >
                <FaArrowLeft /> TRỞ LẠI
              </Link>
            </Col>
            <Col className="text-end">
              <span className="fw-bold me-2">
                MÃ ĐƠN HÀNG. {orderDetails.orderNumber}
              </span>
              <Badge bg="success">{orderDetails.status}</Badge>
            </Col>
          </Row>
        </Card.Header>

        <Card.Body>
          <Card className="mb-4">
            {orderDetails?.orderItems?.map((item, index) => (
              <Card.Body key={index}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={item?.productId?.images[0]?.url}
                      style={{ height: "100px" }}
                      fluid
                    />
                  </Col>
                  <Col md={8}>
                    <h6>{item?.productId?.name}</h6>
                    <p className="text-muted small">
                      Phân loại hàng: {item?.color} / {item?.size}
                    </p>
                    <p className="text-muted small">x{item?.quantity}</p>
                  </Col>
                  <Col md={2} className="text-end">
                    {item?.productId.discountPrice > 0 ? (
                      <>
                        <p className="text-muted text-decoration-line-through">
                          {formatPrice(item?.productId.price)}
                        </p>
                        <p className="text-danger">
                          {formatPrice(item?.productId.discountPrice)}
                        </p>
                      </>
                    ) : (
                      <p className="text-muted">
                        {formatPrice(item?.productId.price)}
                      </p>
                    )}
                  </Col>
                </Row>
              </Card.Body>
            ))}
          </Card>

          <Card className="mb-4 bg-light">
            <Card.Body>
              <Row className="mb-2">
                <Col>Tổng tiền hàng</Col>
                <Col className="text-end">
                  {formatPrice(discountedPrice)}
                </Col>{" "}
                {/* Tổng tiền hàng */}
              </Row>
              <Row className="mb-2">
                <Col>Mã giảm giá</Col>
                <Col className="text-end">
                  {" "}
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(
                    orderState?.totalPrice <
                      discountedPrice + orderState?.typeDelivery?.price
                      ? -(
                          discountedPrice +
                          orderState?.typeDelivery?.price -
                          orderState?.totalPrice
                        ).toFixed(2)
                      : 0
                  )}
                </Col>{" "}
                {/* Tổng tiền hàng */}
              </Row>
              <Row className="mb-2">
                <Col>Phí vận chuyển</Col>
                <Col className="text-end">
                  {formatPrice(orderDetails.shippingFee)}
                </Col>
              </Row>
              <Row className="fw-bold">
                <Col>Thành tiền</Col>
                <Col className="text-end text-danger">
                  {formatPrice(orderDetails.totalPrice)}
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Row>
            <Col>Phương thức Thanh toán</Col>
            <Col className="text-end">{orderDetails.paymentMethod}</Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default OrderDetailPage;
