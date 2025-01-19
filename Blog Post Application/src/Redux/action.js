export const addBlogPost = (post) => {
    return {
      // act as object (type and payload)
      type: 'ADD_BLOG_POST',
      payload: post,
    };
  };
  
  export const updateBlogPost = (post) => {
    return {
      type: 'UPDATE_BLOG_POST',
      payload: post,
    };
  };
  