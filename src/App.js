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

function Button({ onClick, children }) {
    return (
        <button className="button" onClick={onClick}>
            {children}
        </button>
    );
}

export default function App() {
    const [friends, setFriends] = useState(initialFriends);
    const [showAddFriendForm, setShowAddFriendForm] = useState(false);
    const [selectedFriend, setSelectedFriend] = useState(null);

    function handleShowAddFirendForm() {
        setShowAddFriendForm(!showAddFriendForm);
    }

    function handleAddFriend(newFriend) {
        setFriends([...friends, newFriend]);
        setShowAddFriendForm(false);
    }

    function handleSelectFriend(friend) {
        setSelectedFriend(friend);
    }

    return (
        <div className="app">
            <div className="sidebar">
                <h1>My Friends</h1>
                <FriendsList
                    friends={friends}
                    onSelectFirend={handleSelectFriend}
                />
                {showAddFriendForm && (
                    <FormAddFriend onAddFriend={handleAddFriend} />
                )}
                <Button onClick={handleShowAddFirendForm}>
                    {showAddFriendForm ? "Close" : "Add a Friend"}
                </Button>
            </div>
            {selectedFriend && (
                <FormSplitBill selectedFriend={selectedFriend} />
            )}
        </div>
    );
}

function FriendsList({ friends, onSelectFirend }) {
    return (
        <div>
            <h2>Friends</h2>
            <ul>
                {friends.map((friend) => (
                    <Friend
                        friend={friend}
                        key={friend.id}
                        onSelectFirend={onSelectFirend}
                    />
                ))}
            </ul>
        </div>
    );
}

function Friend({ friend, onSelectFirend }) {
    return (
        <li>
            <img src={friend.image} alt={friend.name} />
            <h3>{friend.name}</h3>
            {friend.balance < 0 && (
                <p className="red">
                    You owe {friend.name} {friend.balance * -1}€
                </p>
            )}
            {friend.balance > 0 && (
                <p className="green">
                    {friend.name} owes you {friend.balance}€
                </p>
            )}
            {friend.balance === 0 && <p>You and {friend.name} are even.</p>}

            <Button onClick={() => onSelectFirend(friend)}>Select</Button>
        </li>
    );
}

function FormAddFriend({ onAddFriend }) {
    const [name, setName] = useState("");
    const [image, setImage] = useState("https://i.pravatar.cc/48");

    function handleSubmit(event) {
        event.preventDefault();

        if (!name || !image) {
            return;
        }

        const id = crypto.randomUUID();
        const newFriend = {
            id: id,
            name,
            image: `${image}?u=${id}`,
            balance: 0,
        };
        // console.log(newFriend);
        onAddFriend(newFriend);

        setName("");
        setImage("https://i.pravatar.cc/48");
    }

    return (
        <form className="form-add-friend" onSubmit={handleSubmit}>
            <label>✌️Friend's Name</label>
            <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
            />

            <label>📸Image URL</label>
            <input
                type="text"
                value={image}
                onChange={(event) => setImage(event.target.value)}
            />

            <Button>Add Friend</Button>
        </form>
    );
}

function FormSplitBill({ selectedFriend }) {
    return (
        <form className="form-split-bill">
            <h2>Split a Bill with {selectedFriend.name}</h2>
            <label>💸Total Amount</label>
            <input type="number" />

            <label>👌Your Expenses</label>
            <input type="number" />

            <label>🤝{selectedFriend.name}'s Expenses</label>
            <input type="number" disabled />

            <label>👀Who is Paying the Bill?</label>
            <select>
                <option value="user">Me</option>
                <option value="friend">{selectedFriend.name}</option>
            </select>

            <Button>Split Bill</Button>
        </form>
    );
}
