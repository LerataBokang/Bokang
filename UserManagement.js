import React, { useState } from 'react';
import axios from 'axios';

const UserManagement = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        position: '',
        idNumber: '',
        phoneNumber: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.username) newErrors.username = "Username is required";
        if (!formData.password) newErrors.password = "Password is required";
        if (!formData.position) newErrors.position = "Position is required";
        if (!formData.idNumber) newErrors.idNumber = "ID Number is required";
        if (!formData.phoneNumber) newErrors.phoneNumber = "Phone Number is required";
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await axios.post('http://localhost:8081/api/MyUsers', {
                username: formData.username,
                password: formData.password, // Note: In a real application, hash passwords before storing!
                position: formData.position,
                idNumber: formData.idNumber,
                phoneNumber: formData.phoneNumber
            });
            alert('User added successfully: ' + response.data.username);
            setFormData({ username: '', password: '', position: '', idNumber: '', phoneNumber: '' });
        } catch (error) {
            console.error(error);
            alert('Error adding user: ' + (error.response?.data?.error || error.message));
        }
    };

    return (
        <section style={styles.container}>
            <h2 style={styles.header}>User Management</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input 
                    type="text" 
                    name="username" 
                    placeholder="Username" 
                    required 
                    value={formData.username} 
                    onChange={handleChange} 
                    style={styles.input} 
                />
                <span style={styles.errorMessage}>{errors.username}</span>

                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    required 
                    value={formData.password} 
                    onChange={handleChange} 
                    style={styles.input} 
                />
                <span style={styles.errorMessage}>{errors.password}</span>

                <input 
                    type="text" 
                    name="position" 
                    placeholder="Position" 
                    required 
                    value={formData.position} 
                    onChange={handleChange} 
                    style={styles.input} 
                />
                <span style={styles.errorMessage}>{errors.position}</span>

                <input 
                    type="text" 
                    name="idNumber" 
                    placeholder="ID Number" 
                    required 
                    value={formData.idNumber} 
                    onChange={handleChange} 
                    style={styles.input} 
                />
                <span style={styles.errorMessage}>{errors.idNumber}</span>

                <input 
                    type="text" 
                    name="phoneNumber" 
                    placeholder="Phone Number" 
                    required 
                    value={formData.phoneNumber} 
                    onChange={handleChange} 
                    style={styles.input} 
                />
                <span style={styles.errorMessage}>{errors.phoneNumber}</span>

                <button type="submit" style={styles.submitButton}>Add User</button>
            </form>
        </section>
    );
};

const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        maxWidth: '600px',
        margin: '40px auto',
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
    input: {
        padding: '10px',
        fontSize: '14px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        marginBottom: '10px',
        width: '100%',
    },
    errorMessage: {
        color: 'red',
        fontSize: '12px',
        marginBottom: '10px',
    },
    submitButton: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s',
        width: '100%',
    },
};

export default UserManagement;
