import * as authApi from "$lib/apis/authApi.js";
import { browser } from "$app/environment";

const USER_KEY = "user";
const TOKEN_KEY = "token";

let user = $state(null);
let token = $state(null);

if (browser) {
    // Get user and token from localStorage
    const storedUser = localStorage.getItem(USER_KEY);
    const storedToken = localStorage.getItem(TOKEN_KEY);

    if (storedUser){
    user = JSON.parse(storedUser);
};

if (storedToken){
    token = storedToken;
};
};



const useAuthState = () => {
    return {
        get user() {
            return user;
        },
        get token() {
            return token;
        },
        login: async (email, password) => {
            // Fetch login response
            const response = await authApi.login({email, password});
            if (!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.error || "Login failed");
            }
            const receivedInfo = await response.json();

            // Save server response user object and token to app and localStorage
            user = receivedInfo.user;
            token = receivedInfo.token;
            localStorage.setItem("user", JSON.stringify(receivedInfo.user));
            localStorage.setItem("token", receivedInfo.token);

            return receivedInfo;
        },
        register: async (email, password) => {
            // Fetch register response
            const response = await authApi.register({email, password});

            if (!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.error || "Register failed");
            }
            const receivedInfo = await response.json();
            return receivedInfo;
        }, 
        logout: () => {
            // clear the user and token from app and localStorage
            user = null;
            token = null;

            localStorage.removeItem("user");
            localStorage.removeItem("token");
        },
    };
};

export { useAuthState };