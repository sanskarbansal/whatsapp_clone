import React, { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { setOnlineStatus } from "../utils/commonFunction";
import ContactsList from "./ContactsList";

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
    return (
        <section id="chat_body">
            {/* <button onClick={signoutHandler}>Logout</button> */}
            <div id="contacts--list__container">
                <ContactsList />
            </div>
            <div id="chat__body"></div>
        </section>
    );
}
