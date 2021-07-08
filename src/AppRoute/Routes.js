import React from "react";
import { Route, Switch } from "react-router-dom";
import Homepage from "../Pages/Homepage";
import SubCategory from "../Pages/SubCategory";
import VerticleCategory from "../Pages/Verticlecategory";
import ProductDetail from "../Pages/ProductDetail";
import {
  ROUTE_SUBCATEGORIES,
  ROUTE_VERTICLE_CATEGORIES,
  ROUTE_CART,
  ROUTE_PRODUCT_DETAIL,
  ROUTE_ALL_PRODUCT,
  ROUTE_LOGIN,
  ROUTE_USER_DETAIL,
  ROUTE_REGISTER,
} from "../Constant";
import Cart from "../Pages/Cart";
import AllProductPage from "../Pages/AllProductPage";
import Login from "../Pages/Login";
import UserDetail from "../Pages/UserDetail";
import Register from "../Pages/Register";
import PrivacyPolicy from "../Pages/PrivacyPolicy";
import Help from "../Pages/Help";
//import Profile from "../Pages/Profile"
import Order from '../Pages/Order'

const Routes = () => {
  return (
    <Switch>
      <Route
        exact
        path={`/${ROUTE_SUBCATEGORIES}/:id`}
        component={SubCategory}
      />
      <Route
        exact
        path={`/${ROUTE_VERTICLE_CATEGORIES}/:id`}
        component={VerticleCategory}
      />
      <Route exact path={`/${ROUTE_CART}`} component={Cart} />
      <Route
        exact
        path={`/${ROUTE_PRODUCT_DETAIL}/:id`}
        component={ProductDetail}
      />
      <Route
        exact
        path={`/${ROUTE_ALL_PRODUCT}/:key`}
        component={AllProductPage}
      />
      <Route exact path={`/${ROUTE_LOGIN}`} component={Login} />
      <Route exact path={`/${ROUTE_REGISTER}`} component={Register} />
      <Route exact path={`/${ROUTE_USER_DETAIL}/:id`} component={UserDetail} />
      <Route exact path="/privacy-policy" component={PrivacyPolicy} />
      <Route exact path="/help" component={Help} />
      <Route exact path="/profile" component={UserDetail} />
      <Route exact path="/order" component={Order} />
      <Route exact path="/" component={Homepage} />
    </Switch>
  );
};

export default Routes;
