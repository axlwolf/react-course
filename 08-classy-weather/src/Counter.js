import React from "react";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { count: 5 };

		this.handleDecrement = this.handleDecrement.bind(this);
	}

	handleDecrement() {
		this.setState((currState) => {
			return { count: --currState.count };
		});
	}

	handleIncrement = () => {
		this.setState((currState) => {
			return { count: ++currState.count };
		});
	};

	render() {
		const date = new Date("28 October 1980");

		date.setDate(date.getDate() + this.state.count);

		return (
			<div>
				<button onClick={this.handleDecrement}>-</button>
				<span>
					{date.toDateString()} - {this.state.count}
				</span>
				<button onClick={this.handleIncrement}>+</button>
			</div>
		);
	}
}

export default App;
