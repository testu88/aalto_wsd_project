import {  browser } from "$app/environment";
import { useAuthState } from "$lib/states/authState.svelte.js";

const authState = useAuthState();

// Make authenticated requests
const authFetch = async (url, options={}) => {
    if (!browser){
        throw new Error("Authenticated fetch can only be used in the browser");
    }

    // Retrieve token from state
    const token = authState.token;
    if (!token){
        throw new Error("No authentication token found");
    }

    // Add token to Authorization header
    const headers = {
        ...options.headers,
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    // Make the request
    const response = await fetch(url, {
        ...options,
        headers,
    });

    // If unauthorized, logout user and redirect to login page
    if (response.status === 401){
        // invalid or expired token
        authState.logout();
        window.location.href="/auth/login";
        throw new Error("Invalid or expired token");
    };

    return response;

};

export { authFetch };