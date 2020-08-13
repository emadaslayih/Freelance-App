import React from "react";
import GuestHeader from "./GuestHeader";
import AuthHeader from "./AuthHeader";
import SubHeader from "./Subheader";
const Header = () => {
  const token = localStorage.getItem("token");

  return token ? (
    <div>
      <AuthHeader />
      <SubHeader />
    </div>
  ) : (
    <div>
      <GuestHeader />
      <SubHeader />
    </div>
  );
};

export default Header;
