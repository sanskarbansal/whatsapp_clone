import { doc, onSnapshot } from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import db from "../utils/firebase";

export default function ChatBodyHead({ userId }) {
    const [user, setUser] = useState({});
    useEffect(() => {
        onSnapshot(doc(db, "users", userId), (doc) => {
            setUser({ ...doc.data() });
        });
    }, [userId]);
    return (
        <div className="head">
            <div className="user">
                <div className="avatar">
                    <img src="https://picsum.photos/g/40/40" alt="person" />
                </div>
                <div className="name">
                    <span>{user.phone}</span>
                    <br />
                    <span
                        style={{
                            display: "inline-block",
                            transition: "all 1s ease-in",
                        }}
                    >
                        {user.isOnline ? "Online" : ""}
                    </span>
                </div>
            </div>
            <ul className="bar_tool">
                <li>
                    <span className="alink">
                        <i className="fas fa-phone"></i>
                    </span>
                </li>
                <li>
                    <span className="alink">
                        <i className="fas fa-video"></i>
                    </span>
                </li>
                <li>
                    <span className="alink">
                        <i className="fas fa-ellipsis-v"></i>
                    </span>
                </li>
            </ul>
        </div>
    );
}
