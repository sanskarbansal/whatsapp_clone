import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";

export default function MessageList({
    sentMessages,
    receivedMessages,
    currentUser,
}) {
    const [messages, setMessages] = useState([]);
    const chatBoxRef = useRef(null);

    useEffect(() => {
        chatBoxRef.current.scrollBy(0, chatBoxRef.current.scrollHeight);
    }, [messages]);
    useEffect(() => {
        setMessages(
            [...sentMessages, ...receivedMessages].sort((a, b) => {
                if (a._ts.toDate() > b._ts.toDate()) return 1;
                return -1;
            })
        );
    }, [sentMessages, receivedMessages]);
    return (
        <div className="chat_box" ref={chatBoxRef}>
            <div className="body">
                {messages.map((msg) => (
                    <Message key={msg.id} {...msg} uid={currentUser.uid} />
                ))}
            </div>
        </div>
    );
}
