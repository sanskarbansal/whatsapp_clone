import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Contact from "./Contact";
import db from "../utils/firebase";
import { getAuth } from "@firebase/auth";
export default function ContactsList() {
    const [users, setUsers] = useState({});
    // const [uid, setUid] = useState(null);
    const uid = getAuth().currentUser.uid;
    useEffect(() => {
        (async () => {
            // let _users = [];
            let _users = {};
            const docs = await getDocs(collection(db, "users"));
            console.log(docs.docChanges());
            docs.forEach((doc) => {
                // _users.push({ ...doc.data(), uid: doc.id });
                _users[doc.id] = { ...doc.data(), uid: doc.id };
            });
            setUsers({ ..._users });
        })();
    }, []);
    // useEffect(() => {
    //     return onSnapshot(collection(db, "users"), (querySnapshot) => {
    //         const _users = { ...users };
    //         let flag = false;
    //         querySnapshot.docChanges().forEach((change) => {
    //             console.log(change.type);
    //             if (change.type === "modified") {
    //                 _users[change.doc.id] = {
    //                     ..._users[change.doc.id],
    //                     ...change.doc.data(),
    //                 };
    //                 flag = true;
    //             }
    //         });
    //         if (flag) setUsers({ ..._users });
    //     });
    // }, [users]);
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
