from ..repository import Repository
from ..repository.mongo import MongoRepository
from .schema import TripSchema

class Service(object):
 def __init__(self, user_id, repo_client=Repository(adapter=MongoRepository)):
   self.repo_client = repo_client
   self.user_id = user_id

   if not user_id:
     raise Exception("user id not provided")

 def find_all_trips(self):
   trips  = self.repo_client.find_all({'user_id': self.user_id})
   return [self.dump(trip) for trip in trips]

 def find_trip(self, itinerary_id):
   trip = self.repo_client.find({'user_id': self.user_id, 'itinerary_id': itinerary_id})
   return self.dump(trip)

 def create_trip_for(self, itinerary):
   self.repo_client.create(self.prepare_trip(itinerary))
   return self.dump(itinerary.data)

 def update_trip_with(self, itinerary_id, itinerary):
   records_affected = self.repo_client.update({'user_id': self.user_id, 'itinerary_id': itinerary_id}, self.prepare_trip(itinerary))
   return records_affected > 0

 def delete_trip_for(self, itinerary_id):
   records_affected = self.repo_client.delete({'user_id': self.user_id, 'itinerary_id': itinerary_id})
   return records_affected > 0

 def dump(self, data):
   return TripSchema(exclude=['_id']).dump(data).data

 def prepare_trip(self, itinerary):
   data = itinerary.data
   data['user_id'] = self.user_id
   return data
