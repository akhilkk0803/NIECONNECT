import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 px-5 py-1.5">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
        <div className="mb-4 lg:mb-0">
          <h1 className="text-l font-bold mt-4 md:mt-0">NIE CONNECT</h1>
        </div>
        <p className="text-sm">All rights reserved © {new Date().getFullYear()}</p>
      </div>
      <style jsx>{`
        footer {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
        }
        body {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        main {
          flex: 1;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
