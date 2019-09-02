from functools import wraps
from flask import request, g, abort
from jwt import decode, exceptions
import json

def login_required(f):
   @wraps(f)
   def wrap(*args, **kwargs):
       #TODO add authorization
       #authorization = request.headers.get("authorization", None)
       authorization = True
       if not authorization:
           return json.dumps({'error': 'no authorization token provied'}), 403, {'Content-type': 'application/json'}
      
       try:
           #TODO add authorization token
           #token = authorization.split(' ')[1]
           #resp = decode(token, None, verify=False, algorithms=['HS256'])
           #g.user = resp['sub']
           g.user = 'liomio'
       except exceptions.DecodeError as identifier:
           return json.dumps({'error': 'invalid authorization token'}), 403, {'Content-type': 'application/json'}
      
       return f(*args, **kwargs)
 
   return wrap
