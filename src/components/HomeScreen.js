import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./Auth";
import Login from "./Login";
import Register from "./Register";
export default function HomeScreen() {
    const { currentUser } = useContext(AuthContext);
    if (currentUser) {
        return <Navigate to="/dashboard" />;
    }
    return (
        <main>
            <h1>Welcome to CometChat WhatsApp</h1>
            <section id="auth_forms">
                <Register />
                <Login />
            </section>
        </main>
    );
}
