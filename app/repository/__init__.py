class Repository(object):
 def __init__(self, adapter=None):
   self.client = adapter()

 def find_all(self, selector):
   return self.client.find_all(selector)
 
 def find(self, selector):
   return self.client.find(selector)
 
 def create(self, trip):
   return self.client.create(trip)
  
 def update(self, selector, trip):
   return self.client.update(selector, trip)
  
 def delete(self, selector):
   return self.client.delete(selector)
