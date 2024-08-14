import { ref, set, remove, get } from "firebase/database";
import { auth, db } from "./firebase";

export const putData = async (data) => {
    const user = auth.currentUser;

    if (user) {
        await set(ref(db, `users/${user.uid}/${data.id}`), data);
    } else {
        console.log("No user is signed in");
    }
};

export const deleteData = async (id) => {
    const user = auth.currentUser;

    if (user) {
        const node = await ref(db, `users/${user.uid}/${id}`);
        await remove(node);
        console.log(`Deleted note with id: ${id}`);
    } else {
        console.log("No user is signed in");
    }
};

export const fetchAll = async () => {
    const user = auth.currentUser;

    if (user) {
        try {
            const userRef = ref(db, `users/${user.uid}`);
            const snapshot = await get(userRef);

            if (snapshot.exists()) {
                const data = snapshot.val();
                console.log(data);
                return data;
            } else {
                console.log("No data available for this user.");
                return {};
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            return {};
        }
    } else {
        console.log("No user is signed in");
        return {};
    }
};
