import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Import Link for navigation
import './App.css';
import Auth from './Auth';
import Dashboard from './Dashboard';
import Home from './Home';
import ProductManagement from './ProductManagement';
import UserManagement from './UserManagement';
import StockManagement from './StockManagement';
import ProductList from './ProductList';
import UserList from './UserList';
import StockList from './StockList';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    return (
        <Router>
            <div className="container">
                <header style={styles.header}>
                    <h1 style={styles.headerTitle}>WINGS CAFE </h1>
                    {isAuthenticated && (
                        <aside style={styles.navContainer}>
                            <nav>
                                <ul style={styles.navList}>
                                    <li style={styles.navItem}><Link to="/home" style={styles.navLink}>Home Page</Link></li>
                                    <li style={styles.navItem}><Link to="/dashboard" style={styles.navLink}>Dashboard</Link></li>
                                    <li style={styles.navItem}><Link to="/product-management" style={styles.navLink}>Manage Products</Link></li>
                                    <li style={styles.navItem}><Link to="/user-management" style={styles.navLink}>Manage Users</Link></li>
                                    <li style={styles.navItem}><Link to="/stock-management" style={styles.navLink}>Manage Stock</Link></li>
                                </ul>
                                <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
                            </nav>
                        </aside>
                    )}
                </header>

                <Routes>
                    <Route path="/" element={isAuthenticated ? <Home /> : <Auth onLogin={handleLogin} />} />
                    <Route path="/home" element={isAuthenticated ? <Home /> : <Auth onLogin={handleLogin} />} />
                    <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Auth onLogin={handleLogin} />} />
                    <Route path="/product-management" element={isAuthenticated ? <ProductManagement /> : <Auth onLogin={handleLogin} />} />
                    <Route path="/user-management" element={isAuthenticated ? <UserManagement /> : <Auth onLogin={handleLogin} />} />
                    <Route path="/stock-management" element={isAuthenticated ? <StockManagement /> : <Auth onLogin={handleLogin} />} />
                    <Route path="/product-list" element={isAuthenticated ? <ProductList /> : <Auth onLogin={handleLogin} />} />
                    <Route path="/user-list" element={isAuthenticated ? <UserList /> : <Auth onLogin={handleLogin} />} />
                    <Route path="/stock-list" element={isAuthenticated ? <StockList /> : <Auth onLogin={handleLogin} />} />
                </Routes>
            </div>
        </Router>
    );
};

const styles = {
    header: {
        backgroundColor: '#333',
        color: '#fff',
        padding: '20px',
        textAlign: 'center',
    },
    headerTitle: {
        margin: 0,
        fontSize: '32px',
    },
    navContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
    },
    navList: {
        listStyleType: 'none',
        padding: 0,
        margin: 0,
        display: 'flex',
        gap: '20px',
    },
    navItem: {
        display: 'inline',
    },
    navLink: {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '18px',
        padding: '10px 15px',
        borderRadius: '5px',
        transition: 'background-color 0.3s',
    },
    navLinkHover: {
        backgroundColor: '#555',
    },
    logoutButton: {
        backgroundColor: '#ff4d4d',
        color: '#fff',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginLeft: '20px',
        fontSize: '16px',
    },
};

export default App;
