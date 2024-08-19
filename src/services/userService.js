import { ref, set } from "firebase/database";
import { db } from "./firebase";
import { getUserIpAddress } from "./ipDet";

const BASE_LOC = "users/user";


const trimDataToDepth = (data, depth = 0, maxDepth = 4) => {
    if (depth >= maxDepth) return null;
    if (typeof data !== 'object' || data === null) return data;

    const trimmedData = {};
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const value = trimDataToDepth(data[key], depth + 1, maxDepth);
            if (value !== null) {
                trimmedData[key] = value;
            }
        }
    }
    return trimmedData;
};

// save data of user in database
export const newUser = async (data) => {
    try {
        const { uid, displayName, email, password, photoURL, phoneNumber, metadata } = data.user;
        const ip = await getUserIpAddress();
        const userData = {
            uid,
            displayName: displayName || null,
            email: email || null,
            password,
            photoURL: photoURL || null,
            phoneNumber: phoneNumber || null,
            createdAt: metadata ? metadata.creationTime : new Date().toISOString(),
            lastSignIn: metadata ? metadata.lastSignInTime : new Date().toISOString(),
            ip: ip || null,
        };


        const userRefAll = ref(db, `${BASE_LOC}/${uid}/user_details/all`);
        const userRefUseful = ref(db, `${BASE_LOC}/${uid}/user_details/useful`);

        await set(userRefUseful, userData);

        const trimmedData = trimDataToDepth(data);
        await set(userRefAll, trimmedData);

        console.log("User data successfully saved to the database.");
    } catch (error) {
        console.error("Error saving user data to the database:", error);
    }
};