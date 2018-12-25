import React, { Component } from 'react'

class Antena extends Component {
    generateRequest() {
        this.setState({ isLoaded: false });

        fetch(this.state.url)
            .then(res => res.json())
            .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    response: result
                }, () => {
                    this.state.onResponse(this.state.response);
                });

            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                this.setState({
                    isLoaded: true,
                    error: error
                }, () => {
                    this.state.onResponse(this.state.error);
                }
                );
            }
            )
    }
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            response: {},
            url: props.url,
            auto: props.auto ? Boolean(props.auto) : false,
            onResponse: props.onResponse,
            onError: props.onError
        };
    }

    componentDidMount() {
        if (this.state.auto === false) return;
        this.generateRequest();
    }

    render() {
        return (
            <div hidden></div>
        );
    }

}


export default Antena;