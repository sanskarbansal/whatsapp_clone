import { doc, updateDoc } from "@firebase/firestore";
import React, { useEffect } from "react";
import db from "../utils/firebase";

export default function Message({ to, from, content, id, uid, status }) {
    let iAmOwner = from === uid;
    useEffect(() => {
        (async () => {
            if (status !== 3 && !iAmOwner) {
                const messageRef = doc(db, "messages", id);
                await updateDoc(messageRef, {
                    status: 3,
                });
            }
        })();
    }, [iAmOwner, status, id]);
    const ticks = [];
    for (let i = 1; i <= status; i++) {
        ticks.push(<i key={i} className="fa fa-check" aria-hidden="true"></i>);
    }
    return (
        <div className={`${!iAmOwner ? "incoming" : "outgoing"}`}>
            {iAmOwner && ticks}
            <div className="bubble">
                <p>{content}</p>
            </div>
        </div>
    );
}
