import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Logo from '../assets/Logo.avif';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const [formValues, setFormValues] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    useEffect(() => {
        if (localStorage.getItem('user')) {
            navigate('/');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);

        if (Object.keys(formErrors).length === 0) {
            try {
                const response = await fetch('http://localhost:5000/api/users/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formValues),
                });

                const data = await response.json();
                if (response.ok) {
                    // Store session data (e.g., token) in local storage
                    localStorage.setItem('user', JSON.stringify(data));
                    // Redirect to the login page
                    navigate('/login');
                } else {
                    // Handle registration errors
                    setFormErrors({ server: data.message || 'Registration failed' });
                }
            } catch (error) {
                console.log('register error', error);
                setFormErrors({ server: 'Registration failed. Please try again.' });
            }
        }
    };

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
        }
    }, [formErrors, isSubmit]);

    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.username) {
            errors.username = 'Username is required!';
        }
        if (!values.email) {
            errors.email = 'Email is required!';
        } else if (!regex.test(values.email)) {
            errors.email = 'This is not a valid email format!';
        }
        if (!values.password) {
            errors.password = 'Password is required';
        } else if (values.password.length < 4) {
            errors.password = 'Password must be more than 4 characters';
        } else if (values.password.length > 10) {
            errors.password = 'Password cannot exceed more than 10 characters';
        }
        return errors;
    };

    return (
        <>
            <FormContainer>
                {Object.keys(formErrors).length === 0 && isSubmit ? (
                    <div className="ui message success" style={{ color: '#000000' }}>Signed in successfully</div>
                ) : null}

                <form onSubmit={handleSubmit}>
                    <div className="brand">
                        <img src={Logo} alt="Logo" />
                        <h1>snappy</h1>
                    </div>
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={formValues.username}
                        onChange={handleChange}
                    />
                    <p>{formErrors.username}</p>
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={formValues.email}
                        onChange={handleChange}
                    />
                    <p>{formErrors.email}</p>
                    
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formValues.password}
                        onChange={handleChange}
                    />
                    
                    <p>{formErrors.password}</p>
                    <button type="submit">Create User</button>
                    <span>Already have an account? <Link to="/login" style={{ color: '#4e0eff' }}>Login</Link></span>
                </form>
                {formErrors.server && <p>{formErrors.server}</p>}
            </FormContainer>
        </>
    );
}

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #ADD8E6;
    .brand {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        img {
            height: 5rem;
        }
        h1 {
            color: white;
            text-transform: uppercase;
        }
    }
    form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        background-color:  #6CACE4;
        border-radius: 2rem;
        padding: 3rem 5rem;
        input {
            background-color: transparent;
            padding: 0.99rem;
            border: 0.1rem solid #4e0eff;
            border-radius: 0.4rem;
            color: #000000;
            width: 100%;
            font-size: 1rem;
            &:focus {
                border: 0.1rem solid #997af0;
                outline: none;
            }
        }
        
         
      
        button {
            background-color: #997af0;
            color: white;
            padding: 1rem 2rem;
            border: none;
            font-weight: bold;
            cursor: pointer;
            border-radius: 0.4rem;
            text-transform: uppercase;
            transition: 0.5s ease-in-out;
            &:hover {
                background-color: #4e0eff;
            }
        }
        span {
            color: white;
            text-transform: uppercase;
            a {
                color: white;
                text-decoration: none;
                font-weight: bold;
            }
        }
    }
    p {
        color: #000000;
    }
`;

export default Register;
