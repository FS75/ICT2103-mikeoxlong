import json

 # To be written to a file
counter = 1
busRoutesJSONFile = open('bus_routes.json')
busServicesJSONFile = open('../raw_static_dataset/bus_services.json')
busServicesData = json.load(busServicesJSONFile)['value']
busRoutesData = json.load(busRoutesJSONFile)['value']
newBusServicesData = []


# Loop through bus services 
    # Get service no and direction
        # Use sN and d to find the routes
            # Remove sN and d from routes
                # Append it to the bus service

# Iterating through the json list
def getBusRoutes(passedBusRoutesData, serviceNo, direction):
    busRoutesList = []
    for busRoute in passedBusRoutesData:
        if busRoute["ServiceNo"] == serviceNo and busRoute["Direction"] == direction:
            busRoutesList.append(busRoute)
    return busRoutesList

for busService in busServicesData:
    serviceNo = busService.get("ServiceNo")
    direction = busService.get("Direction")
    busRoutesList2 = getBusRoutes(busRoutesData, serviceNo, direction)

    idData = {"id": counter}
    busService = {**idData, **busService}

    busService.update({"Route": busRoutesList2})
    newBusServicesData.append(busService)
    counter += 1

for busService in newBusServicesData:
    for route in busService["Route"]:
        print(route)
        del route["ServiceNo"]
        del route["Direction"]
        

with open('bus_directory_test.json', 'w') as busDirectoryTest:
    busDirectoryTest.write(json.dumps(newBusServicesData))

busRoutesJSONFile.close()
busServicesJSONFile.close()