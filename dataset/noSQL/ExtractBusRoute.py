import json

f = open('bus_routes.json')
# returns JSON object as
# a dictionary
data = json.load(f)
list1 = []
# Iterating through the json
# list
print(type(data['value']))
for i in data['value']:
    if i['ServiceNo'] == '193' and i['Direction'] == 1:
        list1.append(i)

with open('myfile.txt', 'w') as convert_file:
    convert_file.write(json.dumps(list1))
f.close()
