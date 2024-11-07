import React, { useEffect, useState } from 'react';

const StockList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
        setProducts(storedProducts);
    }, []);

    return (
        <section style={styles.container}>
            <h2 style={styles.header}>List of Stock Transactions</h2>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.tableHeader}>Product Name</th>
                        <th style={styles.tableHeader}>Quantity</th>
                        <th style={styles.tableHeader}>Stock Level</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map((product) => (
                            <tr key={product.id} style={styles.tableRow}>
                                <td style={styles.tableCell}>{product.name}</td>
                                <td style={styles.tableCell}>{product.quantity}</td>
                                <td
                                    style={{
                                        ...styles.tableCell,
                                        color: product.quantity < 5 ? 'red' : 'green',
                                    }}
                                >
                                    {product.quantity < 5 ? 'Low Stock' : 'Available'}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} style={styles.tableCell}>No products available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </section>
    );
};

const styles = {
    container: {
        fontFamily: '"Roboto", sans-serif',
        padding: '20px',
        backgroundColor: '#f4f4f4',
        maxWidth: '800px',
        margin: '20px auto',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    header: {
        textAlign: 'center',
        fontSize: '28px',
        color: '#333',
        marginBottom: '20px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '10px',
    },
    tableHeader: {
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '12px',
        fontSize: '16px',
        textAlign: 'left',
    },
    tableRow: {
        backgroundColor: '#fff',
        borderBottom: '1px solid #ddd',
    },
    tableCell: {
        padding: '12px',
        fontSize: '16px',
        textAlign: 'left',
        borderBottom: '1px solid #ddd',
    },
};

export default StockList;
