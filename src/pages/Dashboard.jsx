import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import DevicesDashboard from "../components/DevicesDashboard";



export default function Dashboard() {
  
  

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-zinc-900">

      <motion.main
        className="flex-1 p-6 space-y-6"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Header />
         
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <DevicesDashboard />
           
        </motion.div>
      </motion.main>
    </div>
  );
}
