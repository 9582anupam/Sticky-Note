import { ref, set, get } from "firebase/database";
import { db } from "./firebase";

const BASE_LOC = "users/non-user/";

export const putIp = async (ip) => {
    if (ip) {
        try {
            // Reference to the base location
            const baseRef = ref(db, BASE_LOC);

            // Fetch existing records
            const snapshot = await get(baseRef);
            const existingRecords = snapshot.val() || {};
            if (Object.values(existingRecords).includes(ip)) {
                return null;
            }
            const recordCount = Object.keys(existingRecords).length;

            // Use the length of existing records as the new ID
            const newId = recordCount + 1;
            const newIpRef = ref(db, `${BASE_LOC}/${newId}`);

            // Save the new IP address
            await set(newIpRef, ip);
            console.log('IP address saved successfully with ID:', newId);
        } catch (error) {
            console.error('Error saving IP address:', error);
        }
    } else {
        console.log("No IP address provided.");
    }
};
