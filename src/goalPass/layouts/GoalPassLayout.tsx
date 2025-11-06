import React from "react";
import { Navbar } from "../../shared/components/organims/Navbar";
import { Header } from "../../shared/components/organims/Header";
import { Outlet } from "react-router";

export const GoalPassLayout = () => {
  return (
    <article className="flex w-full h-svh">
      <Navbar />
      <section className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <div className="flex-1 bg-black-1-custom flex flex-col text-white max-h-full overflow-hidden">
          <Outlet />
        </div>
      </section>
    </article>
  );
};
