import json
import urllib
from urlparse import urlparse
import httplib2 as http
#External library
if __name__=="__main__":
#Authentication parameters
    headers = { 'AccountKey' : 'YOUR-API-HERE','accept' : 'application/json'} #this is by default
#API parameters

    with open("bus_routes.json", "w") as outfile:
        for x in range(0,25500,500):
            print(x)
            uri = 'http://datamall2.mytransport.sg' #Resource URL
            path = '/ltaodataservice/BusRoutes?$skip=' + str(x)
        #Build query string & specify type of API call
            target = urlparse(uri + path)
            print (target.geturl())
            method = 'GET'
            body = ''
            h = http.Http()
            response, content = h.request(
            target.geturl(),
            method,
            body,
            headers)
            jsonObj = json.loads(content)
            #print (json.dumps(jsonObj, sort_keys=True, indent=4))
                #Saving jsonObj["d"]
            json.dump(jsonObj, outfile, sort_keys=True, indent=4, ensure_ascii=False)