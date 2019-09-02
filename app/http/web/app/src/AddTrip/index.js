import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';
import { Redirect } from 'react-router-dom';
import APIClient from '../apiClient';

const test_trip = {
    id: 1,
}

class AddTrip extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            trip_name: '',
            start_date: '',
            end_date: '',
            locations: [{name: '', latitude: '', longitude: '', countryCode: ''}]
        }

    }

    componentDidMount() {
        //console.log('success');
    }

    //TODO make api call work
    handleSubmit(event, data) {
        console.log('submitting...');
        const accessToken = 'fakeAccessToken';
        this.apiClient = new APIClient(accessToken);
        this.apiClient.createTrip(test_trip);
    }

    handleChange = (event, {name, value}) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({[name]: value});
        }

        //clear end date when start date changed
        if (name==='start_date') {
            this.setState({end_date: ''});
        }
    }

    handleAddLocation = () => {
        this.setState({
            locations: this.state.locations.concat({name: '', latitude: '', longitude: '', countryCode: ''})
        });
    }

    handleRemoveLocation = idx => () => {
        this.setState({
            locations: this.state.locations.filter((s, sidx) => idx !== sidx)
        });
    }

    handleLocationNameChange = idx => evt => {
        const newLocations = this.state.locations.map((location1, sidx) => {
            if (idx !== sidx) return location1;
            return { ...location1, name: evt.target.value }
        });

        this.setState({ locations: newLocations });
    }

    handleLocationLatitudeChange = idx => evt => {
        const newLocations = this.state.locations.map((location1, sidx) => {
            if (idx !== sidx) return location1;
            return { ...location1, latitude: evt.target.value }
        });

        this.setState({ locations: newLocations });
    }

    handleLocationLongitudeChange = idx => evt => {
        const newLocations = this.state.locations.map((location1, sidx) => {
            if (idx !== sidx) return location1;
            return { ...location1, longitude: evt.target.value }
        });

        this.setState({ locations: newLocations });
    }

    handleLocationCountryCodeChange = idx => evt => {
        const newLocations = this.state.locations.map((location1, sidx) => {
            if (idx !== sidx) return location1;
            return { ...location1, countryCode: evt.target.value }
        });

        this.setState({ locations: newLocations });
    }

    render() {
        return (
            <Form onSubmit={(event, data) => this.handleSubmit(event, data)}>
                <Form.Field>
                    <Form.Input
                        placeholder='Trip Name'
                        label='Trip Name'
                        name='trip_name'
                        onChange={this.handleChange}
                        autoComplete='off'
                    />
                </Form.Field>

                <Form.Group widths='equal'>
                    <Form.Field>
                        <DateInput
                            dateFormat={'MM-DD-YYYY'}
                            value={this.state.start_date}
                            label='From'
                            name='start_date'
                            clearable
                            closable
                            onChange={this.handleChange}
                            autoComplete='off'
                        />
                    </Form.Field>

                    <Form.Field>
                        <DateInput
                            dateFormat={'MM-DD-YYYY'}
                            value={this.state.end_date}
                            label='To'
                            name='end_date'
                            clearable
                            closable
                            initialDate={this.state.start_date}
                            minDate={this.state.start_date}
                            onChange={this.handleChange}
                            autoComplete='off'
                        />
                    </Form.Field>
                </Form.Group>

                {this.state.locations.map((location1, idx) => (
                    <Form.Group >
                            <Form.Input
                                placeholder={`Location #${idx + 1} Name`}
                                value={location1.name}
                                onChange={this.handleLocationNameChange(idx)}
                                autoComplete='off'
                            />

                            <Form.Input
                                placeholder={`Latitude`}
                                value={location1.latitude}
                                onChange={this.handleLocationLatitudeChange(idx)}
                                autoComplete='off'
                            />

                            <Form.Input
                                placeholder={`Longitude`}
                                value={location1.longitude}
                                onChange={this.handleLocationLongitudeChange(idx)}
                                autoComplete='off'
                            />

                            <Form.Input
                                placeholder={`Country Code`}
                                value={location1.countryCode}
                                onChange={this.handleLocationCountryCodeChange(idx)}
                                autoComplete='off'
                            />

                            <Button
                                type='button'
                                onClick={this.handleRemoveLocation(idx)}
                            >
                            -
                            </Button>
                    </Form.Group>
                ))}
                <Button
                    type='button'
                    onClick={this.handleAddLocation}
                >
                    Add Location
                </Button>

                <Button type='submit'>Submit</Button>
            </Form>
        )
    }
}

export default AddTrip;
