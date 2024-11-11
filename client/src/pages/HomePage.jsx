import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import BlogCard from "../components/BlogCard";
import ProductCard from "../components/ProductCard";
import SpecialProduct from "../components/SpecialProduct";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlog } from "../redux/blog/blogSlice";
import Carousel from "react-bootstrap/Carousel";
import banner1 from "../../public/images/banner1.webp";
import banner2 from "../../public/images/banner2.webp";
import banner3 from "../../public/images/banner3.webp";
import banner4 from "../../public/images/banner4.webp";
import { getAllProduct } from "../redux/product/productSlice";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getBlogs();
    getProducts();
  }, []);

  const getBlogs = () => {
    dispatch(getAllBlog());
  };

  const getProducts = () => {
    dispatch(
      getAllProduct({
        limit: 10,
      })
    );
  };

  const blogState = useSelector((state) => state?.blog?.blog);
  const productState = useSelector((state) => state?.product);
  return (
    <>
       <Meta title='Trang chủ' />
      <section className="home-wrapper-1 py-5">
        <div className="container-xxl">
          <div className="row g-2">
            {/* <div className="col-6">
              <div className="main-banner position-relative p-1">
                <img
                  src="./images/main-banner-1.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="main-banner-content position-absolute">
                  <h4>SUPPERCHARGED FOR PROS</h4>
                  <h5>IPAD S13+ PRO</h5>
                  <p>From $100 or $200/mo.</p>
                  <Link className="button">BUY NOW</Link>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center pt-1">
                <div className="small-banner position-relative p-0">
                  <img
                    src="./images/catbanner-01.jpg"
                    className="img-fluid rounded-3"
                    alt="main banner"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>Laptop</h4>
                    <h5>MACBOOK PRO</h5>
                    <p>From $100 or $200/mo.</p>
                  </div>
                </div>
                <div className="small-banner position-relative p-0">
                  <img
                    src="./images/catbanner-04.jpg"
                    className="img-fluid rounded-3"
                    alt="main banner"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>Headphone</h4>
                    <h5>AIRPOT </h5>
                    <p>From $100 or $200/mo.</p>
                  </div>
                </div>
                <div className="small-banner position-relative p-0">
                  <img
                    src="./images/catbanner-02.jpg"
                    className="img-fluid rounded-3"
                    alt="main banner"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>Watch</h4>
                    <h5>APPLE WATCH 3</h5>
                    <p>From $100 or $200/mo.</p>
                  </div>
                </div>
                <div className="small-banner position-relative p-0">
                  <img
                    src="./images/catbanner-03.jpg"
                    className="img-fluid rounded-3"
                    alt="main banner"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>Tablet</h4>
                    <h5>IPAD S13+ PRO</h5>
                    <p>From $100 or $200/mo.</p>
                  </div>
                </div>
              </div>
            </div> */}
            <div className="col-12">
              <Carousel interval={2000}>
                <Carousel.Item interval={1000}>
                  <img className="img-fluid" src={banner1} alt="" />
                  <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>
                      Nulla vitae elit libero, a pharetra augue mollis interdum.
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={500}>
                  <img className="img-fluid" src={banner2} alt="" />

                  <Carousel.Caption></Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img className="img-fluid" src={banner3} alt="" />

                  <Carousel.Caption></Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img className="img-fluid" src={banner4} alt="" />

                  <Carousel.Caption></Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </div>
          </div>
        </div>
      </section>
      <section className="home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="services d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-20">
                  <img src="./images/service.png" className="me-3" alt="" />
                  <div>
                    <h6>Đơn vị vận chuyển</h6>
                    <p className="mb-0">Hỗ trợ đa dạng</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-20">
                  <img src="./images/service-02.png" className="me-3" alt="" />
                  <div>
                    <h6>Khuyến mãi hằng ngày</h6>
                    <p className="mb-0">Khuyến mãi giảm giá lên tới 25%</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-20">
                  <img src="./images/service-03.png" className="me-3" alt="" />
                  <div>
                    <h6>Hỗ trợ mua hàng 24/7</h6>
                    <p className="mb-0">Mua sắm cùng chuyên gia</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-20">
                  <img src="./images/service-04.png" className="me-3" alt="" />
                  <div>
                    <h6>Giá cả phải chăng</h6>
                    <p className="mb-0">Nhận giá gốc từ nhà cung cấp</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-20">
                  <img src="./images/service-05.png" className="me-3" alt="" />
                  <div>
                    <h6>Thanh toán an toàn</h6>
                    <p className="mb-0">Thanh toán được bảo vệ 100%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="categories d-flex flex-wrap justify-content-between  align-items-center">
                <div className="d-flex gap align-items-center">
                  <div>
                    <h6>Music & Gaming</h6>
                    <p>10 items</p>
                  </div>
                  <img src="./images/headphone.jpg" alt="camera" />
                </div>
                <div className="d-flex gap align-items-center">
                  <div>
                    <h6>Smart TV</h6>
                    <p>10 items</p>
                  </div>
                  <img src="./images/tv.jpg" alt="camera" />
                </div>
                <div className="d-flex gap align-items-center">
                  <div>
                    <h6>Smart Watch</h6>
                    <p>10 items</p>
                  </div>
                  <img src="./images/tv.jpg" alt="camera" />
                </div>
                <div className="d-flex gap align-items-center">
                  <div>
                    <h6>Camera</h6>
                    <p>10 items</p>
                  </div>
                  <img src="./images/camera.jpg" alt="camera" />
                </div>
                <div className="d-flex gap align-items-center">
                  <div>
                    <h6>Music & Gaming</h6>
                    <p>10 items</p>
                  </div>
                  <img src="./images/headphone.jpg" alt="camera" />
                </div>
                <div className="d-flex gap align-items-center">
                  <div>
                    <h6>Smart TV</h6>
                    <p>10 items</p>
                  </div>
                  <img src="./images/tv.jpg" alt="camera" />
                </div>
                <div className="d-flex gap align-items-center">
                  <div>
                    <h6>Smart Watch</h6>
                    <p>10 items</p>
                  </div>
                  <img src="./images/tv.jpg" alt="camera" />
                </div>
                <div className="d-flex gap align-items-center">
                  <div>
                    <h6>Camera</h6>
                    <p>10 items</p>
                  </div>
                  <img src="./images/camera.jpg" alt="camera" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <section className="featured-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h4 className="section-heading">Sản phẩm khuyến mãi</h4>
            </div>
            <div className="row">
              <div className="col-12">
                {
                  <ProductCarousel
                    data={
                      productState.product.length > 0
                        ? productState.product.filter(
                            (product) => product.discountPrice > 0
                          )
                        : []
                    }
                  />
                }
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="famous-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              <div className="famous-card position-relative">
                <img
                  src="./images/subbanner-01.jpg"
                  className="img-fluid"
                  alt="famous"
                />
                <div className="famous-content position-absolute">
                  <h5>Big Screen</h5>
                  <h6>Smart Watch Series 7</h6>
                  <p>From $399 $16.42/mon for 24/mon</p>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="famous-card position-relative">
                <img
                  src="./images/subbanner-02.jpg"
                  className="img-fluid"
                  alt="famous"
                />
                <div className="famous-content position-absolute ">
                  <h5 className="text-dark">Big Screen</h5>
                  <h6 className="text-dark">Smart Watch Series 7</h6>
                  <p className="text-dark">From $399 $16.42/mon for 24/mon</p>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="famous-card position-relative">
                <img
                  src="./images/subbanner-031.jpg"
                  className="img-fluid"
                  alt="famous"
                />
                <div className="famous-content position-absolute text-dark">
                  <h5 className="text-dark">Big Screen</h5>
                  <h6 className="text-dark">Smart Watch Series 7</h6>
                  <p className="text-dark">From $399 $16.42/mon for 24/mon</p>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="famous-card position-relative">
                <img
                  src="./images/subbanner-04.jpg"
                  className="img-fluid"
                  alt="famous"
                />
                <div className="famous-content position-absolute">
                  <h5 className="text-dark">Big Screen</h5>
                  <h6 className="text-dark">Smart Watch Series 7</h6>
                  <p className="text-dark">From $399 $16.42/mon for 24/mon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section className="popular-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h4 className="section-heading">Sản phẩm mới</h4>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              {
                <ProductCarousel
                  data={
                    productState.product.length > 0
                      ? productState.product
                          .filter((product) => !product.discountPrice) // Loại bỏ sản phẩm có discountPrice
                          .slice(0, 12) // Lấy 12 sản phẩm đầu tiên
                      : []
                  }
                />
              }
            </div>
          </div>
        </div>
      </section>
      {/* <section className="special-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Special Products</h3>
            </div>
            <div className="row g-3">
              <SpecialProduct />
              <SpecialProduct />
              <SpecialProduct />
            </div>
          </div>
        </div>
      </section> */}
      <section className="marque-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="marquee-inner-wrapper bg-white card-wrapper">
                <Marquee className="d-flex">
                  <div className="mx-4 w-25">
                    <img src="https://matkinhauviet.vn/wp-content/uploads/2023/10/logo-thuong-hieu-thoi-trang-nike.jpg" alt="brand" width='150' />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="https://matkinhauviet.vn/wp-content/uploads/2023/10/logo-thuong-hieu-thoi-trang-h-m.jpg" alt="brand" width='150'  />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="https://matkinhauviet.vn/wp-content/uploads/2023/10/logo-thuong-hieu-thoi-trang-prada.jpg" alt="brand" width='150'  />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="https://matkinhauviet.vn/wp-content/uploads/2023/10/logo-thuong-hieu-thoi-trang-gucci.jpg" alt="brand" width='130' />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="https://matkinhauviet.vn/wp-content/uploads/2023/10/logo-thuong-hieu-thoi-trang-dior.jpg" alt="brand" width='150' />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="https://matkinhauviet.vn/wp-content/uploads/2023/10/logo-thuong-hieu-thoi-trang-levis.jpg" alt="brand" width='150' />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="https://matkinhauviet.vn/wp-content/uploads/2023/10/logo-thuong-hieu-thoi-trang-puma.jpg" alt="brand" width='120' />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="https://matkinhauviet.vn/wp-content/uploads/2023/10/logo-thuong-hieu-thoi-trang-chanel.jpg" alt="brand" width='150' />
                  </div>
                </Marquee>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="blog-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h4 className="section-heading font-bold">Bài viết gần đây</h4>
            </div>
            {blogState &&
              blogState?.map((item, index) => {
                if (index < 4) {
                  return (
                    <div className="col-3 mb-3" key={index}>
                      <BlogCard
                        id={item?._id}
                        title={item?.title}
                        description={item?.description}
                        createdAt={item?.createdAt}
                        image={item?.images[0]?.url}
                        data={blogState}
                      />
                    </div>
                  );
                }
              })}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
