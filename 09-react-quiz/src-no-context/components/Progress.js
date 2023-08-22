function Progress({ numQuestions, index, points, maxPossiblePoints, answer }) {
	return (
		<header className="progress">
			<progress
				max={numQuestions}
				value={index + Number(answer !== null)}
			></progress>
			<p>
				Question{" "}
				<strong>
					{index + 1}/{numQuestions}
				</strong>
			</p>
			<p>
				{points}/{maxPossiblePoints} points
			</p>
		</header>
	);
}

export default Progress;
