import React , { useEffect } from 'react'
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { Link, useLocation } from 'react-router-dom';
import blogImg from '../../public/images/blog-1.jpg'
import { useDispatch, useSelector } from "react-redux";
import { getBlogById, resetState } from "../redux/blog/blogSlice";
import { formatDate } from '../utils/helper';
const BlogDetailPage = () => {
  const dispatch = useDispatch();
  const blogState = useSelector( state => state?.blog?.gotBlog)
  const location = useLocation();
  const getBlogId = location.pathname.split('/')[2];

  useEffect(() => {
    if (getBlogId) {
      dispatch(resetState());
      dispatch(getBlogById(getBlogId));
    }
  }, [dispatch, getBlogId]);

  return (
    <div>
        <Meta title={blogState?.title} />
        <BreadCrumb title={blogState?.title} />
        <div className="blog-wrapper home-wrapper-2 py-5">
          <div className="container-xxl">
            <div className="row">
              <div className="col-12">
                <div className="single-blog-card">
                  <Link to='/blog' className='d-flex align-items-center gap-10'>
                    <HiOutlineArrowLeft className='fs-4'/> Back
                  </Link>
                  <h3 className='title my-3'>
                  {blogState?.title}
                  </h3>
                  <div className='mb-3'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
</svg>
              <span>  {blogState?.author !='Admin' ? blogState?.author?.firstname+ '' + blogState?.author?.lastname : 'Admin'} </span>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="ms-3 bi bi-calendar3" viewBox="0 0 16 16">
  <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z"/>
  <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
</svg>
              <span> {formatDate(blogState?.createdAt)}  </span>
                  </div>
                  <img src={blogState?.images[0]?.url} width='100%' alt="blog" height='500' />
                  <p    dangerouslySetInnerHTML={{ __html: blogState?.content}}></p>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default BlogDetailPage
