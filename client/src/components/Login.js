import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
export default function Register() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const handleChange = (attr) => {
        return (e) => {
            setUser((prevState) => ({
                ...prevState,
                [attr]: e.target.value,
            }));
        };
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const auth = getAuth();
            await signInWithEmailAndPassword(auth, user.email, user.password);
            navigate("/dashboard");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div id="login">
            <form onSubmit={handleSubmit}>
                <legend>Login</legend>
                <label>Email</label> <br />
                <input
                    type="text"
                    id="email"
                    onChange={handleChange("email")}
                    value={user["email"]}
                    required
                />
                <br />
                <label>Password</label> <br />
                <input
                    type="password"
                    id="password"
                    onChange={handleChange("password")}
                    value={user["password"]}
                    required
                />
                <br />
                <button>Login</button>
            </form>
        </div>
    );
}
