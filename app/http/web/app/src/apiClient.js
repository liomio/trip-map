import axios from 'axios';

const BASE_URI = 'http://localhost:4433';

const client = axios.create({
    baseURL: BASE_URI,
    json: true
});

class APIClient {

    constructor(accessToken) {
        this.accessToken = accessToken;
    }

    createTrip(itinerary) {
        return this.perform('post', '/trips', itinerary);
    }

    deleteTrip(itinerary) {
        return this.perform('delete', `/trips/${itinerary.id}`);
    }

    updateTrip(itinerary) {
        return this.perform('update', `/trips/${itinerary.id}`);
    }

    getTrips() {
        return this.perform('get', '/trips');
    }

    getTrip(itinerary) {
        return this.perform('get', `/trips/${itinerary.id}`);
    }

    async perform(method, resource, data) {
        return client({
            method,
            url: resource,
            data,
            headers: {
                Authorization: `Bearer ${this.accessToken}`
            }
        }).then(resp => {
            console.log(resp);
            return resp.data ? resp.data : [];
        })
    }
}

export default APIClient;
