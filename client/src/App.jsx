import Sidebar from "./components/Sidebar";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import TaxPage from "./pages/TaxPage";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SalesPage from "./pages/SalesPage";
import { useDispatch } from "react-redux";
import ShowSalesPage from "./pages/ShowSalesPage";

function App() {
  const dispatch = useDispatch();

  return (
    <div className="app-container">
      <Sidebar />
      <div className="content">
        <Routes>
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/tax" element={<TaxPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/sale" element={<SalesPage />} />
          <Route path="/showsale" element={<ShowSalesPage />} />
          <Route path="*" element={<CategoryPage />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </div>
  );
}

export default App;
