import Button from "./Button";

export default function FriendItem({
	friendListItem,
	selectedFriend,
	onSelection,
}) {
	const isSelected = selectedFriend?.id === friendListItem.id;
	return (
		<li className={isSelected ? "selected" : ""}>
			<img src={friendListItem.image} alt={friendListItem.name} />
			<h3>{friendListItem.name}</h3>
			{friendListItem.balance < 0 && (
				<p className="red">
					You owe {friendListItem.name} ${friendListItem.balance}
				</p>
			)}
			{friendListItem.balance > 0 && (
				<p className="green">
					Your friend {friendListItem.name} owns you ${friendListItem.balance}
				</p>
			)}
			{friendListItem.balance === 0 && (
				<p>You and your {friendListItem.name} are even</p>
			)}
			<Button onClick={() => onSelection(friendListItem)}>
				{isSelected ? "Close" : "Select"}
			</Button>
		</li>
	);
}
