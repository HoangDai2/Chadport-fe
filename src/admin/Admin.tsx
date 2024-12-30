import React from "react";
import SideBarAD from "./components/SideBarAD";
import HeaderAD from "./components/HeaderAD";
import { Outlet } from "react-router-dom";

const Admin: React.FC = () => {
  return (
    <>
      <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary pl-[20%]">
        <SideBarAD />
        <div className="h-screen flex-grow-1 overflow-y-lg-auto">
          <HeaderAD />
          <main className="py-6 bg-surface-secondary">
            <div className="container-fluid">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Admin;
