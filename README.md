# Blog Post App

## Project Overview
The **Blog Post App** is a simple blogging platform designed using React and Redux. It allows users to perform CRUD (Create, Read, Update, Delete) operations on blog posts, and also includes a feature to like posts. The application demonstrates effective state management with both Redux and Context API, and provides an intuitive user experience.

---

## Functional Requirements

### Core Features
1. **Show List of Blog Posts:**
   - Display all blog posts on the home page.
2. **View Blog Post Details:**
   - Allow users to click on a post to view its full details.
3. **Add a New Blog Post:**
   - Provide a form to create and save a new blog post.
4. **Edit a Blog Post:**
   - Allow users to modify the content of an existing blog post.
5. **Delete a Blog Post:**
   - Enable users to delete a post permanently.
6. **Like a Blog Post:**
   - Include a button to like a post and track the number of likes.

---

## Technical Requirements
1. **Frontend Framework:** React with Redux for state management.
2. **State Management:** Use both Redux and Context API for efficient state handling.
3. **Styling:**
   - Use CSS, SASS, or LESS for custom styling.
   - Allow the use of Bootstrap or Materialize frameworks for layout and forms (excluding their JS components).
4. **Local Data Management:**
   - Store blog data locally without relying on an external server or JSON server.

---

## Development Plan

### Step 1: Project Initialization
- Set up a new React app using `create-react-app`.
- Install necessary dependencies, including Redux and React-Redux.

### Step 2: Build the UI
- Design components for:
  - Blog List
  - Blog Details
  - Blog Form (Add/Edit)
- Use Bootstrap or Materialize for responsive layouts.

### Step 3: Implement State Management
- Configure Redux with actions, reducers, and the store.
- Use Context API for managing likes functionality.
- Integrate Redux with React components using `connect` or `useSelector` and `useDispatch` hooks.

### Step 4: Add Functionality
- Implement CRUD operations:
  - Add new blog posts.
  - Edit and update existing posts.
  - Delete posts.
  - View details of individual posts.
- Implement the like feature using Context API.

### Step 5: Styling and Responsiveness
- Style components with custom CSS.
- Ensure the app is fully responsive across devices.


