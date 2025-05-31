import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { FiMenu, FiX, FiLogOut, FiHome,FiUsers, FiCalendar, FiPieChart } from 'react-icons/fi';
import { FaCar } from 'react-icons/fa';
import logo from '../assests/logo.png';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [stats, setStats] = useState({});
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/stats`, {
                    headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}` }
                });
                setStats(res.data);
            } catch (err) {
                console.error('Error fetching stats:', err);
            }
        };
        fetchStats();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    const isMobile = windowWidth < 768;

    const navItems = [
        { id: 'dashboard', icon: <FiHome size={20} />, label: 'Dashboard' },
        { id: 'vehicles', icon: <FaCar size={20} />, label: 'Vehicles' },
        { id: 'users', icon: <FiUsers size={20} />, label: 'Users' },
        { id: 'rentals', icon: <FiCalendar size={20} />, label: 'Rentals' },
        { id: 'reports', icon: <FiPieChart size={20} />, label: 'Reports' }
    ];

    return (
        <div className="min-vh-100 bg-light">
            <style>
                {`
          .sidebar {
            background: linear-gradient(270deg, #007bff, #6610f2);
            background-size: 400% 400%;
            animation: bgMove 10s ease infinite;
          }
          
          @keyframes bgMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          .nav-link.active {
            background: rgba(255,255,255,0.15);
            border-left: 3px solid white;
          }
          
          .stat-card {
            transition: all 0.3s ease;
            border: none;
            border-radius: 10px;
          }
          
          .stat-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
          }

          @media (max-width: 767.98px) {
            .sidebar {
              width: 280px;
              position: fixed;
              z-index: 1050;
              height: 100vh;
              transform: translateX(-100%);
              transition: transform 0.3s ease;
            }
            .sidebar-open {
              transform: translateX(0);
            }
            .sidebar-overlay {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: rgba(0,0,0,0.5);
              z-index: 1040;
              display: none;
            }
            .sidebar-overlay-open {
              display: block;
            }
            .main-content {
              margin-left: 0 !important;
            }
          }
        `}
            </style>

            {/* Mobile Sidebar Overlay */}
            {isMobile && (
                <div
                    className={`sidebar-overlay ${sidebarOpen ? 'sidebar-overlay-open' : ''}`}
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <div className="d-flex">
                {/* Sidebar */}
                <motion.div
                    className={`sidebar text-white vh-100 ${sidebarOpen ? 'sidebar-open' : ''} ${!isMobile ? 'position-fixed' : ''}`}
                    style={{ width: isMobile ? '280px' : '250px' }}
                    initial={!isMobile ? { x: -100 } : false}
                    animate={!isMobile ? { x: 0 } : {}}
                    transition={{ type: 'spring', stiffness: 100 }}
                >
                    <div className="d-flex justify-content-between align-items-center p-3 border-bottom border-light">
                        <div className="p-3 text-center w-100">
                            <motion.img
                                src={logo}
                                alt="Rentro Logo"
                                style={{ height: '50px' }}
                                whileHover={{ scale: 1.1 }}
                            />
                            <h5 className="mt-2 mb-0 d-none d-md-block">Admin Panel</h5>
                        </div>
                        {isMobile && (
                            <button
                                className="btn text-white"
                                onClick={() => setSidebarOpen(false)}
                            >
                                <FiX size={24} />
                            </button>
                        )}
                    </div>

                    <nav className="nav flex-column px-3 py-3">
                        {navItems.map((item) => (
                            <motion.div
                                key={item.id}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <button
                                    className={`nav-link text-white text-start py-3 mb-1 rounded d-flex align-items-center ${activeTab === item.id ? 'active' : ''}`}
                                    onClick={() => {
                                        setActiveTab(item.id);
                                        if (isMobile) setSidebarOpen(false);
                                    }}
                                >
                                    <span className="me-3">{item.icon}</span>
                                    <span>{item.label}</span>
                                </button>
                            </motion.div>
                        ))}
                    </nav>
                </motion.div>

                {/* Main Content */}
                <div className={`flex-grow-1 main-content`} style={{ marginLeft: !isMobile ? '250px' : '0' }}>
                    {/* Top Navbar */}
                    <nav className="navbar navbar-light bg-white shadow-sm sticky-top">
                        <div className="container-fluid">
                            {isMobile && (
                                <button
                                    className="btn moving-btn me-2"
                                    onClick={() => setSidebarOpen(true)}
                                >
                                    <FiMenu size={20} />
                                </button>
                            )}
                            <span className="navbar-brand d-flex align-items-center">
                                {isMobile && <span className="ms-2">{navItems.find(item => item.id === activeTab)?.label}</span>}
                            </span>
                            <div>
                                <button
                                    className="btn moving-btn d-flex align-items-center"
                                    onClick={handleLogout}
                                >
                                    {!isMobile ? 'Logout' : <FiLogOut size={20} />}
                                </button>
                            </div>
                        </div>
                    </nav>

                    {/* Dashboard Content */}
                    <div className="p-3 p-md-4">
                        <AnimatePresence mode='wait'>
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                {activeTab === 'dashboard' && (
                                    <>
                                        <h4 className="mb-3 mb-md-4 d-flex align-items-center">
                                            <FiHome className="me-2" /> Dashboard Overview
                                        </h4>

                                        <div className="row g-3 g-md-4 mb-4">
                                            {[
                                                { title: 'Total Vehicles', value: stats.vehicles || '--', icon: '🚗', color: 'primary' },
                                                { title: 'Active Rentals', value: stats.activeRentals || '--', icon: '📅', color: 'success' },
                                                { title: 'Total Users', value: stats.users || '--', icon: '👥', color: 'info' },
                                                { title: 'Revenue', value: stats.revenue ? `$${stats.revenue}` : '--', icon: '💰', color: 'warning' }
                                            ].map((stat, index) => (
                                                <div className="col-6 col-md-3" key={index}>
                                                    <motion.div
                                                        className={`card stat-card bg-${stat.color}-subtle border-${stat.color}-subtle h-100`}
                                                        whileHover={{ y: -5 }}
                                                    >
                                                        <div className="card-body">
                                                            <div className="d-flex justify-content-between">
                                                                <div>
                                                                    <h6 className="text-muted mb-1">{stat.title}</h6>
                                                                    <h4 className="mb-0">{stat.value}</h4>
                                                                </div>
                                                                <span className="fs-3">{stat.icon}</span>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Recent Activity */}
                                        <div className="card shadow-sm mb-4">
                                            <div className="card-header bg-white">
                                                <h5 className="mb-0">Recent Activity</h5>
                                            </div>
                                            <div className="card-body p-0">
                                                <div className="list-group list-group-flush">
                                                    {[
                                                        { id: 1, action: 'New vehicle added', time: '2 mins ago', user: 'Admin' },
                                                        { id: 2, action: 'Rental approved', time: '15 mins ago', user: 'John Doe' },
                                                        { id: 3, action: 'User registered', time: '1 hour ago', user: 'Jane Smith' }
                                                    ].map((activity) => (
                                                        <motion.div
                                                            key={activity.id}
                                                            className="list-group-item py-3"
                                                            whileHover={{ backgroundColor: 'rgba(0,123,255,0.05)' }}
                                                        >
                                                            <div className="d-flex justify-content-between flex-column flex-md-row">
                                                                <div className="mb-2 mb-md-0">
                                                                    <strong>{activity.action}</strong>
                                                                    <div className="text-muted small">{activity.time}</div>
                                                                </div>
                                                                <span className="text-muted">{activity.user}</span>
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {activeTab === 'vehicles' && <ManageVehicles isMobile={isMobile} />}
                                {activeTab === 'users' && <ManageUsers isMobile={isMobile} />}
                                {activeTab === 'rentals' && <ManageRentals isMobile={isMobile} />}
                                {activeTab === 'reports' && <ManageReports isMobile={isMobile} />}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Responsive components for other tabs
const ManageVehicles = ({ isMobile }) => (
    <>
        <h4 className="mb-3 mb-md-4 d-flex align-items-center">
            <FaCar className="me-2" /> Manage Vehicles
        </h4>
        <div className="card shadow-sm">
            <div className="card-body">
                <div className={`d-flex ${isMobile ? 'flex-column' : 'justify-content-between align-items-center'}`}>
                    <div className={`${isMobile ? 'mb-3' : 'me-3'}`}>
                        <button className="btn moving-btn">Add New Vehicle</button>
                    </div>
                    <div className="flex-grow-1">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search vehicles..."
                        />
                    </div>
                </div>
                <div className="table-responsive mt-3">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Model</th>
                                <th>Type</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Toyota Camry</td>
                                <td>Sedan</td>
                                <td>Available</td>
                                <td>
                                    <button className="btn btn-sm btn-outline-primary me-1">Edit</button>
                                    <button className="btn btn-sm btn-outline-danger">Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>
);

const ManageUsers = ({ isMobile }) => (
    <>
        <h4 className="mb-3 mb-md-4 d-flex align-items-center">
            <FiUsers className="me-2" /> Manage Users
        </h4>
        <div className="card shadow-sm">
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Admin User</td>
                                <td>admin@rentro.com</td>
                                <td>Admin</td>
                                <td>Active</td>
                                <td>
                                    <button className="btn btn-sm btn-outline-primary me-1">Edit</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>
);

const ManageRentals = ({ isMobile }) => (
    <>
        <h4 className="mb-3 mb-md-4 d-flex align-items-center">
            <FiCalendar className="me-2" /> Manage Rentals
        </h4>
        <div className="card shadow-sm">
            <div className="card-body">
                <div className="d-flex flex-wrap gap-2 mb-3">
                    <button className="btn btn-outline-primary active">All</button>
                    <button className="btn btn-outline-primary">Pending</button>
                    <button className="btn btn-outline-primary">Approved</button>
                    <button className="btn btn-outline-primary">Completed</button>
                </div>
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Vehicle</th>
                                <th>Customer</th>
                                <th>Dates</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Toyota Camry</td>
                                <td>John Doe</td>
                                <td>Jun 1 - Jun 5, 2023</td>
                                <td>Approved</td>
                                <td>
                                    <button className="btn btn-sm btn-outline-primary me-1">View</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>
);

const ManageReports = ({ isMobile }) => (
    <>
        <h4 className="mb-3 mb-md-4 d-flex align-items-center">
            <FiPieChart className="me-2" /> Reports
        </h4>
        <div className="row">
            <div className="col-md-6 mb-3 mb-md-0">
                <div className="card shadow-sm h-100">
                    <div className="card-header bg-white">
                        <h5 className="mb-0">Monthly Revenue</h5>
                    </div>
                    <div className="card-body">
                        <div className="text-center py-4">
                            <p className="text-muted">Chart will be displayed here</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="card shadow-sm h-100">
                    <div className="card-header bg-white">
                        <h5 className="mb-0">Vehicle Utilization</h5>
                    </div>
                    <div className="card-body">
                        <div className="text-center py-4">
                            <p className="text-muted">Chart will be displayed here</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
);

export default AdminDashboard;