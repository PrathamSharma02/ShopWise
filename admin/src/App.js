import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./app.css";
import Home from "./pages/home/Home";
import{
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";

function AuthenticatedLayout({ children }) {
  const admin = useSelector((state) => state.user.currentUser.isAdmin);;
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {admin && !isLoginPage && <Topbar />}
      {admin && !isLoginPage && (
        <div className="container">
          <Sidebar />
          {children}
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<AuthenticatedLayout><Home /></AuthenticatedLayout>} />
        <Route path="/users" element={<AuthenticatedLayout><UserList /></AuthenticatedLayout>} />
        <Route path="/user/:userId" element={<AuthenticatedLayout><User /></AuthenticatedLayout>} />
        <Route path="/newUser" element={<AuthenticatedLayout><NewUser /></AuthenticatedLayout>} />
        <Route path="/products" element={<AuthenticatedLayout><ProductList /></AuthenticatedLayout>} />
        <Route path="/product/:productId" element={<AuthenticatedLayout><Product /></AuthenticatedLayout>} />
        <Route path="/newproduct" element={<AuthenticatedLayout><NewProduct /></AuthenticatedLayout>} />
      </Routes>
    </Router>
  );
}

export default App;