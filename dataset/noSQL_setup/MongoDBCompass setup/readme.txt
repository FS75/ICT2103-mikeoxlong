download compass from :https://www.mongodb.com/try/download/compass

After installing, use cmd to connect to dbpath

(dbpath -> where you store the mongodb bin\data\db)

type the below command:
mongod --dbpath=C:\mongodb-win32-x86_64-windows-5.0.13\bin\data\db

Open MongoDB Compass
Create database -> any db name, any collection name 

After successfully creating DB:

add 2 collections:

1. bus_directory
2. locations

Add the json files into the collection:
Located at: \2103\ICT2103-mikeoxlong\dataset\noSQL_setup\MongoDBCompass setup\noSQLDB

1. bus_directory -> import bus_directory.json from noSQLDB folder
2. locations -> import locations.json from noSQLDB folder

Add indexes to speed up search when selecting certain field
Open MONGOSH in MongoDBCompass and insert the following:

To use MongoSH, please enter
use ICT2103 -> this will switch the database used

db.bus_directory.createIndex( { ServiceNo:1 } )
db.bus_directory.createIndex( { "Route.BusStopCode":1 } )
db.locations.createIndex( { BusStopCode:1 } )
db.locations.createIndex( { Description:1 } )

Lastly add in the views in this sequence:
(found in noSQL_setup)

View1.txt -> View2.txt


Set up is all done can proceed to perform queries