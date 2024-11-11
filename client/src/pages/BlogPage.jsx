import React, { useEffect,useState } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import BlogCard from "../components/BlogCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlog } from "../redux/blog/blogSlice";
import { getAllbcategory } from "../redux/blog/bcategorySlice";

const BlogPage = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState(null);
  useEffect(() => {
    getBlogCategory();
  }, [dispatch]);

  useEffect(() => {
    getBlogs();
  },[category])
  
  const getBlogs = () => {
    dispatch(getAllBlog(category?.id));
  };

  const getBlogCategory = () => {
    dispatch(getAllbcategory())
  }

  const blogState = useSelector((state) => state?.blog?.blog);

  const bCategoryState = useSelector((state) => state?.bcategory?.bcategory);


  return (
    <>
      <Meta title={"Bài viết"} />
      <BreadCrumb title="Bài viết" />
      <div className="blog-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            {/* Sidebar for Categories */}
            <div className="col-12 col-md-3 mb-3">
              <div className="filter-card">
                <h3 className="filter-title">Danh mục bài viết</h3>
                <div>
                  <ul className="ps-0">
                    {bCategoryState &&
                      bCategoryState?.map((b, index) => {
                        return <li
                        key={index}
                        onClick={() =>
                          category?.id === b._id
                            ? setCategory(null) 
                            : setCategory({ id: b._id, name: b.name }) 
                        }
                        className={category?.id === b._id ? "text-info" : ""} 
                      >{b?.name}</li>;
                      })
                    }
                  </ul>
                </div>
              </div>
            </div>

            {/* Blog Cards Section */}
            <div className="col-12 col-md-9">
              <div className="row">
                {blogState &&
                  blogState.map((item, index) => {
                    return (
                      <div className="col-12 col-sm-6 col-lg-4 mb-3" key={index}>
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
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPage;
