import { useState } from "react";
import Button from "./Button";

export default function AddFriend({ onAddFriend }) {
	const [name, setName] = useState("");
	const [image, setImage] = useState("https://i.pravatar.cc/48");

	const id = crypto.randomUUID();

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!name || !image) return;

		const newFriend = {
			name,
			image: `${image}?=${id}`,
			balance: 0,
			id: id,
		};

		onAddFriend(newFriend);

		setName("");
		setImage("");
	};
	return (
		<form action="" className="form-add-friend" onSubmit={handleSubmit}>
			<h2>Add Friend</h2>

			<label>👫 Friend name</label>
			<input
				type="text"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>

			<label>🌄 Image URL</label>
			<input
				type="text"
				value={image}
				onChange={(e) => setImage(e.target.value)}
			/>

			<Button>Add</Button>
		</form>
	);
}
