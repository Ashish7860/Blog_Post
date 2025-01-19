import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { addBlogPost, updateBlogPost } from '../Redux/action'; // Import updateBlogPost as well


const initial = {
  title: '',
  description: '',
  category: '',
  imageUrl: '',
};

const options = ['Travel', 'Fashion', 'Fitness', 'Sports', 'Food', 'Tech'];

const AddEditBlog = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state); // Corrected state selection
  console.log(state);
  const [formValue, setFormValue] = useState(initial);
  const [categoryErrMsg, setCategoryErrMsg] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [titleErrMsg, setTitleErrMsg] = useState(null);
  const [descriptionErrMsg, setDescriptionErrMsg] = useState(null);
  const [imageErrMsg, setImageErrMsg] = useState(null);

  const { title, description, category, imageUrl } = formValue;

  const navigate = useNavigate();

  const { id } = useParams();
  console.log('ID:', id);

  const handleSubmit = (e) => {
    let hasError = false;

    if (!category) {
      setCategoryErrMsg('*Please select a category');
      hasError = true;
    } else {
      setCategoryErrMsg(null);
    }

    if (!title) {
      setTitleErrMsg('*Please provide a title');
      hasError = true;
    } else {
      setTitleErrMsg(null);
    }

    if (!description) {
      setDescriptionErrMsg('*Please provide a description');
      hasError = true;
    } else {
      setDescriptionErrMsg(null);
    }

    if (!imageUrl) {
      setImageErrMsg('*Please provide an image');
      hasError = true;
    } else {
      setImageErrMsg(null);
    }

    if (!hasError) {
      const currentDate = new Date();
      const blogPost = {
        id: uuidv4(),
        title,
        description,
        category,
        imageUrl,
        date: currentDate.toISOString(),
      };
      if (!editMode) {
        try {
          let existingBlogPosts = localStorage.getItem('myblog');
          if (existingBlogPosts) {
            existingBlogPosts = JSON.parse(existingBlogPosts);
          } else {
            existingBlogPosts = [];
          }

          dispatch(addBlogPost(blogPost)); // Dispatch addBlogPost action
          existingBlogPosts.push(blogPost);
          localStorage.setItem('myblog', JSON.stringify(existingBlogPosts));
          toast.success('Blog Post Created Successfully!');
          setFormValue(initial);
          navigate('/');
        } catch (storageError) {
          console.error('Error storing blog post data in localStorage:', storageError);
          toast.error('Failed to store blog post data. Please try again.');
        }
      } else {
        // Code to update an existing blog post
        try {
          let existingBlogPosts = localStorage.getItem('myblog');
          if (existingBlogPosts) {
            existingBlogPosts = JSON.parse(existingBlogPosts);
          } else {
            existingBlogPosts = [];
          }

          // Find the blog post to update by its ID
          const updatedBlogPosts = existingBlogPosts.map((post) => {
            if (post.id === id) {
              return { ...post, title, description, category, imageUrl };
            }
            return post;
          });

          dispatch(updateBlogPost(blogPost)); // Dispatch updateBlogPost action
          localStorage.setItem('myblog', JSON.stringify(updatedBlogPosts));
          toast.success('Blog Updated Successfully!');
          navigate('/');
        } catch (storageError) {
          console.error('Error updating blog post data in localStorage:', storageError);
          toast.error('Failed to update blog post. Please try again.');
        }
      }
    }
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };


const onUploadImage = (files) => {
    const file = files[0];
  
    if (!file) {
      setImageErrMsg('*Please select an image');
      return;
    }
  
    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageDataURL = event.target.result;
  
        // Set imageDataURL as imageUrl in the formValue
        setFormValue({ ...formValue, imageUrl: imageDataURL });
        //localStorage.setItem('uploadImage', imageDataURL);
        toast.info('Image uploaded successfully!!');
      };
      reader.readAsDataURL(file);
      setImageErrMsg(null);
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Something went wrong !!! Check it again');
      setImageErrMsg('Something went wrong !!! Check it again');
    }
  };

  const onCategoryChange = (e) => {
    setCategoryErrMsg(null);
    setFormValue({ ...formValue, category: e.target.value });
  };

  useEffect(() => {
   
    if(id) {
      setEditMode(true);
      getSingleBlog(id);
    } else {
      setEditMode(false);
      setFormValue({ ...initial });
    }
  }, [id]);

  const getSingleBlog = (id) => {
    // Retrieve the blog data for the given ID from local storage
    const existingBlogData = localStorage.getItem('myblog');
  
    if (existingBlogData) {
      const blogData = JSON.parse(existingBlogData);
      const blog = blogData.find((blog) => blog.id === id);
  
      if (blog) {
        setFormValue(blog);
      } else {
        toast.error(`Blog with ID ${id} not found`);
      }
    } else {
      toast.error('No Blog Data found');
    }
  };



  return (
    <div className="row g-3" style={{ marginTop: '100px' }}>
      <h3 className="fs-2 fw-bold">{editMode ? "Update Blog" : "AddBlog"}</h3>
      <div
        style={{
          margin: 'auto',
          padding: '20px',
          maxWidth: '400px',
          alignContent: 'center',
        }}
      >
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            name="title"
            placeholder="Title"
            value={title}
            onChange={onInputChange}
          />
          {titleErrMsg && (
            <div className="text-danger" style={{ fontSize: '14px', marginTop: '5px', textAlign: 'left'}}>
              {titleErrMsg}
            </div>
          )}
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            name="description"
            placeholder="Description"
            value={description}
            onChange={onInputChange}
            rows="4"
          />
          {descriptionErrMsg && (
            <div className="text-danger" style={{ fontSize: '14px', marginTop: '5px', textAlign: 'left' }}>
              {descriptionErrMsg}
            </div>
          )}
        </div>

        {!editMode && (
            <>
            <div className="mb-3">
            <input
              type="file"
              name="image"
              className='form-control'
              onChange={(e) => onUploadImage(e.target.files)}
              required
  
            />
            {imageErrMsg && (
              <div className="text-danger" style={{ fontSize: '14px', marginTop: '5px' , textAlign: 'left'}}>
                {imageErrMsg}
              </div>
            )}
          </div>
            </>
        )}
      
        <div className="mb-3">
          <select
            className="form-select"
            name="category"
            value={category}
            onChange={onCategoryChange}
          >
            <option value="">Category</option>
            {options.map((option, index) => (
              <option value={option || ''} key={index}>
                {option}
              </option>
            ))}
          </select>
          {categoryErrMsg && (
            <div className="text-danger" style={{ fontSize: '14px', marginTop: '5px', textAlign: 'left' }}>
              {categoryErrMsg}
            </div>
          )}
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary" onClick={handleSubmit} style={{ marginRight: '10px' }}>
           {editMode ? "Update" : "Add"}
          </button>
          <button className="btn btn-danger" onClick={() => navigate('/')}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddEditBlog;
