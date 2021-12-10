import { doc, getDoc } from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import db from "../utils/firebase";

export default function ChatBodyHead({ userId }) {
    const [user, setUser] = useState({});
    useEffect(() => {
        (async () => {
            const _user = (await getDoc(doc(db, "users", userId))).data();
            setUser({ ..._user });
        })();
    }, [userId]);
    return (
        <div className="head">
            <div className="user">
                <div className="avatar">
                    <img src="https://picsum.photos/g/40/40" alt="person" />
                </div>
                <div className="name">{user.phone}</div>
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
