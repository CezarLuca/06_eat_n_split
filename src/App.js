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

export default function App() {
    return (
        <div className="app">
            <div className="sidebar">
                <h1>My Friends</h1>
                <FriendsList />
            </div>
        </div>
    );
}

function FriendsList() {
    return (
        <div>
            <h2>Friends</h2>
            <ul>
                <li>
                    <Friend />
                </li>
            </ul>
        </div>
    );
}

function Friend() {
    return (
        <div>
            <img src="https://i.pravatar.cc/48?u=118836" alt="Clark" />
            <h3>Clark</h3>
            <p>Balance: -7</p>
        </div>
    );
}
