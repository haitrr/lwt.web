import { useState } from "react";

// Hook
const useLocalStorage = (key: string, initialValue: string | null) => {
    const [storedValue, setStoredValue] = useState<string | null>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item;
        } catch (error) {
            console.log(error);
            return initialValue;
        }
    });

    const setValue = (value: string | null) => {
        try {
            // Save state
            setStoredValue(value);
            // Save to local storage
            if (value == null) {
                window.localStorage.removeItem(key);
            }
            else {
                window.localStorage.setItem(key, value);
            }
        } catch (error) {
            // A more advanced implementation would handle the error case
            console.log(error);
        }
    };
    return [storedValue, setValue] as const;
}

export default useLocalStorage;