download compass from :https://www.mongodb.com/try/download/compass

After installing, use cmd to connect to dbpath

(dbpath -> where you store the mongodb bin\data\db)

type the below command:
mongod --dbpath=C:\mongodb-win32-x86_64-windows-5.0.13\bin\data\db

Open MongoDB Compass
Create database -> any db name, any collection name 

After successfully creating DB:

add 3 collections:

1. bus_directory
2. bus_stops
3. other_transportation

Add the json files into the collection:

1. bus_directory -> import bus_directory.json from noSQLDB folder
2. bus_stops -> import bus_stop.json from noSQLfolder
2. other_transportation -> import other_transportation.json from noSQLfolder

Set up is all done can proceed to query