import React, { useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { setOnlineStatus } from "../utils/commonFunction";
import ContactsList from "./ContactsList";
import { Route, Routes } from "react-router";
import socketIOClient from "socket.io-client";

import ChatBody from "./ChatBody";
import {
    collection,
    onSnapshot,
    query,
    where,
    writeBatch,
} from "@firebase/firestore";
import db from "../utils/firebase";

export default function DashboardScreen() {
    const signoutHandler = () => {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        const uid = currentUser.uid;
        signOut(auth)
            .then(() => {
                setOnlineStatus(uid, false);
            })
            .catch((error) => {
                alert("Error while signout");
            });
    };

    useEffect(() => {
        const uid = getAuth().currentUser.uid;

        const unsubscribe = onSnapshot(
            query(
                collection(db, "messages"),
                where("to", "==", uid),
                where("status", "==", 1)
            ),
            async (snapshot) => {
                const batch = writeBatch(db);
                snapshot.forEach(async (doc) => {
                    batch.update(doc.ref, {
                        status: 2,
                    });
                });
                await batch.commit();
            }
        );
        window.addEventListener("beforeunload", unsubscribe);
        return unsubscribe;
    }, []);
    useEffect(() => {
        const url = window.location.host;
        const uid = getAuth().currentUser.uid;
        const socket = socketIOClient(url);
        socket.emit("joined", uid);
    }, []);
    return (
        <section id="chat_body">
            <div id="contacts--list__container">
                <div
                    className="signout__btn"
                    style={{
                        color: "white",
                        display: "flex",
                        justifyContent: "center",
                        padding: "10px 0px",
                        borderBottom: "1px solid white",
                        fontSize: "30px",
                        cursor: "pointer",
                    }}
                    onClick={signoutHandler}
                >
                    <i class="fas fa-sign-out-alt"></i>
                </div>
                <ContactsList />
            </div>
            <div id="chat__body">
                <Routes>
                    <Route path=":userId" element={<ChatBody />} />
                </Routes>
            </div>
        </section>
    );
}
