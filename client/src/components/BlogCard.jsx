import React from "react";
import { Link } from "react-router-dom";
const BlogCard = (props) => {
  const { id, title, description, createdAt, image } = props;
  return (
    <>
          <div className="blog-card">
            <div className="card-image">
              <img src={image} className="img-fluid" alt="blog" style={{ width: "100%", height:"200px", objectFit:"cover" }}/>
            </div>
            <div className="blog-content">
              <p className="date">{new Date(createdAt).toLocaleDateString()}</p>
              <h5 className="title">{title}</h5>
              <p className="desc" dangerouslySetInnerHTML={{ __html: description.substr(0, 70) + '...' }}></p>
              <Link to={`/blog/${id}`} className="button">
                Read more
              </Link>
            </div>
          </div>
    </>
  );
};

export default BlogCard;
