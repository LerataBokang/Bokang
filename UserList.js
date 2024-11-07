import React, { useState, useEffect } from 'react';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({ name: '', idNumber: '', phoneNumber: '', position: '' });

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        setUsers(storedUsers);
    }, []);

    const handleDelete = (idNumber) => {
        const updatedUsers = users.filter(u => u.idNumber !== idNumber);
        setUsers(updatedUsers);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        alert('User deleted successfully');
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setFormData({ 
            name: user.name, 
            idNumber: user.idNumber, 
            phoneNumber: user.phoneNumber, 
            position: user.position 
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedUsers = users.map(user => 
            user.idNumber === editingUser.idNumber ? { ...user, ...formData } : user
        );
        setUsers(updatedUsers);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        setEditingUser(null); // Close the edit form
        alert('User updated successfully');
    };

    const handleCancelEdit = () => {
        setEditingUser(null); // Cancel editing
    };

    return (
        <section style={styles.container}>
            <h2 style={styles.header}>List of Users</h2>
            {editingUser ? (
                <form onSubmit={handleSubmit} style={styles.form}>
                    <h3 style={styles.formHeader}>Edit User</h3>
                    <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        placeholder="Name" 
                        required 
                        style={styles.input}
                    />
                    <input 
                        type="text" 
                        name="idNumber" 
                        value={formData.idNumber} 
                        onChange={handleChange} 
                        placeholder="ID Number" 
                        required 
                        disabled 
                        style={styles.inputDisabled}
                    />
                    <input 
                        type="text" 
                        name="phoneNumber" 
                        value={formData.phoneNumber} 
                        onChange={handleChange} 
                        placeholder="Phone Number" 
                        required 
                        style={styles.input}
                    />
                    <input 
                        type="text" 
                        name="position" 
                        value={formData.position} 
                        onChange={handleChange} 
                        placeholder="Position" 
                        required 
                        style={styles.input}
                    />
                    <div style={styles.buttonGroup}>
                        <button type="submit" style={styles.button}>Save</button>
                        <button type="button" onClick={handleCancelEdit} style={styles.cancelButton}>Cancel</button>
                    </div>
                </form>
            ) : (
                <table style={styles.table}>
                    <thead>
                        <tr style={styles.tableHeader}>
                            <th style={styles.tableCell}>Name</th>
                            <th style={styles.tableCell}>ID Number</th>
                            <th style={styles.tableCell}>Phone Number</th>
                            <th style={styles.tableCell}>Position</th>
                            <th style={styles.tableCell}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.idNumber} style={styles.tableRow}>
                                <td style={styles.tableCell}>{user.name}</td>
                                <td style={styles.tableCell}>{user.idNumber}</td>
                                <td style={styles.tableCell}>{user.phoneNumber}</td>
                                <td style={styles.tableCell}>{user.position}</td>
                                <td style={styles.tableCell}>
                                    <button onClick={() => handleEdit(user)} style={styles.editButton}>Edit</button>
                                    <button onClick={() => handleDelete(user.idNumber)} style={styles.deleteButton}>Delete</button>
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
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        maxWidth: '800px',
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
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    formHeader: {
        fontSize: '20px',
        color: '#333',
        marginBottom: '10px',
        textAlign: 'center',
    },
    input: {
        padding: '8px',
        fontSize: '14px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        marginBottom: '10px',
    },
    inputDisabled: {
        padding: '8px',
        fontSize: '14px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        marginBottom: '10px',
        backgroundColor: '#f0f0f0',
        cursor: 'not-allowed',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'space-between',
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
    cancelButton: {
        padding: '10px 20px',
        backgroundColor: '#6c757d',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
    },
    tableHeader: {
        backgroundColor: '#f1f1f1',
        textAlign: 'left',
    },
    tableCell: {
        padding: '12px',
        borderBottom: '1px solid #ddd',
    },
    tableRow: {
        backgroundColor: '#fff',
    },
    editButton: {
        padding: '6px 12px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        marginRight: '8px',
    },
    deleteButton: {
        padding: '6px 12px',
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
    },
};

export default UserList;
