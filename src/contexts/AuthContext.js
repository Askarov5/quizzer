import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateCurrentUser } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { auth } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export default function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function signin(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function signout() {
        return signOut(auth);
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email);
    }

    async function updateEmail(email){
        await updateEmail(auth.currentUser, email)
        .then(() => {
            return true;
        });
    }

    async function updatePassword(password) {
        await updatePassword(auth.currentUser, password)
        .then(() => {
            return true;
        });
    }  

    useEffect(() => {
        const unsubscibe = onAuthStateChanged(auth, (user) => {
            if(user){
                setCurrentUser(user);
                setLoading(false);
            }
        });
    })

    const value = {
        currentUser,
        signin,
        signup,
        signout, 
        resetPassword,
        updateEmail,
        updatePassword
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
