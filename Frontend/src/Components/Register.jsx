import React, { useState } from 'react';
import axios from 'axios';
import '../index.css';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        address_line1: '',
        address_line2: '',
        address_line3: '',
        city: '',
        state: '',
        pincode: '',
        country: '',
        telephone: ''
    });

    const [errors, setErrors] = useState({});
    const [submissionMessage, setSubmissionMessage] = useState('');

    const validateForm = (data) => {
        let errors = {};
    
        if (!data.first_name.trim()) {
            errors.first_name = 'First name is required';
        }
    
        if (!data.last_name.trim()) {
            errors.last_name = 'Last name is required';
        }
    
        if (!data.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = 'Email address is invalid';
        }
    
        if (!data.password.trim()) {
            errors.password = 'Password is required';
        } else if (data.password.length <= 8) {
            errors.password = 'Password must be longer than 8 characters';
        }
    
        if (!data.address_line1.trim()) {
            errors.address_line1 = 'Address Line 1 is required';
        }
    
        if (!data.city.trim()) {
            errors.city = 'City is required';
        }
    
        if (!data.state.trim()) {
            errors.state = 'State is required';
        }
    
        if (!data.pincode.trim()) {
            errors.pincode = 'Pincode is required';
        } else if (!/^\d{6}$/.test(data.pincode)) {
            errors.pincode = 'Pincode must be a 6-digit number';
        }
    
        if (!data.country.trim()) {
            errors.country = 'Country is required';
        }
    
        if (!data.telephone.trim()) {
            errors.telephone = 'Telephone is required';
        } else if (!/^\d{10}$/.test(data.telephone)) {
            errors.telephone = 'Telephone must be a 10-digit number';
        }
    
        return errors;
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm(formData);

        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await axios.post('http://localhost/AIZEN/Backend/Registerapi.php', formData);
                setSubmissionMessage(response.data.message);
                setFormData({
                    first_name: '',
                    last_name: '',
                    email: '',
                    password: '',
                    address_line1: '',
                    address_line2: '',
                    address_line3: '',
                    city: '',
                    state: '',
                    pincode: '',
                    country: '',
                    telephone: ''
                });
                setErrors({});
            } catch (error) {
                console.error('Registration error:', error);
                setSubmissionMessage('An error occurred during registration.');
            }
        } else {
            setErrors(validationErrors);
            setTimeout(() => {
                setErrors({});
            }, 1000);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
        <h2>Registration Form</h2>
        <div className="section">
            <h3>Personal Details</h3>
            <div className="form-group">
                <label>First Name:</label>
                <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                />
                {errors.first_name && <p className="error">{errors.first_name}</p>}
            </div>
            <div className="form-group">
                <label>Last Name:</label>
                <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                />
                {errors.last_name && <p className="error">{errors.last_name}</p>}
            </div>
            <div className="form-group">
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="form-group">
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                {errors.password && <p className="error">{errors.password}</p>}
            </div>
        </div>

        <div className="section">
            <h3>Contact Information</h3>
            <div className="form-group">
                <label>Address Line 1:</label>
                <input
                    type="text"
                    name="address_line1"
                    value={formData.address_line1}
                    onChange={handleChange}
                />
                {errors.address_line1 && <p className="error">{errors.address_line1}</p>}
            </div>
            <div className="form-group">
                <label>Address Line 2:</label>
                <input
                    type="text"
                    name="address_line2"
                    value={formData.address_line2}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label>Address Line 3:</label>
                <input
                    type="text"
                    name="address_line3"
                    value={formData.address_line3}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label>City:</label>
                <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                />
                {errors.city && <p className="error">{errors.city}</p>}
            </div>
            <div className="form-group">
                <label>State:</label>
                <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                />
                {errors.state && <p className="error">{errors.state}</p>}
            </div>
            <div className="form-group">
                <label>Pincode:</label>
                <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                />
                {errors.pincode && <p className="error">{errors.pincode}</p>}
            </div>
            <div className="form-group">
                <label>Country:</label>
                <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                />
                {errors.country && <p className="error">{errors.country}</p>}
            </div>
            <div className="form-group">
                <label>Telephone:</label>
                <input
                    type="text"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                />
            </div>
        </div>

        <button type="submit">Register</button>
        {submissionMessage && <p className="error">{submissionMessage}</p>}
    </form>
    );
};

export default RegistrationForm;
