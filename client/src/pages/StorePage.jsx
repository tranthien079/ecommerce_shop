import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import ProductCard from "../components/ProductCard";
import Meta from "../components/Meta";
import ReactStars from 'react-stars'
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct, resetState } from "../redux/product/productSlice";
import { Pagination } from "react-bootstrap";
import { getAllBrand } from "../redux/product/brandSlice";
import { getAllCategory } from "../redux/product/categorySlice";

const StorePage = () => {
  const [grid, setGrid] = useState("3");
  const dispatch = useDispatch();
  const productState = useSelector((state) => state?.product);
  console.log(productState);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  // Filter
  const [category, setCategory] = useState(null);
  const [brand, setBrand] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [sort, setSort] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  useEffect(() => {
    getProducts();
  }, [sort, category, brand, minPrice, maxPrice, page, limit]);

  const getProducts = () => {
    dispatch(
      getAllProduct({
        sort,
        brandId: brand?.id,
        categoryId: category?.id,
        minPrice,
        maxPrice,
        page,
        limit: limit,
      })
    );
  };
  useEffect(() => {
    dispatch(getAllBrand())
    dispatch(getAllCategory())
  }, [dispatch])

  const brandState = useSelector(state => state?.brand?.brand)
  const categoryState = useSelector(state => state?.category?.category)

  useEffect(() => {
    if (productState?.product) {
      let newBrands = [];
      let newCategories = [];

      for (let i = 0; i < productState.product.length; i++) {
        const element = productState.product[i];
        newBrands.push({
          brandName: element?.brandId?.name,
          brandId: element?.brandId,
        });
        newCategories.push({
          categoryName: element?.categoryId?.name,
          categoryId: element?.categoryId,
        });
      }
      setBrands(newBrands);
      setCategories(newCategories);
    }
  }, [productState.product]);


  return (
    <>
      <Meta title={"Sản phẩm"} />
      <BreadCrumb title="Store" />
      <div className="store-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              <div className="filter-card mb-3">
                <h3 className="filter-title">Theo danh mục sản phẩm</h3>
                <div>
                  <ul className="ps-0">
                    {categoryState &&
                     categoryState.map((item, index) => {
                        return (
                          <li
                            key={index}
                            onClick={() =>
                              category?.id === item._id
                                ? setCategory(null) 
                                : setCategory({ id: item._id, name: item.name }) 
                            }
                            className={category?.id === item._id ? "text-info" : ""} 
                          >
                            {item.name}
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
              <div className="filter-card mb-3">
                <h3 className="filter-title">Theo thương hiệu</h3>
                <div>
                  <ul className="ps-0">
                    {brandState &&
                     brandState.map((item, index) => {
                        return (
                          <li
                            key={index}
                            onClick={() =>
                              brand?.id === item._id
                                ? setBrand(null) 
                                : setBrand({ id: item._id, name: item.name }) 
                            }
                            className={brand?.id === item._id ? "text-info" : ""} 
                          >
                            {item.name}
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
              <div className="filter-card mb-3">
                <h3 className="filter-title">Theo giá tiền</h3>
                <div>
                  <h5 className="sub-title"></h5>
                  <div className="d-flex align-items-center gap-10">
                    <div className="form-floating input-group-sm mb-3">
                      <input
                        type="email"
                        className="form-control"
                        name=""
                        id="price-from"
                        onChange={(e) => setMinPrice(e.target.value)}
                      />
                      <label htmlFor="price-from" className="form-label">
                        $ From
                      </label>
                    </div>
                    <div className="form-floating input-group-sm mb-3">
                      <input
                        type="email"
                        className="form-control"
                        name=""
                        id="price-to"
                        onChange={(e) => setMaxPrice(e.target.value)}
                      />
                      <label htmlFor="price-to" className="form-label">
                        $ To
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-9">
              <div className="filter-sort-grid grid mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-10">
                    <p className="mb-0 d-block">Sắp xếp theo:</p>
                    <div className="input-group-sm">
                      <select
                        className="form-control form-select"
                        onChange={(e) => setSort(e.target.value)}
                      >
                        <option value="name">Từ A-Z</option>
                        <option value="-name">Từ Z-A</option>
                        <option value="price">Giá thấp tới cao</option>
                        <option value="-price">Giá cao tới thấp</option>
                        <option value="createdAt">Ngày tạo mới</option>
                        <option value="-createdAt">Ngày cũ đến mới</option>
                      </select>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-10">
                    <p className="mb-0 d-block">Hiển thị:</p>
                    <div className="input-group-sm">
                      <select
                        className="form-control form-select"
                        onChange={(e) => setLimit(e.target.value)}
                      >
                        <option value="8" selected>8 sản phẩm</option>
                        <option value="12">12 sản phẩm</option>
                        <option value="16">16 sản phẩm</option>
                        <option value="20">20 sản phẩm</option>
                        <option value="30">30 sản phẩm</option>
                        <option value="50">50 sản phẩm</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="products-list pb-5">
                <div className="d-flex gap-10 flex-wrap">
                  <ProductCard grid={grid} data={productState.product.length > 0 ? productState?.product : []  } />
                </div>
              </div>
              <div className="d-flex justify-content-center">
              <Pagination>
                {[...Array(productState?.totalPages).keys()].map((_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={productState?.page === index + 1}
                    onClick={() => setPage(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StorePage;
