import React, { Component, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Order_list from "./pages/order/Order_list";
import "./scss/style.scss";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));
// Pages

const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const Page404 = React.lazy(() => import("./pages/Page404"));
const Page500 = React.lazy(() => import("./pages/Page500"));
const Product_List = React.lazy(() => import("./pages/product/Product_list"));
const AddProduct = React.lazy(() => import("./pages/product/Add_product"));
const Web_List = React.lazy(() => import("./pages/website/Web_list"));
const Cou_List = React.lazy(() => import("./pages/courier/Courier"));
const Orderlist = React.lazy(() => import("./pages/order/Order_list"));


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route exact path="/productdet" name="productlist" element={<Product_List />} />
            <Route exact path="/addproduct" name="add product" element={<AddProduct />} />
            <Route exact path="/weblist" name="weblist" element={<Web_List />} />
            <Route exact path="/coulist" name="coulist" element={<Cou_List />} />
            <Route exact path="/orderlist" name="orderlist" element={<Orderlist />} />
            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    );
  }
}

export default App;

