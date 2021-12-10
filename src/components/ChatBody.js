import React, { useEffect, useRef, useState } from "react";
import { useParams, useLocation } from "react-router";
import {
    collection,
    addDoc,
    onSnapshot,
    query,
    where,
    Timestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import db from "../utils/firebase";
import MessageList from "./MessageList";
import ChatBodyHead from "./ChatBodyHead";
export default function ChatBody() {
    const params = useParams();
    const [message, setMessage] = useState("");
    const [sentMessages, setSentMessages] = useState([]);
    const [receivedMessages, setReceivedMessages] = useState([]);
    const currentUser = getAuth().currentUser;
    useEffect(() => {
        const messagesRef = collection(db, "messages");
        const uid = currentUser.uid;
        const q1 = query(
            messagesRef,
            where("from", "==", params.userId),
            where("to", "==", uid)
        );
        const q2 = query(
            messagesRef,
            where("to", "==", params.userId),
            where("from", "==", uid)
        );

        const u1 = onSnapshot(q1, (querySnapshot) => {
            const _msgs = [];
            querySnapshot.forEach((doc) => {
                _msgs.push({ ...doc.data(), id: doc.id });
            });
            setSentMessages([..._msgs]);
        });
        const u2 = onSnapshot(q2, (querySnapshot) => {
            const _msgs = [];
            querySnapshot.forEach((doc) => {
                _msgs.push({ ...doc.data(), id: doc.id });
            });
            setReceivedMessages([..._msgs]);
        });
        return () => {
            u1();
            u2();
        };
    }, [params, currentUser]);

    const handleChange = (event) => {
        setMessage(event.target.value);
    };
    const sendMessage = async (event) => {
        event.preventDefault();
        setMessage("");
        const uid = getAuth().currentUser.uid;
        await addDoc(collection(db, "messages"), {
            from: uid,
            to: params.userId,
            content: message,
            status: 1,
            _ts: Timestamp.now(),
        });
    };
    return (
        <>
            <ChatBodyHead userId={params.userId} />
            <div className="container">
                <MessageList
                    currentUser={currentUser}
                    sentMessages={sentMessages}
                    receivedMessages={receivedMessages}
                />
            </div>
            <div className="foot">
                <div className="icon">
                    <i className="far fa-smile"></i>
                </div>
                <div className="icon">
                    <i className="fas fa-paperclip"></i>
                </div>
                <form onSubmit={sendMessage}>
                    <input
                        value={message}
                        onChange={handleChange}
                        type="text"
                        className="msg"
                        placeholder="Type a message..."
                    />
                    <button type="submit">
                        <i className="fas fa-paper-plane"></i>
                    </button>
                </form>
            </div>
        </>
    );
}
