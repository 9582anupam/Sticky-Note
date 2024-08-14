import { ref, set, remove } from "firebase/database";
import { auth, db } from "./firebase";

// Initialize Firebase Auth and Database

export const putData = async (data) => {
    const user = auth.currentUser;
    console.log(user?.uid); // Optional chaining to avoid errors if user is null

    if (user) {
        await set(ref(db, `users/${user.uid}/${data.id}`), data);
    } else {
        console.log("No user is signed in");
    }
};

export const deleteData = async (id) => {
    const user = auth.currentUser;
    console.log(user?.uid); // Optional chaining to avoid errors if user is null

    if (user) {
        const node = await ref(db, `users/${user.uid}/${id}`);
        await remove(node);
        console.log(`Deleted note with id: ${id}`);
    } else {
        console.log("No user is signed in");
    }
}


