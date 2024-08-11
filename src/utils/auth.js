// utils/auth.js

// Set the token and optionally user data
export const setAuthToken = (token, user) => {
    if (token) {
        localStorage.setItem('token', token);
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        }
    } else {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
};

// Get the JWT token from local storage
export const getAuthToken = () => {
    return localStorage.getItem('token');
};

// Get the user data from local storage
export const getUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

// Check if the user is authenticated
export const isAuthenticated = () => {
    return !!getAuthToken();
};
