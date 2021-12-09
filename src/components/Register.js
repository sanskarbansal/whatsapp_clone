import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

function writeUserData(userId, name, email, phone) {
    const db = getDatabase();
    set(ref(db, "users/" + userId), {
        username: name,
        email: email,
        phone: phone,
    });
}

export default function Register() {
    const [user, setUser] = useState({
        email: "",
        username: "",
        phone: 0,
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
            const userCredentials = await createUserWithEmailAndPassword(
                auth,
                user.email,
                user.password
            );
            const {
                user: { uid, email },
            } = userCredentials;
            writeUserData(uid, user.username, email, user.phone);
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
            console.log(errorCode);
        }
    };
    return (
        <div id="register">
            <form onSubmit={handleSubmit}>
                <legend>Register</legend>
                <label>Phone Number</label> <br />
                <input
                    type="number"
                    onChange={handleChange("phone")}
                    value={user["phone"]}
                    required
                />{" "}
                <br />
                <label>username</label> <br />
                <input
                    type="text"
                    id="username"
                    onChange={handleChange("username")}
                    value={user["username"]}
                    required
                />
                <br />
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
                <button type="submit">Register</button>
            </form>
        </div>
    );
}
