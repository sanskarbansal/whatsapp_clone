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
    if (status === 1) {
        ticks.push(<i key={0} className="fa fa-check" aria-hidden="true"></i>);
    } else if (status === 2 || status === 3) {
        ticks.push(
            <i
                key={1}
                className={`fa fa-check ${status === 3 ? "blue-tick" : ""}`}
                aria-hidden="true"
            ></i>
        );
        ticks.push(
            <i
                style={{
                    position: "relative",
                    top: "6px",
                    left: "-15px",
                }}
                key={1}
                className={`fa fa-check ${status === 3 ? "blue-tick" : ""}`}
                aria-hidden="true"
            ></i>
        );
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
