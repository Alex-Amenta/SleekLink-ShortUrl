"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChildrenProps } from "../../types";

const ToastProvider = ({ children }: ChildrenProps) => {
  return (
    <>
      {children}
      <ToastContainer
        theme="dark"
        autoClose={5000}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default ToastProvider;
