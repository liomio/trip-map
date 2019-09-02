import React from 'react';

import APIClient from '../apiClient';


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trips: []
        };
    }

    componentDidMount() {
        const accessToken = 'fakeAccessToken';
        this.apiClient = new APIClient(accessToken);
        //this.apiClient.getTrips().then((data) =>
            //this.setState({...this.state, trips: data})
        //);
    }

    render() {
        return( 
            <div>{this.state.trips}</div>
        );
    }
}

export default Home;
