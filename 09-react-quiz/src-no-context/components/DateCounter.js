import { useReducer } from "react";
const initialState = { count: 0, step: 1 };

const reducer = (state, action) => {
	console.log(state, action);
	// if (action.type === "inc") return state + 1;
	// if (action.type === "dec") return state - 1;
	// if (action.type === "setCount") return action.payload;
	// return { count: 0, steps: 0 };

	// const getAction = (state, type) => {
	// 	debugger;
	// 	//var drink;
	// 	let actions = {
	// 		inc: () => {
	// 			return { ...state, count: state.count + state.step };
	// 		},
	// 		desc: () => {
	// 			return { ...state, count: state.count + state.step };
	// 		},
	// 		setCount: () => {
	// 			return { ...state, count: state.count + state.step };
	// 		},
	// 		setStep: () => {
	// 			return { ...state, count: state.count + state.step };
	// 		},
	// 		reset: () => {
	// 			return initialState;
	// 		},
	// 		default: () => {
	// 			throw new Error("Unknown action");
	// 		},
	// 	};

	// 	// invoke it
	// 	//(actions[type] || actions["default"])();

	// 	// return a String with chosen drink
	// 	return (actions[type] || actions["default"])();
	// };

	// getAction(state, action.type);

	switch (action.type) {
		case "inc":
			return { ...state, count: state.count + state.step };
		case "dec":
			return { ...state, count: state.count - state.step };
		case "setCount":
			return { ...state, count: action.payload };
		case "setStep":
			return { ...state, step: action.payload };
		case "reset":
			return initialState;
		default:
			throw new Error("Unknown action");
	}
};

function DateCounter() {
	// Initial state
	const [state, dispatch] = useReducer(reducer, initialState);

	const { count, step } = state;

	// This mutates the date object.
	const date = new Date("october 28 1980");
	date.setDate(date.getDate() + count);

	const dec = function () {
		dispatch({ type: "dec" });
	};

	const inc = function () {
		dispatch({ type: "inc" });
	};

	const defineCount = function (e) {
		dispatch({ type: "setCount", payload: Number(e.target.value) });
	};

	const defineStep = function (e) {
		dispatch({ type: "setStep", payload: Number(e.target.value) });
	};

	const reset = function () {
		dispatch({ type: "reset" });
	};

	return (
		<div className="counter">
			<div>
				<input
					type="range"
					min="0"
					max="10"
					value={step}
					onChange={defineStep}
				/>
				<span>{step}</span>
			</div>

			<div>
				<button onClick={dec}>-</button>
				<input value={count} onChange={defineCount} />
				<button onClick={inc}>+</button>
			</div>

			<p>{date.toDateString()}</p>

			<div>
				<button onClick={reset}>Reset</button>
			</div>
		</div>
	);
}
export default DateCounter;
