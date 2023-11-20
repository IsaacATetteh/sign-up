"use client";
import React, { useState, useEffect } from "react";
import { Register } from "../Register";

const WebSocketComponent = () => {
  const [websocket, setWs] = useState(null);

  useEffect(() => {
    // Initialize WebSocket connection
    const ws = new WebSocket("ws://localhost:4040");

    // Set the WebSocket instance in the state
    setWs(ws);
    ws.addEventListener("message", handleMessage);
    // Cleanup function when the component unmounts
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  function handleMessage(e) {
    console.log("new message", e);
  }

  return <div>WebSocket Component</div>;
};
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: "", // existing state
      userList: [], // new state for the list of users
    };
  }

  componentDidMount() {
    fetch("http://localhost:5000/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        this.setState({ userData: data.data });
      });
    fetch("http://localhost:5000/userList", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((userList) => {
        console.log(userList, "userList");
        this.setState({ userList });
      });
    // WebSocket Connection
  }

  render() {
    if (!this.state.userData) {
      // If userData is null or undefined, return some placeholder content or loading indicator
      return <div>Please login</div>;
    }

    return (
      <div className="flex h-100 font-helvetica text-white">
        <div className="bg-[#393943] w-1/4 h-screen p-2">
          <div className="font-bold text-lg p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
              />
            </svg>
            UKC CHAT
          </div>
          {this.state.userList.map((user) => (
            <div className="mt-10 ml-5 font-medium" key={user._id}>
              {user.name}
            </div>
          ))}
        </div>
        <div className="flex flex-col bg-[#3E3E48] w-3/4 h-screen p-2">
          <div className="flex-grow"></div>
          <div className="flex mx-2">
            <input
              type="text"
              className="bg-[#4C4C58] p-2 flex-grow rounded-md"
              placeholder="Type here"
            />
            <button className="p-2 bg-[#473DFF text-white]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
