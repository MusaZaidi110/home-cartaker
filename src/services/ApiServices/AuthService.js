import api from "../common/apiAuth"


const AuthService = {
    validateUser: async (credentials) => {
        const response = await api.post('/auth/validate-user', credentials);
        return response;
    },

    createUserAuth: async (userData) => {
        const response = await api.post('/auth/create-user', userData);
        return response;
    },
}

export default AuthService;