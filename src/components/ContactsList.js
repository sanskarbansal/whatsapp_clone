import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Contact from "./Contact";
import db from "../utils/firebase";
import { getAuth } from "@firebase/auth";
export default function ContactsList() {
    const [users, setUsers] = useState({});
    const uid = getAuth().currentUser.uid;
    useEffect(() => {
        (async () => {
            let _users = {};
            const docs = await getDocs(collection(db, "users"));
            console.log(docs.docChanges());
            docs.forEach((doc) => {
                _users[doc.id] = { ...doc.data(), uid: doc.id };
            });
            setUsers({ ..._users });
        })();
    }, []);

    let lists = [];
    for (let _user in users) {
        const { isOnline, username, uid: _uid } = users[_user];
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
