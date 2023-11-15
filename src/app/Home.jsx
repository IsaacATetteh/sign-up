import React, { Component } from "react";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state - { userData: "egg" };
  }
  componentDidMount() {
    console.log("tee");
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
        this.setState;
        ({ userData: data.data });
      });
  }

  render() {
    return (
      <div>
        Name <h1>eggx</h1>
        Email <h1>{this.state.userData.email}</h1>
      </div>
    );
  }
}
