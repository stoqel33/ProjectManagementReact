import { authApi } from 'apis/auth';
import axios from 'axios';

// Register user
const register = async (userData) => {
    const response = await axios.post(authApi.register, userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
};

// Login user
const login = async (userData) => {
    try {
        const response = await axios.post(authApi.login, userData);
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
};

// Logout user
const logout = () => {
    localStorage.removeItem('user');
};

const authService = {
    register,
    logout,
    login,
};

export default authService;
