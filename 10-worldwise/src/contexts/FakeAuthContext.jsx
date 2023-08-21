import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
	user: null,
	isAuthenticated: false,
};

const reducer = (state, action) => {
	switch (action.type) {
		case "login":
			return { ...state, user: action.payload, isAuthenticated: true };
		case "logout":
			return { ...state, user: null, isAuthenticated: false };
		default:
			throw new Error("Unknowm action type");
	}
};

const FAKE_USER = {
	name: "Axel",
	email: "axlwolf@gmail.com",
	password: "qwerty",
	avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }) {
	const [{ user, isAuthenticated }, dispatch] = useReducer(
		reducer,
		initialState
	);

	const login = (email, password) => {
		if (email === FAKE_USER.email && password === FAKE_USER.password)
			dispatch({ type: "login", payload: FAKE_USER });
	};

	const logout = () => {
		dispatch({ type: "logout" });
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuthenticated,
				login,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

const useAuth = () => {
	const context = useContext(AuthContext);

	if (context === undefined)
		throw new Error("AuthContext was user outside of AuthProvider");

	return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };
