import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home.jsx";
import BrowseBusiness from "./pages/BrowseBusiness.jsx";
import BrowseProducts from "./pages/BrowseProducts.jsx";
import BusinessDetail from "./pages/BusinessDetail.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import ServiceDetail from "./pages/ServiceDetail.jsx";
import CreateBusiness from "./pages/CreateBusiness.jsx";
import UpdateBusiness from "./pages/UpdateBusiness.jsx";
import UpdateProduct from "./pages/UpdateProduct.jsx";
import CreateProduct from "./pages/CreateProduct.jsx";
import CreateServive from "./pages/CreateService.jsx";
import UpdateService from "./pages/UpdateService.jsx";
import ShoppingCart from "./pages/ShoppingCart.jsx";
import UserAccount from "./pages/UserAccount.jsx";

const app = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/account/:id" element={<UserAccount/>} />
      <Route path="/cart/:id" element={<ShoppingCart/>} />
      <Route path="/business/browse" element={<BrowseBusiness/>} />
      <Route path="/business/:id" element={<BusinessDetail/>} />
      <Route path="/business/create" element={<CreateBusiness/>} />
      <Route path="/business/update/:id" element={<UpdateBusiness/>} />
      <Route path="/products/browse" element={<BrowseProducts/>} />
      <Route path="/products/:id" element={<ProductDetail/>} />
      <Route path="/products/create" element={<CreateProduct/>} />
      <Route path="/products/update/:id" element={<UpdateProduct/>} />
      <Route path="/service/:id" element={<ServiceDetail/>} />
      <Route path="/service/create" element={<CreateServive/>} />
      <Route path="/service/update/:id" element={<UpdateService/>} />
    </Routes>
  );
};

export default app;
