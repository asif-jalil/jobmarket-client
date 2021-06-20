import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./NotFound.css";

const NotFound = () => {
  return (
    <>
      <Header />
      <section className="not-found text-center py-5">
        <h1>404</h1>
        <h2>Page Not Found</h2>
      </section>
      <Footer />
    </>
  );
};

export default NotFound;
