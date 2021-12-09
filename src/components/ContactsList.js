import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Contact from "./Contact";
import db from "../utils/firebase";
export default function ContactsList() {
    const [users, setUsers] = useState({});
    useEffect(() => {
        onSnapshot(collection(db, "users"), (querySnapshot) => {
            const _users = [];
            querySnapshot.forEach((doc) => {
                _users.push({ ...doc.data(), uid: doc.id });
            });
            setUsers([..._users]);
        });
    }, []);
    let lists = [];
    for (let user in users) {
        const { isOnline, username } = users[user];
        lists.push(<Contact key={user} name={username} status={isOnline} />);
    }
    return <div id="contacts--list">{lists}</div>;
}
