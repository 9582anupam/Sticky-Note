import { ref, set, remove, get } from "firebase/database";
import { auth, db } from "./firebase";

const BASE_LOC = "users/user/";

export const putData = async (data) => {
    const user = auth.currentUser;

    if (user) {
        await set(ref(db, `${BASE_LOC}/${user.uid}/note/${data.id}`), data);
    } else {
        console.log("No user is signed in");
    }
};

export const deleteData = async (id) => {
    const user = auth.currentUser;

    if (user) {
        const node = await ref(db, `${BASE_LOC}/${user.uid}/note/${id}`);
        await remove(node);
    } else {
        console.log("No user is signed in");
    }
};

export const fetchAll = async () => {
    const user = auth.currentUser;

    if (user) {
        try {
            const userRef = ref(db, `${BASE_LOC}/${user.uid}/note`);
            const snapshot = await get(userRef);

            if (snapshot.exists()) {
                const data = snapshot.val();
                return data;
            } else {
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
