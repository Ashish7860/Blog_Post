import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./Pages/Home";
import AddEditBlog from "./Pages/AddEditBlog";
import Blog from "./Pages/Blog";
import About from "./Pages/About";
import NotFound from "./Pages/NotFound";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import { UserProvider } from './Context/UserContext';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Navbar />
      <ToastContainer />
      <UserProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addBlog" element={<AddEditBlog />} />
        <Route path="/editBlog/:id" element={<AddEditBlog />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </UserProvider>
      <Footer />
    </div>
    </BrowserRouter>
  );
}
export default App;
