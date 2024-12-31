import React from "react";

const Footer = () => {
  return (
    <footer className="w-full fixed bottom-0">
      <div className="w-full h-16 flex flex-col md:flex-row items-center justify-center bg-[#10151b]">
        <h2 className="text-center">
          copyright © since 2024 Build with ❤ by{"  "}
          <span className="underline">Muhammad Hasnain</span>
        </h2>
      </div>
    </footer>
  );
};

export default Footer;
