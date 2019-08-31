import os
from pymongo import MongoClient

COLLECTION_NAME = 'trips'

class MongoRepository(object):
    def __init__(self):
        mongo_url = os.environ.get('MONGO_URL')
        self.db = MongoClient(mongo_url).trips

    def find_all(self, selector):
        return self.db.trips.find(selector)

    def find(self, selector):
        return self.db.trips.find_one(selector)

    def create(self, trip):
        return self.db.trips.insert_one(trip)

    def update(self, selector, trip):
        return self.db.trips.replace_one(selector, trip).modified_count

    def delete(self, selector):
        return self.db.trips.delete_one(selector).deleted_count
