import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrder, updateOrderStatus } from "../redux/user/userSlice";
import { Tabs, Tab, Button, Table, Modal  } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import { formatDate, formatPrice } from "../utils/helper";

const OrderPage = () => {
  const [key, setKey] = useState("tatca");

  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.auth.orderUser);

  useEffect(() => {
    dispatch(getUserOrder());
  }, [dispatch]);

  const filterOrders = (status) => {
    return orderState?.filter((order) => order.orderStatus === status);
  };

  return (
    <div className="container mt-4">
      <Tabs
        id="order-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="tatca" title="Tất cả">
          <OrderList orders={orderState} />
        </Tab>
        <Tab eventKey="chothanhtoan" title="Chờ xác nhận">
          <OrderList orders={filterOrders("Chờ xác nhận")} />
        </Tab>
        <Tab eventKey="vanchuyen" title="Đã xác nhận">
          <OrderList orders={filterOrders("Đã xác nhận")} />
        </Tab>
        <Tab eventKey="chogiaohang" title="Đang giao">
          <OrderList orders={filterOrders("Đang giao")} />
        </Tab>
        <Tab eventKey="hoanthanh" title="Hoàn thành">
          <OrderList orders={filterOrders("Hoàn thành")} />
        </Tab>
        <Tab eventKey="huy" title="Đã hủy">
          <OrderList orders={filterOrders("Đã hủy")} />
        </Tab>
      </Tabs>
    </div>
  );
};

// Component hiển thị danh sách đơn hàng
const OrderList = ({ orders }) => {
  if (!orders || orders.length === 0) {
    return <div className="VJ0a8O p-5"><div className="E_bH9K"></div><h2 className="JDtdsv">Chưa có đơn hàng</h2></div>;
  }

  return (
    <div>
    <div className="order-details mb-4">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <span className="badge bg-danger me-2">Yêu thích</span>
          {/* <Button variant="outline-primary" className="ms-3">
            Chat
          </Button> */}
          <Link to='/product' variant="outline-secondary" className="ms-2">
            Xem Shop
          </Link>
        </div>

      </div>
      {orders.map((order, index) => (
        <OrderDetails
          key={index}
          order_id={order?._id}
          order_shippingInfo={order?.shippingInfo}
          order_typeDelivery={order?.typeDelivery}
          order_payment={order?.paymentInfo}
          order_items={order?.orderItems}
          order_paidAt={order?.paidAt}
          order_status={order?.orderStatus}
          order_totalPrice={order?.totalPrice}
          order_totalPriceAfterDiscount={order?.totalPriceAfterDiscount}
        />
      ))}
    </div>
    </div>
  );
};

const OrderDetails = ({
  order_id,
  order_shippingInfo,
  order_typeDelivery,
  order_payment,
  order_items,
  order_paidAt,
  order_status,
  order_totalPrice,
  order_totalPriceAfterDiscount,
  createdAt, // Make sure to pass createdAt as a prop
}) => {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const dispatch = useDispatch();
  const isWithinOneHour = () => {
    const orderTime = new Date(order_paidAt).getTime(); 
    const currentTime = new Date().getTime(); 
    const oneHourInMs = 60 * 60 * 1000; 
    const timeDifference = currentTime - orderTime;
  
    // kiểm tra order trong vòng 1 tiếng cho hủy còn sau 1 tiếng k cho hủy
    const isWithin = timeDifference <= oneHourInMs;

    return isWithin;
  };
  

  const handleCancelOrder = async (id) => {
    const data = {id: id, status: "Đã hủy"}
    await dispatch(updateOrderStatus(data))
    await dispatch(getUserOrder());
    setShowCancelModal(false);
  };

    const getStatusColor = (status) => {
      switch (status) {
        case 'Chờ xác nhận':
          return { color: 'gray' }; // Gray color for "chờ xác nhận"
        case 'Đã xác nhận':
          return { color: '#CBAF70' }; // Yellow-brown for "đã xác nhận"
        case 'Đang giao':
          return { color: 'blue' }; // Blue for "đang giao"
        case 'Hoàn thành':
          return { color: '#198754' }; // Yellow-green for "đã giao"
        case 'Đã hủy':
          return { color: 'red' }; // Red for "đã hủy"
        default:
          return { color: 'black' }; // Default color if the status doesn't match
      }
    };

  return (
    <div className="order-details mb-4">
      <Link to={`/account/order/${order_id}`} className="w-100">
        <div className="d-flex justify-content-between align-items-center">
          <div className="text-success">
            <i className="fas fa-truck"></i> Mã đơn hàng: {order_id} <br />
            <span className="text-secondary"> 
            Ngày đặt: {formatDate(order_paidAt)}
            </span>
          </div>
          <div className="text-success">
            <i className="fas fa-truck"></i> 
            <div style={getStatusColor(order_status)}>
              {order_status}
            </div>
          </div>
        </div>

        <Table striped bordered hover className="mt-3">
          <tbody>
            {order_items.map((item, idx) => (
              <tr key={idx}>
                <td>
                  <div className="d-flex">
                    <img
                      src={item?.productId?.images[0]?.url}
                      alt={item?.productId?.name}
                      width="100"
                      height="100"
                      className="me-3"
                    />
                    <div className="d-flex flex-column">
                      <strong>{item?.productId?.name}</strong>
                      <div className="small text-muted">
                        {item?.color} / {item?.size}
                      </div>
                      <div className="small">x{item?.quantity}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="text-danger">{formatPrice(item?.price)}</div>
                  <div className="small text-muted">
                    <del>{formatPrice(item?.productId?.price)}</del>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Link>

        <div className="d-flex justify-content-end align-items-center">
        {order_status === "Chờ xác nhận" && isWithinOneHour()  && (
        <div className="text-end me-3 ">
          <Button variant="danger" onClick={() => setShowCancelModal(true)}>
            Hủy đơn hàng
          </Button>
        </div>
      )}
          <p className="mb-0">Tổng tiền: </p>
          <span className="text-danger"> {formatPrice(order_totalPrice)}</span>
        </div>

      <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Hủy đơn hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn hủy đơn hàng này không?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCancelModal(false)}>
            Hủy bỏ
          </Button>
          <Button variant="danger" onClick={() => handleCancelOrder(order_id)}>
            Xác nhận 
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default OrderPage;
