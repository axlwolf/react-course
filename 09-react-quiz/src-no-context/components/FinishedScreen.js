function FinishedScreen({ points, maxPossiblePoints, highscore, dispatch }) {
	const percentage = (points / maxPossiblePoints) * 100;
	let emoji;

	if (percentage === 100) emoji = " 🥇";
	if (percentage >= 80 && percentage < 100) emoji = "🎉";
	if (percentage >= 50 && percentage < 80) emoji = "🙃";
	if (percentage >= 0 && percentage < 50) emoji = "🤔";
	if (percentage === 0) emoji = "🤦‍♂️";

	return (
		<div>
			<p className="result">
				<strong>{emoji}</strong> You scored <strong>{points}</strong> of
				<strong> {maxPossiblePoints}</strong> ({Math.ceil(percentage)} %){" "}
			</p>
			<p className="highscore">(Highscore: {highscore} points)</p>
			<button className="btn btn-ui" onClick={()=> dispatch({type: 'restart'})}>Restart ⏪</button>
		</div>
	);
}

export default FinishedScreen;
