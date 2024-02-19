// import { useState } from "react";

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

export default function App() {
    return (
        <div className="app">
            <div className="sidebar">
                <h1>My Friends</h1>
                <FriendsList />
                <FormAddFriend />
                <Button>Add a Friend</Button>
            </div>
            <FormSplitBill />
        </div>
    );
}

function FriendsList() {
    const friends = initialFriends;

    return (
        <div>
            <h2>Friends</h2>
            <ul>
                {friends.map((friend) => (
                    <Friend friend={friend} key={friend.id} />
                ))}
            </ul>
        </div>
    );
}

function Friend({ friend }) {
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

            <Button>Select</Button>
        </li>
    );
}

function Button({ children }) {
    return <button className="button">{children}</button>;
}

function FormAddFriend() {
    return (
        <form className="form-add-friend">
            <label>✌️Friend's Name</label>
            <input type="text" />

            <label>📸Image URL</label>
            <input type="text" />

            <Button>Add Friend</Button>
        </form>
    );
}

function FormSplitBill() {
    return (
        <form className="form-split-bill">
            <h2>Split a Bill with X</h2>
            <label>💸Total Amount</label>
            <input type="number" />

            <label>👌Your Expenses</label>
            <input type="number" />

            <label>🤝X's Expenses</label>
            <input type="number" disabled />

            <label>👀Who is Paying the Bill?</label>
            <select>
                <option value="user">Me</option>
                <option value="friend">X</option>
            </select>

            <Button>Split Bill</Button>
        </form>
    );
}
