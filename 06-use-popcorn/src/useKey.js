import { useEffect } from "react";
export const useKey = (key, action) => {
	useEffect(() => {
		const keyDowneventListener = (e) => {
			if (e.code.toLowerCase() === key.toLowerCase()) {
				action();
			}
		};
		document.addEventListener("keydown", keyDowneventListener);

		return () => {
			document.removeEventListener("keydown", keyDowneventListener);
			console.log(`Clean up effect event listener`);
		};
	}, [action, key]);
};
