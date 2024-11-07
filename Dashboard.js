import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        // Load products from local storage
        const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
        setProducts(storedProducts);

        // Load transactions from local storage
        const storedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
        setTransactions(storedTransactions);

        // Handle changes in localStorage (e.g., when a product is added)
        const handleStorageChange = () => {
            const updatedProducts = JSON.parse(localStorage.getItem("products")) || [];
            setProducts(updatedProducts);
        };

        window.addEventListener('storage', handleStorageChange);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    // Calculate the total stock value
    const calculateTotalStockValue = () => {
        return products.reduce((total, product) => {
            return total + (product.price * product.quantity);
        }, 0).toFixed(2); // Fixed to two decimal points
    };

    // Data for the chart (quantities of each product)
    const chartData = {
        labels: products.map(product => product.name), // Product names as labels
        datasets: [
            {
                label: 'Product Quantities',
                data: products.map(product => product.quantity), // Product quantities as data
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Chart options
    const chartOptions = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <section style={styles.section}>
            <h2 style={styles.header}>Dashboard</h2>

            {/* Total stock value */}
            <h3 style={styles.totalStockValue}>Total Stock Value: M{calculateTotalStockValue()}</h3>

            {/* Bar Chart to show Product Quantities */}
            <h3 style={styles.chartTitle}>Product Quantity Overview</h3>
            <div style={styles.chartContainer}>
                <Bar data={chartData} options={chartOptions} />
            </div>

            {/* Product Table */}
            <h3 style={styles.tableTitle}>Product Inventory</h3>
            <table style={styles.table}>
                <thead>
                    <tr style={styles.tableHeader}>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Stock Level</th>
                        <th>Sold Stock</th>
                        <th>Sold Products</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map((product) => (
                            <tr key={product.id} style={styles.tableRow}>
                                <td>{product.name}</td>
                                <td>{product.quantity}</td>
                                <td>M{product.price.toFixed(2)}</td>
                                <td style={product.quantity < 5 ? styles.lowStock : styles.availableStock}>
                                    {product.quantity < 5 ? "Low Stock" : "Available"}
                                </td>
                                <td>{product.quantity < 20 ? 20 - product.quantity : 0}</td>
                                <td>{product.quantity < 20 ? "Yes" : "No"}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6}>No Products Available</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Transaction Table */}
            <h3 style={styles.tableTitle}>Transaction History</h3>
            <table style={styles.table}>
                <thead>
                    <tr style={styles.tableHeader}>
                        <th>Stock Name</th>
                        <th>Quantity Changed</th>
                        <th>Action</th>
                        <th>Date & Time</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.length > 0 ? (
                        transactions.map((transaction, index) => (
                            <tr key={index} style={styles.tableRow}>
                                <td>{transaction.productName}</td>
                                <td>{transaction.quantityChanged}</td>
                                <td>{transaction.action === 'add' ? "Added" : "Deducted"}</td>
                                <td>{transaction.date}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4}>No Transactions Available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </section>
    );
};

// Inline styles for the Dashboard
const styles = {
    section: {
        fontFamily: '"Roboto", sans-serif',
        backgroundColor: '#f8f8f8',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    header: {
        textAlign: 'center',
        fontSize: '32px',
        color: '#333',
        marginBottom: '20px',
    },
    totalStockValue: {
        textAlign: 'center',
        fontSize: '24px',
        color: '#007BFF',
        marginBottom: '30px',
    },
    chartTitle: {
        textAlign: 'center',
        fontSize: '24px',
        marginBottom: '20px',
    },
    chartContainer: {
        height: '400px',
        width: '100%',
        marginBottom: '40px',
    },
    tableTitle: {
        fontSize: '24px',
        color: '#333',
        marginBottom: '15px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: '30px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    tableHeader: {
        backgroundColor: '#4CAF50',
        color: '#fff',
        fontSize: '16px',
    },
    tableRow: {
        textAlign: 'center',
        fontSize: '14px',
        borderBottom: '1px solid #ddd',
    },
    lowStock: {
        color: '#e74c3c',
        fontWeight: 'bold',
    },
    availableStock: {
        color: '#2ecc71',
        fontWeight: 'bold',
    },
};

export default Dashboard;
