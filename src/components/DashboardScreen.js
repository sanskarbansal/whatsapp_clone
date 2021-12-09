import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function DashboardScreen() {
    const navigate = useNavigate();
    const signoutHandler = () => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                // navigate("/", { replace: true });
            })
            .catch((error) => {
                alert("Error while signout");
            });
    };
    return (
        <section id="chat_body">
            <button onClick={signoutHandler}>Logout</button>
            <div>
                <input type="tel" required />
                <button>Add Friend</button>
            </div>

            <div style={{ width: "95vw", height: "500px" }}></div>
        </section>
    );
}
