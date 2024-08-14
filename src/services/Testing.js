import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

const testing = async (data) => {
    const user = auth.currentUser;
    if (user) {
        const userRef = doc(db, "users", user.uid); // Create a reference to the user's document
        await setDoc(userRef, data, { merge: true }); // Store data, merging with existing document
    } else {
        console.log("No user is signed in");
    }
};

