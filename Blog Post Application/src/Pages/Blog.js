import React , { useState, useEffect } from 'react'

import {useParams, Link} from "react-router-dom";
import Badges from "../Components/Badges";

import { toast } from 'react-toastify';
import "../Components/css/blog.css"


const Blog = () => {
  const [blog, setBlog] = useState(null);
  const [relatedPost , setRelatedPost] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleBlog();
    }
  }, [id]);

  const getSingleBlog = () => {
    try {
      // Retrieve the blog data for the given ID from local storage
      const existingBlogData = localStorage.getItem('myblog');
  
      if (existingBlogData) {
        const blogData = JSON.parse(existingBlogData);
        const singleBlog = blogData.find((item) => item.id === id);
  
        if (singleBlog) {
          setBlog(singleBlog);
  
          // Find related posts by filtering based on category
          const relatedPosts = blogData.filter((item) => item.category === singleBlog.category);
  
          // Limit the number of related posts to 3
          const limitedRelatedPosts = relatedPosts.slice(0, 3);
  
          setRelatedPost(limitedRelatedPosts);
        } else {
          toast.error(`Blog with ID ${id} not found`);
        }
      } else {
        toast.error('No Blog Data found');
      }
    } catch (error) {
      console.error('Error fetching blog data from local storage:', error);
      toast.error('Failed to fetch blog data. Please try again.');
    }
  };
  

  //Category Style
  const styleInfo = {
    display: "inline",
    
    float: "right",
    marginRight: "10px",
    marginTop: "7px"
    
  }

  const excerpt = (str) => {
    if (str && str.length > 60) {
      str = str.substring(0, 60) + ' ... ';
    }
    return str;
  };


  return (
    <div className="container" style={{ border: '1px solid #d1ebe8', marginTop: '5%', marginBottom: '4%' }}>
      <Link to="/" className="mt-3" style={{ float: 'left', color: 'black' }}>
        <strong>Back</strong>
      </Link>
      <h2 className="text-muted mt-2" style={{ display: 'inline-block' }}>
        {blog && blog.title}
      </h2>
      <img
        src={blog && blog.imageUrl}
        className="img-fluid rounded"
        alt={blog && blog.title}
        style={{ width: '100%', maxHeight: '400px' }}
      />
      <div style={{ marginTop: '20px' }}>
        <div className="bg-light p-2" style={{ height: '43px' }}>
          <Badges styleInfo={styleInfo}>{blog && blog.category}</Badges>
        </div>
        <p className="lead md-0">{blog && blog.description}</p>
      </div>
      {relatedPost && relatedPost.length > 0 && (
        <>
          {relatedPost.length > 1 && <h1>Related Post</h1>}
          <div className="row" style={{ marginBottom: '5px' }}>
            {relatedPost
              .filter((item) => item.id !== id)
              .map((item, index) => (
                <div className="col-md-4" key={index}>
                  <div className="card mb-4">
                    <Link to={`/blog/${item.id}`}>
                      <img src={item.imageUrl} className="card-img-top" alt={item.title} />
                    </Link>
                    <div className="card-body">
                      <h5 className="card-title">{item.title}</h5>
                      <p className="card-text">{excerpt(item.description)}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Blog;