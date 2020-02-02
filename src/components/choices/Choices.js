import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Ranaa from "./css/ranaa.css";
import Human from "./images/human.png";
import Computer from "./images/computer.png";
import Vs from "./images/vs.png";
import Win from "./images/win.jpg";
import Lose from "./images/lose.jpg";
import Tied from "./images/tied.jpg";
import Rock from "./images/rock.png";
import Paper from "./images/paper.png";
import Scissors from "./images/scissors.png";
import Lizard from "./images/lizard.png";
import Spock from "./images/spock.png";
import Circle from "./images/circle.jpg";

export default class Choices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      playerChoice: "",
      results: "",
      computer: "",
      trackResult: [],
      computerIcon: null,
      playerIcon: null
    };
    this.getChoices = this.getChoices.bind(this);
    this.getChoice = this.getChoice.bind(this);
    this.play = this.play.bind(this);
    this.resetScore = this.resetScore.bind(this);
  }
  //get /choices endpoint
  getChoices(e) {
    axios
      .get(`http://localhost:4000/random/choices`)
      .then(response => {
        console.log("response: ", response.data.id[2]);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  //calls /choice endpoint
  getChoice(e) {
    axios
      .get(`http://localhost:4000/random/choice`)
      .then(response => {})
      .catch(function(error) {
        console.log(error);
      });
  }
  // sets the state of playerChoice based on button click and also /randomChoice end point
  handleButtonValue = e => {
    this.setState({ playerChoice: e.target.id }, () => {
      this.play();
    });
    console.log("handle button");
  };
  // calls /play endpoint when button is clicked
  play() {
    console.log("play value: ", this.state.playerChoice);
    axios
      .post(
        `http://localhost:4000/random/play`,
        { playerChoice: this.state.playerChoice },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(response => {
        console.log("response from player: ", response.data);
        if (response.data.results == "win") {
          this.state.trackResult.push("W");
        } else if (response.data.results == "lose") {
          this.state.trackResult.push("L");
        } else {
          this.state.trackResult.push("T");
        }
        console.log("track: ", this.state.trackResult);
        this.handleSelectedValue(response.data);
        this.setState({
          clicked: true,
          results: response.data.results
        });
      });
  }
  // handleSelectedValue - converts number responses to string values
  handleSelectedValue(response) {
    if (response.computer == 1) {
      this.setState({
        computer: "Rock",
        computerIcon: Rock
      });
    } else if (response.computer == 2) {
      this.setState({
        computer: "Paper",
        computerIcon: Paper
      });
    } else if (response.computer == 3) {
      this.setState({
        computer: "Scissors",
        computerIcon: Scissors
      });
    } else if (response.computer == 4) {
      this.setState({
        computer: "Lizard",
        computerIcon: Scissors
      });
    } else {
      this.setState({
        computer: "Spock",
        computerIcon: Spock
      });
    }

    if (response.player == 1) {
      this.setState({
        playerChoice: "Rock",
        playerIcon: Rock
      });
    } else if (response.player == 2) {
      this.setState({
        playerChoice: "Paper",
        playerIcon: Paper
      });
    } else if (response.player == 3) {
      this.setState({
        playerChoice: "Scissors",
        playerIcon: Scissors
      });
    } else if (response.player == 4) {
      this.setState({
        playerChoice: "Lizard",
        playerIcon: Lizard
      });
    } else {
      this.setState({
        playerChoice: "Spock",
        playerIcon: Spock
      });
    }
  }
  //renders the results to the screen on button click
  handleClick() {
    if (this.state.clicked && this.state.results == "win") {
      return (
        <div className="">
          <div className="text-white border-choice">
            <img className="" src={this.state.computerIcon} width="15%" />
            &nbsp;&nbsp; vs &nbsp;&nbsp;
            <img src={this.state.playerIcon} width="15%" />
          </div>
          <br />
          <br />
          <br />
          <div className="border-result">
            <h2 className="text-success">You {this.state.results}!!!</h2>
            <div>{this.handleResultsImg()}</div>
          </div>
        </div>
      );
    } else if (this.state.clicked && this.state.results == "lose") {
      return (
        <div className="">
          <div className="text-white border-choice">
            <img src={this.state.computerIcon} width="15%" />
            &nbsp;&nbsp; vs &nbsp;&nbsp;
            <img src={this.state.playerIcon} width="15%" />
          </div>
          <br />
          <br />
          <br />
          <div className="border-result">
            <h2 className="text-danger"> You {this.state.results}</h2>
            <div>{this.handleResultsImg()}</div>
          </div>
        </div>
      );
    } else if (this.state.clicked && this.state.results == "tie") {
      return (
        <div className="">
          <div className="text-white border-choice">
            <img src={this.state.computerIcon} width="15%" />
            &nbsp;&nbsp; vs &nbsp;&nbsp;
            <img src={this.state.playerIcon} width="15%" />
          </div>
          <br />
          <br />
          <br />
          <div className="border-result">
            <h2 className=" text-warning">It's a {this.state.results}!</h2>
            <div>{this.handleResultsImg()}</div>
          </div>
        </div>
      );
    }
  }
  handleResultsImg() {
    if (this.state.results == "win") {
      return (
        <div>
          <img width="30%" src={Win} />
        </div>
      );
    } else if (this.state.results == "lose") {
      return (
        <div>
          <img width="30%" src={Lose} />
        </div>
      );
    } else {
      return (
        <div>
          <img width="30%" src={Tied} />
        </div>
      );
    }
  }
  resetScore() {
    this.setState({ trackResult: [] });
  }
  render() {
    var reverseResult = this.state.trackResult.reverse().map((data, i) => {
      return (
        <li className="text-white" key={i}>
          {data}
        </li>
      );
    });
    var recentResults = reverseResult.slice(0, 10).map((list, i) => {
      return <div key={i}>{list}</div>;
    });
    return (
      <div className="background border-container">
        <div className="">
          <div className="">
            <h1 className="text-center text-white">
              <u>Rock Paper Scissors Lizard Spock</u>
            </h1>
          </div>
          <div className="row">
            <div className="col-lg-6 brightnessimg">
              <div className="relative" style={{ left: "40px" }}>
                <img
                  height="15%"
                  width="15%"
                  src={Rock}
                  className=""
                  onClick={this.handleButtonValue.bind(this)}
                  id="1"
                />
              </div>
              <div className="relative" style={{ left: "200px" }}>
                <img
                  height="15%"
                  width="15%"
                  src={Paper}
                  className=""
                  onClick={this.handleButtonValue.bind(this)}
                  id="2"
                />
              </div>
              <br />
              <div className="relative" style={{ left: "100px" }}>
                <img
                  height="20%"
                  width="20%"
                  src={Circle}
                  onClick={this.handleButtonValue.bind(this)}
                  id="3"
                />{" "}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <img
                  height="15%"
                  width="15%"
                  src={Scissors}
                  onClick={this.handleButtonValue.bind(this)}
                  id="3"
                />
              </div>
              <br />
              <div className="relative" style={{ left: "200px" }}>
                <img
                  height="15%"
                  width="15%"
                  src={Lizard}
                  className=""
                  onClick={this.handleButtonValue.bind(this)}
                  id="4"
                />
              </div>
              <div className="relative" style={{ left: "40px" }}>
                <img
                  height="15%"
                  width="15%"
                  src={Spock}
                  className="choice"
                  onClick={this.handleButtonValue.bind(this)}
                  id="5"
                />
              </div>
              <br />
            </div>
            <div className="col-lg-4 text-center">
              <br />
              <br />
              <br />
              <div className="brightness row">
                <img className="" width="25%" src={Computer} /> &nbsp;&nbsp;
                <img className="" width="10%" src={Vs} /> &nbsp;&nbsp;
                <img className="" width="25%" src={Human} />
              </div>
              <div className="row">
                <div className="text-center">{this.handleClick()}</div>
              </div>
            </div>
            <div className="col-lg-2 text-center text-white">
              <div>
                <button className="btn btn-light" onClick={this.resetScore}>
                  <b>Reset</b>
                </button>{" "}
              </div>
              <div>
                Last 10 results
                {recentResults}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
