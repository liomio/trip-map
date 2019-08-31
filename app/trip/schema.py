from marshmallow import Schema, fields

class ItinerarySchema(Schema):
    id = fields.Int(required=True)
    itinerary_name = fields.Str()
    full_name = fields.Str()
    start_date = fields.Date()
    end_date = fields.Date()

class TripSchema(ItinerarySchema):
    user_id = fields.Email(required=True)
