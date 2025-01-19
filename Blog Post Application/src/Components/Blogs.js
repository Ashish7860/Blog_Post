import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import Badges from './Badges';
import { useSelector } from 'react-redux'; // Import useSelector from react-redux
import { useState, useEffect } from 'react';
const Blogs = ({ title, category, description, id, imageUrl, excerpt, handleDelete }) => {
  const [likes, setLikes] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    // Load the likes count from localStorage when the component mounts
    const storedLikes = localStorage.getItem(`likes_${id}`);
    if (storedLikes) {
      setLikes(parseInt(storedLikes, 10));
    }

    // Update the current date every second
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [id]);

  const handleLike = () => {
    // Increment the likes count and update localStorage
    const newLikes = likes + 1;
    setLikes(newLikes);
    localStorage.setItem(`likes_${id}`, newLikes.toString());
  };


  
  const blogData = useSelector(state => state.blogData); // Replace 'state.blogData' with your actual selector

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100" style={{ maxWidth: "22rem" }}>
        <img
          src={imageUrl}
          alt={title}
          className="card-img-top"
          style={{ maxWidth: "100%", height: "200px" }}
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{excerpt(description)}</p>
          <Link to={`/blog/${id}`} className=""> Read More </Link>
          <Badges>{category}</Badges>
          <div className="mt-1">
            <button className="btn btn-success ml-2" onClick={handleLike}>
              <FontAwesomeIcon icon={faThumbsUp} />
            </button>
            
            <button
              className="btn btn-danger ml-2"
              onClick={() => handleDelete(id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <Link to={`/editBlog/${id}`} className="btn btn-primary ml-2">
              <FontAwesomeIcon icon={faEdit} />
            </Link>

            <div style={{float:"left", marginLeft :"13px"}}><span>{likes} Likes</span></div><br/><br/>
          
            {/* Use data from the Redux store */}
            <p className="mt-2">
              <strong>Date:</strong> {currentDate.toLocaleDateString()}
            </p>
            
           
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;