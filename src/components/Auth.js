import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { setOnlineStatus } from "../utils/commonFunction";
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                setCurrentUser(user);
                setOnlineStatus(uid, true);
                setPending(false);
            } else {
                setCurrentUser(null);
                setPending(false);
            }
        });
    }, []);

    if (pending) {
        return <>Loading...</>;
    }

    return (
        <AuthContext.Provider
            value={{
                currentUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
