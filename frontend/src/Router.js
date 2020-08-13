import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./views/HomePage";
import LoginScreen from "./views/LoginScreen";
import RegisterScreen from "./views/RegisterScreen";
import CategoryScreen from "./views/CategoryScreen";
import SubCategoryScreen from "./views/SubCategoryScreen";
import ServiceScreen from "./views/ServiceScreen";
import ProfileScreen from "./views/ProfileScreen";
import SettingsScreen from "./views/SettingsScreen";
import EditServiceScreen from "./views/EditServiceScreen";
import CreateServiceScreen from "./views/CreateServiceScreen";
import { Checkout } from "./components/Checkout";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/service/:serviceName" exact component={ServiceScreen} />
      <Route path="/edit/:serviceName" component={EditServiceScreen} />
      <Route
        path="/categories/:categoryName"
        exact
        component={CategoryScreen}
      />
      <Route
        path="/:categoryName/:subcategoryName"
        exact
        component={SubCategoryScreen}
      />
      <Route path="/profile" component={ProfileScreen} />
      <Route path="/login" component={LoginScreen} />
      <Route path="/register" component={RegisterScreen} />
      <Route path="/settings" component={SettingsScreen} />
      <Route path="/create" component={CreateServiceScreen} />
    </Switch>
  </BrowserRouter>
);

export default Router;
