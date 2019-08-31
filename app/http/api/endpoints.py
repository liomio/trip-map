from .middlewares import login_required
from flask import Flask, json, g, request
from app.trip.service import Service as Trip
from app.trip.schema import ItinerarySchema
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/trips", methods=["GET"])
@login_required
def index():
 return json_response(Trip(g.user).find_all_trips())


@app.route("/trips", methods=["POST"])
@login_required
def create():
   itinerary_repo = ItinerarySchema().load(json.loads(request.data))
  
   if itinerary_repo.errors:
     return json_response({'error': itinerary_repo.errors}, 422)

   trip = Trip(g.user).create_trip_for(itinerary_repo)
   return json_response(trip)


@app.route("/trip/<int:itinerary_id>", methods=["GET"])
@login_required
def show(itinerary_id):
 trip = Trip(g.user).find_trip(itinerary_id)

 if trip:
   return json_response(trip)
 else:
   return json_response({'error': 'trip not found'}, 404)


@app.route("/trip/<int:itinerary_id>", methods=["PUT"])
@login_required
def update(itinerary_id):
   itinerary_repo = ItinerarySchema().load(json.loads(request.data))
  
   if itinerary_repo.errors:
     return json_response({'error': itinerary_repo.errors}, 422)

   trip_service = Trip(g.user)
   if trip_service.update_trip_with(itinerary_id, itinerary_repo):
     return json_response(itinerary_repo.data)
   else:
     return json_response({'error': 'trip not found'}, 404)

  
@app.route("/trip/<int:itinerary_id>", methods=["DELETE"])
@login_required
def delete(itinerary_id):
 trip_service = Trip(g.user)
 if trip_service.delete_trip_for(itinerary_id):
   return json_response({})
 else:
   return json_response({'error': 'trip not found'}, 404)


def json_response(payload, status=200):
 return (json.dumps(payload), status, {'content-type': 'application/json'})
