import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home.jsx";
import BrowseBusiness from "./pages/BrowseBusiness.jsx";
import BrowseProducts from "./pages/BrowseProducts.jsx";
import BusinessDetail from "./pages/BusinessDetail.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import CreateBusiness from "./pages/CreateBusiness.jsx";
import Profile from "./pages/Profile.jsx";
import CreateProduct from "./pages/CreateProduct.jsx";

const app = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/user/profile" element={<Profile/>}/>
      <Route path="/user/createProduct" element={<CreateProduct/>}/>
      <Route path="/business/browseBusiness" element={<BrowseBusiness/>}/>
      <Route path="/business/businessDetail" element={<BusinessDetail/>}/>
      <Route path="/business/createBusiness" element={<CreateBusiness/>}/>
      <Route path="/products/browseProducts" element={<BrowseProducts/>}/>
      <Route path="/products/productDetails" element={<ProductDetail/>}/>
    </Routes>
  );
};

export default app;
