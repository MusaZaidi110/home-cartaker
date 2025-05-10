import api from "../common/apiAuth"


const AuthService = {
    validateUser: async (credentials) => {
        const response = await api.post('/auth/validate-user', credentials);
        return response;
    }
}

export default AuthService;