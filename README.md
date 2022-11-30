# A project for ICT 2103 done by Group mikeoxlong

## PRE-REQUISITE
### STEP 1: Ensure you have Node.js installed https://nodejs.org/en/download/
### STEP 2: Download mongoDB compass from :https://www.mongodb.com/try/download/compass

## PRE-REQUISITE SQL
### STEP 1: Run dataset/sql_statement_final/MasterCreate.sql to populate your database with data
### STEP 2: Open backend/database_sql.js
### STEP 3: Edit "Use Your Own Connection Here" with your own DB connection

### Sample Connection (replace with your own):
![image](https://user-images.githubusercontent.com/93301912/204802911-1227507a-2525-422f-a4f4-9b9babf33690.png)

## PRE-REQUISITE MongoDB
## Version 1: MongoDB Compass (Recommended)
### STEP 1: Open CMD to connect to dbpath (dbpath -> where is saved on ur local computer)
e.g mongod --dbpath=C:\mongodb-win32-x86_64-windows-5.0.13\bin\data\db
### STEP 2: Create database -> dbname: ICT2103, collection name: bus_directory
### STEP 3: Add another collection name: locations
### STEP 4: Insert collection data using json files 
located in ICT2103-mikeoxlong\dataset\noSQL_setup\MongoDBCompass setup\noSQLDB
### STEP 4.1: Insert bus_directory.json into bus_directory collection
### STEP 4.2: Insert locations.json into locations collection
### STEP 5: Create Indexes using mongosh provided in mongoDB Compass (rmb to "use ICT2103" <- DB name)
### STEP 5.1: insert the following command:
#### db.bus_directory.createIndex( { ServiceNo:1 } )
#### db.bus_directory.createIndex( { "Route.BusStopCode":1 } )
#### db.locations.createIndex( { BusStopCode:1 } )
#### db.locations.createIndex( { Description:1 } )
### STEP 6: create views located in ICT2103-mikeoxlong\dataset\noSQL_setup
### Create views in this sequence View1 -> View 2

## Version 2: Mongosh
### All required files for this section is located here:
![image](https://user-images.githubusercontent.com/90229655/204809777-f886dfff-f049-416d-bf21-306fd569ee92.png)

### STEP 1: Open 1st CMD to connect to dbpath (dbpath -> where is saved on ur local computer)
#### e.g mongod --dbpath=C:\mongodb-win32-x86_64-windows-5.0.13\bin\data\db
### STEP 2: Open 2nd CMD and enter: mongo
### STEP 3: "use ICT2103" <- Created DB in mongosh
### STEP 4: Create collections in mongosh:
#### db.createCollection("bus_directory")
#### db.createCollection("locations")
### STEP 5: Insert data into bus_directory:
#### Copy and paste everything in insert_bus_directory.txt
### STEP 6: Insert data into locations:
#### Copy and paste each txt file into mongosh:
#### a. insert_bus_stops.txt
#### b. insert_MRT.txt
#### c. insert_Taxi.txt
### STEP 7: Create indexes (refresh compass)
#### Copy and paste create_indexes.txt
#### Required files for this section is located here:
![image](https://user-images.githubusercontent.com/90229655/204810759-cc617edd-d7f8-4077-b52b-359cd49c0564.png)
### STEP 8: Create views in this sequence View1 -> View 2 (refresh compass)
#### Copy and paste View1.txt in mongosh -> Copy and paste View2.txt in mongosh

## Setup Complete
### STEP 1: Ensure that cmd Mongo connection is on
### STEP 2: Ensure that MongoDB PORT is 27017 (by default), proceed to STEP 2.1 if it is not
### STEP 2.1: Open backend/database_mongo.js
### STEP 2.2: Edit URL constant with your own PORT

### Sample PORT (replace with your own if not default 27017):
![image](https://user-images.githubusercontent.com/93301912/204803713-06a2283f-170f-466e-b123-a5a6a8889159.png)


## VARIANT 1 SET UP (IF DOESN'T WORK, TRY VARIANT 2)
### STEP 1: Run setup.sh

## VARIANT 2 SET UP
### STEP 1: Open Command Line
### STEP 2: Run 'cd frontend/2103-project'
### STEP 3: Run 'npm install'
### STEP 4: Run 'npm update'

## TO RUN VARIENT 1 (IF DOESN'T WORK, TRY VARIANT 2)
### STEP 1.1: open start_sql.sh (SQL variation)
### STEP 1.2: open start_mongo.sh (MongoDB variation)

## TO RUN VARIENT 2
### STEP 1: Open Command Line
### STEP 2: Run 'cd frontend/2103-project'
### STEP 3.1: Run 'npm run dev' (SQL variation)
### Step 3.2: Run 'npm run build' (MongoDB variation)


