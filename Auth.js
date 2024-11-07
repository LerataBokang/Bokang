import React, { useState } from 'react';

const Auth = ({ onLogin }) => {
    const [isSignUp, setIsSignUp] = useState(false);
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
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.username) newErrors.username = "Username is required";
        if (!formData.password) newErrors.password = "Password is required";
        if (isSignUp) {
            if (!formData.position) newErrors.position = "Position is required";
            if (!formData.idNumber) newErrors.idNumber = "ID Number is required";
            if (!formData.phoneNumber) newErrors.phoneNumber = "Phone Number is required";
        }
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        if (isSignUp) {
            const users = JSON.parse(localStorage.getItem("users")) || [];
            if (users.find(user => user.idNumber === formData.idNumber)) {
                alert('User with this ID number already exists.');
                return;
            }
            users.push(formData);
            localStorage.setItem("users", JSON.stringify(users));
            alert('Account created successfully');
            setIsSignUp(false);
        } else {
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const user = users.find(u => u.username === formData.username && u.password === formData.password);
            if (user) {
                onLogin();
            } else {
                alert('Invalid username or password');
            }
        }
    };

    return (
        <section style={styles.authSection}>
            <h2 style={styles.header}>{isSignUp ? "Sign Up" : "Login"}</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.inputContainer}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        style={{ ...styles.input, borderColor: errors.username ? 'red' : '#ccc' }}
                    />
                    <span style={styles.errorMessage}>{errors.username}</span>
                </div>
                <div style={styles.inputContainer}>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        style={{ ...styles.input, borderColor: errors.password ? 'red' : '#ccc' }}
                    />
                    <span style={styles.errorMessage}>{errors.password}</span>
                </div>
                {isSignUp && (
                    <>
                        <div style={styles.inputContainer}>
                            <input
                                type="text"
                                name="position"
                                placeholder="Position"
                                value={formData.position}
                                onChange={handleChange}
                                style={{ ...styles.input, borderColor: errors.position ? 'red' : '#ccc' }}
                            />
                            <span style={styles.errorMessage}>{errors.position}</span>
                        </div>
                        <div style={styles.inputContainer}>
                            <input
                                type="text"
                                name="idNumber"
                                placeholder="ID Number"
                                value={formData.idNumber}
                                onChange={handleChange}
                                style={{ ...styles.input, borderColor: errors.idNumber ? 'red' : '#ccc' }}
                            />
                            <span style={styles.errorMessage}>{errors.idNumber}</span>
                        </div>
                        <div style={styles.inputContainer}>
                            <input
                                type="text"
                                name="phoneNumber"
                                placeholder="Phone Number"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                style={{ ...styles.input, borderColor: errors.phoneNumber ? 'red' : '#ccc' }}
                            />
                            <span style={styles.errorMessage}>{errors.phoneNumber}</span>
                        </div>
                    </>
                )}
                <button type="submit" style={styles.submitButton}>{isSignUp ? "Create Account" : "Login"}</button>
                <p style={styles.toggleText}>
                    {isSignUp ? "Already have an account? " : "Don't have an account? "}
                    <button type="button" onClick={() => setIsSignUp(!isSignUp)} style={styles.toggleButton}>
                        {isSignUp ? "Login" : "Sign Up"}
                    </button>
                </p>
            </form>
        </section>
    );
};

// Styles
const styles = {
    authSection: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#f7f7f7',
        padding: '20px',
    },
    header: {
        fontSize: '24px',
        marginBottom: '20px',
        color: '#333',
    },
    form: {
        width: '100%',
        maxWidth: '400px',
        background: '#fff',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    },
    inputContainer: {
        marginBottom: '15px',
        position: 'relative',
    },
    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '16px',
        transition: 'border-color 0.3s ease',
    },
    errorMessage: {
        color: 'red',
        fontSize: '12px',
        position: 'absolute',
        bottom: '-18px',
        left: '0',
    },
    submitButton: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#4CAF50',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    submitButtonHover: {
        backgroundColor: '#45a049',
    },
    toggleText: {
        textAlign: 'center',
        marginTop: '20px',
    },
    toggleButton: {
        background: 'none',
        border: 'none',
        color: '#007BFF',
        cursor: 'pointer',
        textDecoration: 'underline',
    },
};

export default Auth;
