import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Contact from "./Contact";
import db from "../utils/firebase";
import { getAuth } from "@firebase/auth";
export default function ContactsList() {
    const [users, setUsers] = useState([]);
    // const [uid, setUid] = useState(null);
    const uid = getAuth().currentUser.uid;
    useEffect(() => {
        onSnapshot(collection(db, "users"), (querySnapshot) => {
            const _users = [];
            querySnapshot.forEach((doc) => {
                _users.push({ ...doc.data(), uid: doc.id });
            });
            setUsers([...users, ..._users]);
        });
    }, [db]);
    let lists = [];
    for (let _user of users) {
        const { isOnline, username, uid: _uid } = _user;
        if (uid !== _uid)
            lists.push(
                <Contact
                    key={_uid}
                    uid={_uid}
                    name={username}
                    status={isOnline}
                />
            );
    }

    return <div id="contacts--list">{lists}</div>;
}
