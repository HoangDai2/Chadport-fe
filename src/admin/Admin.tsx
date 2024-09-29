import React from "react";
import SideBarAD from "./components/SideBarAD";
import HeaderAD from "./components/HeaderAD";
import { Outlet } from "react-router-dom";
type Props = {};

const admin = (props: Props) => {
  return (
    <>
      <main>
        <SideBarAD />
        <div className="headerad">
          <HeaderAD />
          <div className="conten_admin">
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
};

export default admin;
