import React from 'react';
import { Carousel, Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactStars from 'react-stars'
import wish from "../../public/images/wish.svg";
import img1 from "../../public/images/watch.jpg";
import img2 from "../../public/images/tab.jpg";
import view from "../../public/images/view.svg";
import prodcompare from "../../public/images/prodcompare.svg";
import addCart from "../../public/images/add-cart.svg";
import { formatPrice } from '../utils/helper';
const ProductCarousel = ({ data }) => {
  // Chia sản phẩm thành các nhóm nhỏ (mỗi nhóm có 4 sản phẩm)
  const chunkSize = 6;
  const productChunks = [];
  for (let i = 0; i < data.length; i += chunkSize) {
    productChunks.push(data.slice(i, i + chunkSize));
  }

  return (
    <Carousel interval={1500}>
      {productChunks.map((chunk, chunkIndex) => (
        <Carousel.Item key={chunkIndex}>
          <Row className=''>
            {chunk.map((item, index) => (
              <Col key={index} md={2} className='gx-3'>
                 <div>
            <Link
              to={`${
                location.pathname == "/"
                  ? `/product/${item._id}`
                  : location.pathname == `/product/${item._id}`
                  ? `/product/${item._id}`
                  : `${item._id}`
              }`}
              className="product-card position-relative"
            >
            
              <div className="product-image">
                <img src={item?.images[0]?.url} className="img-fluid mx-auto" alt="product" />
                <img src={item?.images[1]?.url} className="img-fluid mx-auto" alt="product" />
              </div>
              <div className="product-details" style={{ marginTop:'30px', padding: '15px'}}>
                <h6 className="brand">{item?.brandId?.name}</h6>
                <h5 className="product-title">{item?.name}</h5>
                <ReactStars
                  count={5}
                  size={22}
                  value={Number(item?.totalrating) || 0}
                  
                  edit={false}
                  activeColor="#ffd700"
                />
     
                { item?.discountPrice > 0 ? (
                  <div className="d-flex">
                  <p className="price mb-0"><del>{formatPrice(item?.price)}</del></p>
                  <p className="discount-price text-danger ps-3 mb-0">{formatPrice(item?.discountPrice)}</p>
                  </div>
                ): (
                  <p className="price mb-0">{formatPrice(item?.price)}</p>
                ) }

              </div>
              {/* <div className="action-bar position-absolute">
                <div className="d-flex flex-column gap-15">
                  <button className="border-0  bg-transparent">
                    <img src={view} alt="view" />
                  </button>
                  <button className="border-0  bg-transparent">
                    <img src={prodcompare} alt="compare" />
                  </button>
                  <button className="border-0  bg-transparent">
                    <img src={addCart} alt="addcart" />
                  </button>
                </div>
              </div> */}
            </Link>
          </div>
              </Col>
            ))}
          </Row>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
