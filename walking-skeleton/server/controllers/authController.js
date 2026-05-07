import { hash, verify } from "scrypt";
import * as jwt from "@hono/hono/jwt";
import * as authRepository from "../repositories/authRepository.js";

const JWT_SECRET = "jwt_secret";

const register = async (c) => {
    let newUser = {};
    let email = "";
    try {
        const user = await c.req.json();
        email = user.email;
        // Check for missing input
        if (!user.password || !user.email){
            return c.json({ message: `Confirmation email sent to address ${user.email}.`});
        };
        // Hash password and save in database
        user.password_hash = hash(user.password);
        newUser = await authRepository.create(user);
        
    } catch (error){
        console.error("Register failure", error.message);
    };
        
    return c.json({
            message: `Confirmation email sent to address ${email}.`,
            user: { id: newUser.id, email: newUser.email},
        });
  
};


const login = async (c) => {
    
// Get user object from client input
const user = await c.req.json();

// Get user from database
const foundUser = await authRepository.findByEmail(user.email);
if (!foundUser){
    return c.json({ error: "Incorrect email or password."}, 401);
};
// Verify the password
const isValid = await verify(user.password, foundUser.password_hash);
if (!isValid){
    return c.json({ error: "Incorrect email or password."}, 401);
};
// Get user roles
//const roles = await authRepository.getUserRoles(foundUser.id);
const payload = { id: Number(foundUser.id), email: foundUser.email,  exp:Math.floor(Date.now() / 1000) + 60};
const token = await jwt.sign(payload, JWT_SECRET);

// Sent the payload with user id, email, roles in user object
return c.json({
    message: "Login successful!",
    user: payload,
    token
});

};

export { register, login };
