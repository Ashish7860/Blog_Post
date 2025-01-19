import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Blogs from '../Components/Blogs';
import Search from '../Components/Search';
import Category from '../Components/Category';

const Home = () => {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(''); //for category side bar
  const options = ['Travel', 'Fashion', 'Fitness', 'Sports', 'Food', 'Tech'];

  useEffect(() => {
    loadBlogsData(); 
  }, []);

  const loadBlogsData = async (start, end, increase) => {
    const existingBlogData = localStorage.getItem('myblog');

    if (existingBlogData) {
      const blogData = JSON.parse(existingBlogData);
      setData(blogData);
    } else {
      toast.error('No Blog Data found');
    }
  };

    const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this blog?');

    if (confirmDelete) {
      const existingBlogData = localStorage.getItem('myblog');

      if (existingBlogData) {
        const blogData = JSON.parse(existingBlogData);
        const updatedBlogData = blogData.filter((blog) => blog.id !== id);
        localStorage.setItem('myblog', JSON.stringify(updatedBlogData));
        setData(updatedBlogData); // Update the state with the updated data
        toast.success('Blog Deleted Successfully!');
      } else {
        toast.error('No Blog Data found');
      }
    } else {
      toast.error('Blog Deletion Cancelled');
    }
  };

  const excerpt = (str) => {
    if (str && str.length > 50) {
      str = str.substring(0, 50) + ' ... ';
    }
    return str;
  };

  const onInputChange = (e) => {
    setSearchValue(e.target.value);

    if (!e.target.value) {
      loadBlogsData(); // Reload initial data when the search input is empty
    }
  };

  const handleSearch = () => {
    const existingBlogData = localStorage.getItem('myblog');

    if (existingBlogData) {
      const blogData = JSON.parse(existingBlogData);
      const filteredData = blogData.filter(
        (item) => item.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      setData(filteredData);
    } else {
      toast.error('No Blog Data found');
    }
  };

  const handleCategory = (category) => {
    // Filter blogs by category from local storage
    const existingBlogData = localStorage.getItem('myblog');

    if (existingBlogData) {
      const blogData = JSON.parse(existingBlogData);
      const filteredData = category
        ? blogData.filter((item) => item.category === category)
        : blogData;

      setData(filteredData);
      setSelectedCategory(category);
    } else {
      toast.error('No Blog Data found');
    }
  };

  return (
    <>
      <Search searchValue={searchValue} onInputChange={onInputChange} handleSearch={handleSearch} />
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            {data.length === 0 && (
              <img
              src="https://colorlib.com/wp/wp-content/uploads/sites/2/404-error-page-templates.jpg.webp"
              alt="No Blog Found"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
            )}
            <div className="row">
              {data.map((item, index) => (
                <Blogs
                  key={index}
                  {...item}
                  excerpt={excerpt}
                  handleDelete={() => handleDelete(item.id)}
                />
              ))}
            </div>
          </div>
          <div className="col-md-3">
            <Category options={options} selectedCategory={selectedCategory} handleCategory={handleCategory} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;