import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home.jsx";
import BrowseBusiness from "./pages/BrowseBusiness.jsx";
import BrowseProducts from "./pages/BrowseProducts.jsx";
import BusinessDetail from "./pages/BusinessDetail.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import CreateBusiness from "./pages/CreateBusiness.jsx";
import UpdateBusiness from "./pages/UpdateBusiness.jsx";
import UpdateProduct from "./pages/UpdateProduct.jsx";

const app = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/business/browse" element={<BrowseBusiness/>}/>
      <Route path="/business/:id" element={<BusinessDetail/>}/>
      <Route path="/business/create" element={<CreateBusiness/>}/>
      <Route path="/products/browse" element={<BrowseProducts/>}/>
      <Route path="/products/:id" element={<ProductDetail/>}/>
    </Routes>
  );
};

export default app;
