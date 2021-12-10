import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
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
export default function ChatBody() {
    const params = useParams();
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [sentMessages, setSentMessages] = useState([]);
    const [receivedMessages, setReceivedMessages] = useState([]);
    const uid = getAuth().currentUser.uid;
    const chatBoxRef = useRef(null);
    useEffect(() => {
        const messagesRef = collection(db, "messages");
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
    }, [params, uid]);
    useEffect(() => {
        setMessages(
            [...sentMessages, ...receivedMessages].sort((a, b) => {
                if (a._ts.toDate() > b._ts.toDate()) return 1;
                return -1;
            })
        );
    }, [sentMessages, receivedMessages]);
    useEffect(() => {
        chatBoxRef.current.scrollBy(0, chatBoxRef.current.scrollHeight);
    }, [messages]);

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
            <div className="head">
                <div className="user">
                    <div className="avatar">
                        <img src="https://picsum.photos/g/40/40" />
                    </div>
                    <div className="name">{params.userId}</div>
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
            <div className="container">
                <div className="chat_box" ref={chatBoxRef}>
                    <div className="body">
                        {messages.map(({ from, to, content, status, id }) => (
                            <div
                                key={id}
                                className={`${
                                    from !== uid ? "incoming" : "outgoing"
                                }`}
                            >
                                <div className="bubble">
                                    <p>{content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="foot">
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
