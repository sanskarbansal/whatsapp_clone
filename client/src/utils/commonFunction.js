// import { getDatabase, set, ref, child } from "@firebase/database";
import { doc, updateDoc } from "@firebase/firestore";
import db from "../utils/firebase";

export const setOnlineStatus = async (uid, online = true) => {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
        isOnline: online,
    });
    if (online === true && uid) {
        window.addEventListener("beforeunload", (e) => {
            setOnlineStatus(uid, false);
        });
    }
};
