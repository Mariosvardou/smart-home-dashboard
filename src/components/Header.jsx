import React from "react";

const Header = ({ title }) => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-zinc-900 shadow">
      
      <h1 className="text-xl font-semibold text-zinc-800 dark:text-white">Smart Home Devices</h1>
      
    </header>
  );
};

export default Header;
