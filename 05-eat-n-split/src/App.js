import AddFriend from "./components/AddFriend";
import FriendList from "./components/FriendsList";
import SplitBill from "./components/SplitBill";
import Button from "./components/Button";
import { useState } from "react";

const initialFriends = [
	{
		id: 118836,
		name: "Clark",
		image: "https://i.pravatar.cc/48?u=118836",
		balance: -7,
	},
	{
		id: 933372,
		name: "Sarah",
		image: "https://i.pravatar.cc/48?u=933372",
		balance: 20,
	},
	{
		id: 499476,
		name: "Anthony",
		image: "https://i.pravatar.cc/48?u=499476",
		balance: 0,
	},
];

function App() {
	// State
	const [friends, setFriends] = useState(initialFriends);
	const [showAddFriend, setShowAddFriend] = useState(false);
	const [selectedFriend, setSelectedFriend] = useState(null);

	//Event handlers
	const handleShowAddFriend = (e) => {
		setShowAddFriend((showAddFriend) => !showAddFriend);
	};
	const handleAddFriend = (friendObj) => {
		setFriends((friends) => [...friends, friendObj]);
		setShowAddFriend(false);
	};
	const handleSelectFriend = (friendObj) => {
		setSelectedFriend((cur) => (cur?.id === friendObj.id ? null : friendObj));
		setShowAddFriend(false);
	};
	const handleSplitBill = (value) => {
		console.log(value);
		setFriends(
			friends.map((friend) =>
				friend.id === selectedFriend.id
					? { ...friend, balance: friend.balance + value }
					: friend
			)
		);
		setSelectedFriend(null);
	};

	return (
		<div className="app">
			<div className="sidebar">
				<FriendList
					friendList={friends}
					selectedFriend={selectedFriend}
					onSelection={handleSelectFriend}
				></FriendList>

				{showAddFriend && <AddFriend onAddFriend={handleAddFriend}></AddFriend>}

				<Button onClick={handleShowAddFriend}>
					{showAddFriend ? "Close" : "Add Friend"}
				</Button>
			</div>
			{selectedFriend && (
				<SplitBill
					selectedFriend={selectedFriend}
					onSplitBill={handleSplitBill}
					key={selectedFriend.id}
				></SplitBill>
			)}
		</div>
	);
}

export default App;
