const initialState = {
    
    blogPosts: [],
    
  };

  const blogReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_BLOG_POST':
       
        return {
          ...state,
          blogPosts: [...state.blogPosts, action.payload],
        };
  
      case 'UPDATE_BLOG_POST':
        return {
          ...state,
          blogPosts: state.blogPosts.map((post) =>
            post.id === action.payload.id ? action.payload : post
          ),
        };
  
      default:
        return state;
    }
  };
  
  export default blogReducer;
  