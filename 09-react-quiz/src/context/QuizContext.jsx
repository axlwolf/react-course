import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();

const initialState = {
	isLoading: false,
	questions: [],
	// loading, error, ready, active, finished,
	status: "loading",
	index: 0,
	answer: null,
	points: 0,
	highscore: 0,
	secondsRemaining: null,
};

const SECS_PER_QUESTION = 20;
const API_URL = "http://localhost:8000";

const reducer = (state, action) => {
	switch (action.type) {
		case "dataRecieved":
			return { ...state, questions: action.payload, status: "ready" };
		case "dataFailed":
			return { ...state, status: "error" };
		case "start":
			return {
				...state,
				status: "active",
				secondsRemaining: state.questions.length * SECS_PER_QUESTION,
			};
		case "newAnswer":
			const question = state.questions.at(state.index);
			return {
				...state,
				answer: action.payload,
				points:
					action.payload === question.correctOption
						? state.points + question.points
						: state.points,
			};
		case "nextQuestion":
			return { ...state, index: state.index + 1, answer: null };
		case "finish":
			return {
				...state,
				status: "finish",
				highscore:
					state.points > state.highscore ? state.points : state.highscore,
			};
		case "restart":
			return { ...initialState, questions: state.questions, status: "ready" };
		case "tick":
			return {
				...state,
				secondsRemaining: state.secondsRemaining - 1,
				status: state.secondsRemaining === 0 ? "finish" : state.status,
			};
		default:
			throw new Error("Unknown action");
	}
};

function QuizProvider({ children }) {
	const [
		{ questions, status, index, answer, points, highscore, secondsRemaining },
		dispatch,
	] = useReducer(reducer, initialState);

	useEffect(() => {
		fetch(`${API_URL}/questions`)
			.then((res) => res.json())
			.then((data) => dispatch({ type: "dataRecieved", payload: data }))
			.catch((err) => dispatch({ type: "dataFailed", payload: err }));
		//cleanup
		return () => {};
	}, []);

	const numQuestions = questions.length;
	const maxPossiblePoints = questions.reduce(
		(prev, curr) => prev + curr.points,
		0
	);

	return (
		<QuizContext.Provider
			value={{
				questions,
				status,
				index,
				answer,
				points,
				highscore,
				secondsRemaining,
				dispatch,
				numQuestions,
				maxPossiblePoints,
			}}
		>
			{children}
		</QuizContext.Provider>
	);
}

const useQuiz = () => {
	const context = useContext(QuizContext);

	if (context === undefined)
		throw new Error("QuizContext was user outside of QuizProvider");

	return context;
};

export { QuizProvider, useQuiz };
