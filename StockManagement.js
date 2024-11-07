import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const StockManagement = () => {
    const navigate = useNavigate(); // Use useNavigate hook
    const [formData, setFormData] = useState({
        productName: '', // Store product name instead of ID
        action: 'add',
        quantity: ''
    });
    const [errors, setErrors] = useState({});
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Load products from local storage on component mount
        const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
        setProducts(storedProducts);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.productName) newErrors.productName = "Product Name is required";
        if (!formData.quantity || isNaN(formData.quantity)) newErrors.quantity = "Valid quantity is required";
        return newErrors;
    };

    const handleUpdateStock = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const product = products.find(p => p.name === formData.productName);

        if (!product) {
            alert("Product not found");
            return;
        }

        const quantityChange = parseInt(formData.quantity);
        const currentDate = new Date().toLocaleString();

        if (formData.action === 'add') {
            product.quantity += quantityChange;
            // Log transaction
            logTransaction(product.name, quantityChange, 'add', currentDate);
        } else if (formData.action === 'deduct') {
            if (product.quantity < quantityChange) {
                alert("Not enough stock to deduct");
                return;
            }
            product.quantity -= quantityChange;
            // Log transaction
            logTransaction(product.name, quantityChange, 'deduct', currentDate);
        }

        // Update the products in local storage
        localStorage.setItem("products", JSON.stringify(products));
        alert('Stock updated successfully');
    };

    const logTransaction = (productName, quantityChanged, action, date) => {
        const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
        transactions.push({ productName, quantityChanged, action, date });
        localStorage.setItem("transactions", JSON.stringify(transactions));
    };

    const handleViewStock = () => {
        navigate('/stock-list'); // Use navigate to go to Stock List
    };

    return (
        <section style={styles.container}>
            <h2 style={styles.header}>Stock Selling or Adding</h2>
            <form onSubmit={handleUpdateStock} style={styles.form}>
                <div style={styles.formGroup}>
                    <label htmlFor="productName" style={styles.label}>Product Name:</label>
                    <select 
                        name="productName" 
                        value={formData.productName} 
                        onChange={handleChange} 
                        style={styles.select}>
                        <option value="" disabled>Select Product</option>
                        {products.map(product => (
                            <option key={product.id} value={product.name}>{product.name}</option>
                        ))}
                    </select>
                    {errors.productName && <span style={styles.errorMessage}>{errors.productName}</span>}
                </div>

                <div style={styles.formGroup}>
                    <label htmlFor="action" style={styles.label}>Action:</label>
                    <select 
                        name="action" 
                        value={formData.action} 
                        onChange={handleChange} 
                        style={styles.select}>
                        <option value="add">Add Stock</option>
                        <option value="deduct">Deduct Stock</option>
                    </select>
                </div>

                <div style={styles.formGroup}>
                    <label htmlFor="quantity" style={styles.label}>Quantity:</label>
                    <input 
                        type="number" 
                        name="quantity" 
                        placeholder="Quantity" 
                        required 
                        value={formData.quantity} 
                        onChange={handleChange} 
                        style={styles.input} 
                    />
                    {errors.quantity && <span style={styles.errorMessage}>{errors.quantity}</span>}
                </div>

                <div style={styles.buttonGroup}>
                    <button type="submit" style={styles.button}>Update Stock</button>
                </div>
            </form>

            <div style={styles.buttonGroup}>
                <button onClick={handleViewStock} style={styles.secondaryButton}>View Stock</button>
            </div>
        </section>
    );
};

const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '600px',
        margin: '20px auto',
    },
    header: {
        textAlign: 'center',
        fontSize: '24px',
        color: '#333',
        marginBottom: '20px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
    },
    label: {
        fontSize: '14px',
        color: '#333',
    },
    select: {
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '14px',
    },
    input: {
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '14px',
    },
    errorMessage: {
        color: 'red',
        fontSize: '12px',
        marginTop: '5px',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s',
    },
    secondaryButton: {
        padding: '10px 20px',
        backgroundColor: '#6c757d',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s',
    },
    buttonHover: {
        backgroundColor: '#0056b3',
    },
};

export default StockManagement;
