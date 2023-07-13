import FriendItem from "./FriendItem";

export default function FriendList({
	friendList,
	selectedFriend,
	onSelection,
}) {
	return (
		<div>
			<h1>Friend List</h1>
			<ul>
				{friendList.map((friendListItem) => {
					return (
						<FriendItem
							key={friendListItem.id}
							friendListItem={friendListItem}
							selectedFriend={selectedFriend}
							onSelection={onSelection}
						></FriendItem>
					);
				})}
			</ul>
		</div>
	);
}
