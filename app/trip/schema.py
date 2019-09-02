from marshmallow import Schema, fields

class ItinerarySchema(Schema):
    id = fields.Int(required=True)
    itinerary_name = fields.Str()
    full_name = fields.Str()
    start_date = fields.Date()
    end_date = fields.Date()
    #TODO add lists to schema
    #countries = fields.List()
    #detailed_itinerary = fields.List()

class TripSchema(ItinerarySchema):
    user_id = fields.Email(required=True)
