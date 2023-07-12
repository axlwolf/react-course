import { useState } from "react";

const messages = [
	"Learn React ⚛️",
	"Apply for jobs 💼",
	"Invest your new income 🤑",
];

export default function App() {
	//const step = 1;
	const [step, setStep] = useState(1);
	const [isOpen, setIsOpen] = useState(true);
	//console.log(arr);

	const handlePreviousStep = () => {
		console.log("Previous step");
		if (step > 1) setStep((s) => s - 1);
	};
	const handleNextStep = () => {
		console.log("Next step");
		if (step < 3) setStep((s) => s + 1);
	};

	return (
		<>
			<button className="close" onClick={() => setIsOpen((is) => !is)}>
				&times;
			</button>
			{isOpen && (
				<section className="steps">
					<div className="numbers">
						<div className={step >= 1 ? "active" : ""}>1</div>
						<div className={step >= 2 ? "active" : ""}>2</div>
						<div className={step >= 3 ? "active" : ""}>3</div>
					</div>

					<StepMessage step={step}> {messages[step - 1]} </StepMessage>

					<section className="buttons">
						<Button
							handler={handlePreviousStep}
							backgroundColor={"#7550f2"}
							textColor={"#FFF"}
						>
							<span>👈</span> Previous
						</Button>
						<Button
							handler={handleNextStep}
							backgroundColor={"#7550f2"}
							textColor={"#FFF"}
						>
							Next <span>👉</span>
						</Button>
					</section>
				</section>
			)}
		</>
	);
}

function Button({ handler, textColor, backgroundColor, children }) {
	return (
		<button
			className="button"
			style={{ backgroundColor: backgroundColor, color: textColor }}
			onClick={handler}
		>
			{children}
		</button>
	);
}

function StepMessage({ step, children }) {
	return (
		<div className="message">
			<h3> Step {step}: </h3> {children}
		</div>
	);
}
