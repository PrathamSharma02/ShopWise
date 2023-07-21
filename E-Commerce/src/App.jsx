import { useSelector } from "react-redux";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Success from "./pages/Success";
import{
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";



const App = () => {
  const user = useSelector(state=>state.user.currentUser);
  return (
    <Router>
      <Routes>
      <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        />
        <Route exact path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<Success />} />
        
        <Route 
        path="/register" 
        element={user ? <Navigate to="/" /> : <Register />} />
      </Routes>
    </Router>
  );
};

export default App;