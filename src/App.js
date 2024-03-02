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
        // if (!showAddFriendForm) {
        //     setSelectedFriend(null);
        // }
        setShowAddFriendForm(!showAddFriendForm);
    }

    function handleAddFriend(newFriend) {
        setFriends([...friends, newFriend]);
        setShowAddFriendForm(false);
    }

    function handleSelectFriend(friend) {
        // setSelectedFriend(friend);
        // if (selectedFriend?.id === friend) { // if selectedFriend is not null or undefined then check the id
        if (selectedFriend && selectedFriend.id === friend.id) {
            // same as above
            setSelectedFriend(null);
        } else {
            setSelectedFriend(friend);
            setShowAddFriendForm(false);
        }
        // setShowAddFriendForm(false);
    }

    function handleSplitBill(value) {
        // console.log(value);
        setFriends(
            friends.map((friend) => {
                if (friend.id === selectedFriend.id) {
                    return {
                        ...friend,
                        balance: friend.balance + value,
                    };
                }
                return friend;
            })
        );

        setSelectedFriend(null);
    }

    return (
        <div className="app">
            <div className="sidebar">
                <h1>My Friends</h1>
                <FriendsList
                    friends={friends}
                    selectedFriend={selectedFriend}
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
                <FormSplitBill
                    selectedFriend={selectedFriend}
                    onSplitBill={handleSplitBill}
                    key={selectedFriend.id}
                />
            )}
        </div>
    );
}

function FriendsList({ friends, selectedFriend, onSelectFirend }) {
    return (
        <div>
            <h2>Friends</h2>
            <ul>
                {friends.map((friend) => (
                    <Friend
                        friend={friend}
                        key={friend.id}
                        selectedFriend={selectedFriend}
                        onSelectFirend={onSelectFirend}
                    />
                ))}
            </ul>
        </div>
    );
}

function Friend({ friend, selectedFriend, onSelectFirend }) {
    // const isSelected = selectedFriend?.id === friend.id; // optional chaining operator (?.)
    const isSelected = selectedFriend && selectedFriend.id === friend.id; // same as above

    return (
        <li className={isSelected ? "selected" : ""}>
            <img src={friend.image} alt={`${friend.name} ${friend.id}`} />
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

            <Button onClick={() => onSelectFirend(friend)}>
                {isSelected ? "Close" : "Select"}
            </Button>
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

function FormSplitBill({ selectedFriend, onSplitBill }) {
    const [bill, setBill] = useState("");
    const [yourExpenses, setYourExpenses] = useState("");
    // const [friendExpenses, setFriendExpenses] = useState(0);
    const friendExpenses = bill ? bill - yourExpenses : "";
    const [youPay, setYouPay] = useState(true);
    let payer = youPay ? "user" : "friend";

    function handleSubmit(e) {
        e.preventDefault();

        if (!bill || !yourExpenses) {
            return;
        }
        onSplitBill(youPay ? friendExpenses : -yourExpenses);

        // console.log({
        //     bill,
        //     yourExpenses,
        //     friendExpenses,
        //     payer,
        // });
    }

    return (
        <form className="form-split-bill" onSubmit={handleSubmit}>
            <h2>Split a Bill with {selectedFriend.name}</h2>
            <label>💸Total Amount</label>
            <input
                type="number"
                value={bill}
                placeholder="Bill €"
                onChange={(e) => setBill(Number(e.target.value))}
            />

            <label>👌Your Expenses</label>
            <input
                type="number"
                value={yourExpenses}
                placeholder="Expenses €"
                onChange={(e) =>
                    setYourExpenses(
                        Number(e.target.value) > bill
                            ? bill
                            : Number(e.target.value)
                    )
                }
            />

            <label>🤝{selectedFriend.name}'s Expenses</label>
            <input type="number" disabled value={friendExpenses} />

            <label>👀Who is Paying the Bill?</label>
            <select
                value={payer}
                onChange={(e) =>
                    setYouPay(e.target.value === "user" ? true : false)
                }
            >
                <option value="user">Me</option>
                <option value="friend">{selectedFriend.name}</option>
            </select>

            <Button>Split Bill</Button>
        </form>
    );
}
