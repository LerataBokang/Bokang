import React, { useState, useEffect } from 'react';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        description: '',
        category: '',
        price: '',
        quantity: ''
    });

    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
        setProducts(storedProducts);
    }, []);

    const handleEditClick = (product) => {
        setEditingProduct(product.id);
        setFormData({ ...product }); // Pre-fill the form
    };

    const handleDelete = (id) => {
        const updatedProducts = products.filter(p => p.id !== id);
        setProducts(updatedProducts);
        localStorage.setItem("products", JSON.stringify(updatedProducts));
        alert('Product deleted successfully');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        const updatedProducts = products.map(product => 
            product.id === formData.id ? formData : product
        );
        setProducts(updatedProducts);
        localStorage.setItem("products", JSON.stringify(updatedProducts));
        alert('Product updated successfully');
        setEditingProduct(null); // Exit edit mode
        setFormData({ id: '', name: '', description: '', category: '', price: '', quantity: '' }); // Reset form
    };

    const handleCancelEdit = () => {
        setEditingProduct(null);
        setFormData({ id: '', name: '', description: '', category: '', price: '', quantity: '' });
    };

    return (
        <section style={styles.container}>
            <h2 style={styles.header}>List of Products</h2>

            {editingProduct ? (
                <form onSubmit={handleEditSubmit} style={styles.form}>
                    <h3>Edit Product</h3>
                    <input type="hidden" name="id" value={formData.id} />
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                        style={styles.input}
                    />
                    <input 
                        type="text" 
                        name="description" 
                        placeholder="Description" 
                        value={formData.description} 
                        onChange={handleChange} 
                        required 
                        style={styles.input}
                    />
                    <input 
                        type="text" 
                        name="category" 
                        placeholder="Category" 
                        value={formData.category} 
                        onChange={handleChange} 
                        required 
                        style={styles.input}
                    />
                    <input 
                        type="number" 
                        name="price" 
                        placeholder="Price" 
                        value={formData.price} 
                        onChange={handleChange} 
                        required 
                        style={styles.input}
                    />
                    <input 
                        type="number" 
                        name="quantity" 
                        placeholder="Quantity" 
                        value={formData.quantity} 
                        onChange={handleChange} 
                        required 
                        style={styles.input}
                    />
                    <button type="submit" style={styles.button}>Update Product</button>
                    <button type="button" onClick={handleCancelEdit} style={styles.cancelButton}>Cancel</button>
                </form>
            ) : (
                <table style={styles.table}>
                    <thead>
                        <tr style={styles.tableHeader}>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id} style={styles.tableRow}>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>{product.category}</td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                                <td>
                                    <button onClick={() => handleEditClick(product)} style={styles.editButton}>Edit</button>
                                    <button onClick={() => handleDelete(product.id)} style={styles.deleteButton}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </section>
    );
};

const styles = {
    container: {
        fontFamily: '"Roboto", sans-serif',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    header: {
        fontSize: '32px',
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333',
    },
    form: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '400px',
        margin: '0 auto',
    },
    input: {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '16px',
    },
    button: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#28a745',
        color: '#fff',
        fontSize: '16px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginBottom: '10px',
    },
    cancelButton: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#dc3545',
        color: '#fff',
        fontSize: '16px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    tableHeader: {
        backgroundColor: '#007BFF',
        color: '#fff',
        textAlign: 'center',
        fontSize: '18px',
    },
    tableRow: {
        textAlign: 'center',
        fontSize: '16px',
        borderBottom: '1px solid #ddd',
    },
    editButton: {
        backgroundColor: '#ffc107',
        color: '#fff',
        padding: '6px 12px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginRight: '10px',
    },
    deleteButton: {
        backgroundColor: '#dc3545',
        color: '#fff',
        padding: '6px 12px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default ProductList;
