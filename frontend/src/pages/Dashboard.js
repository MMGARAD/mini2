import React from 'react';
import { motion } from 'framer-motion';
import '../styles/dashboard.css';
import bannerImage from '../assets/college.png';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

function Dashboard() {
  return (
    <motion.div
      className="dashboard-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Animated Header */}
      <motion.div className="header-section" variants={itemVariants}>
        <h1 className="gradient-text">Academic Project Explorer</h1>
        <h3 className="subtitle">Computer Science & Engineering</h3>
        <motion.img 
          src={bannerImage}
          alt="Campus Banner"
          className="banner"
          whileHover={{ scale: 1.02 }}
        />
      </motion.div>

      {/* Removed stats cards and quick actions */}

      {/* Glowing Projects Table */}
      <motion.div variants={itemVariants}>
        <div className="glowing-table">
          <div className="table-header">
            <h5>Recent Projects</h5>
            <div className="shine"></div>
          </div>
          {/* Add table content here when needed */}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Dashboard;