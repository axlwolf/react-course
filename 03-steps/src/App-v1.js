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

					<p className="message">
						Step {step} : {messages[step - 1]}
					</p>

					<section className="buttons">
						<button
							className="button"
							style={{ backgroundColor: "#7550f2" }}
							onClick={handlePreviousStep}
						>
							Previous
						</button>
						<button
							className="button"
							style={{ backgroundColor: "#7550f2" }}
							onClick={handleNextStep}
						>
							Next
						</button>
					</section>
				</section>
			)}
		</>
	);
}
