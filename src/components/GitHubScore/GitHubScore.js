import React, { Component } from 'react';
import Form from '../Form/Form';
import Display from '../Display/Display';
import axios from 'axios';
import './GitHubScore.css';


class GitHubScore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: [],
        }
    }
    // get the scores from the server and set the state
    componentDidMount() {
        axios.get('/scores')
            .then((response) => {
                console.log(response);
                this.setState({
                    scores: response.data.payload,
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    addUser = (user) => {
        axios
            .get(`https://api.github.com/users/${user}`)
            .then((gitHubResponse) => {
                const score = gitHubResponse.data.public_repos + gitHubResponse.data.followers;
                axios
                    .post(`http://5c954d67498269001487f243.mockapi.io/scores`, { user: `${user}`, score: score })
                    .then((serverResponse) => {
                        // console.log(serverResponse)
                        this.setState({
                            user: user,
                            score: score
                        })
                        console.log(this.state);
                    })
                    .catch((serverError) => {
                        console.log(serverError);
                    })
            })
            .catch((gitHubError) => {
                console.log(gitHubError);
            })
    }
    render() {
        // console.log(this.state);
        // console.log(this.state.score);
        return (
            <div className="GitHubScore">
                <h1>GitHub Score</h1>
                <Form addUser={this.addUser}/>
                <Display score={this.state.score} />
            </div>
        );
    }
}

export default GitHubScore;
