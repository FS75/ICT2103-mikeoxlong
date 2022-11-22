This folders contain all the individual SQL queries/files to CREATE & INSERT data into our Database (SQL & noSQL)
and also the raw JSON files that we have accquired through LTA Datamall or Data GOV

[file] - bus_route_scrape.py
>> This is a simple python script for us to scrape bus route data off Datamall in a more efficent manner
>> due to the limitation of 500 routes per call. By running this script, we can retrieve all the routes quickly

[folder] - noSQL
>> This folder contains all raw JSOn files used to create our 2 collections, bus_directory and location. 
>> We also utilised the ExtractBusRoute python script to combine json files efficiently
>> The ExtractOtherTransport python script is used to extract either MRT/TAXI data efficient from the .xls files exported from MYSQL

[folder] - noSQL_setup
>> This folder contains 2 folders, MongoDBCompass setup and MongoSH setup
>> MongoDBCompass will have all the necessary files to set up our DB using the Mongo compass GUI
>> MongoSH will have all the queries needed to set up our DB using the Mongo command shell

[folder] - raw_static_dataset
>> This folders contain the raw JSON files that we have accquired through LTA Datamall or Data GOV
>> It also contain a simple python script we written to scrape bus route data off Datamall in a more efficent manner
>> due to the limitation of 500 routes per call. By running this script, we can retrieve all the routes quickly
>> After we have accquired all the JSON files, we then manually combine them into their respective json files

[folder] - sql_statement
>> This folder contains the sql statement that we have used and improved over the course of the project
>> The SQL used especially the older file might not be up to date as we have often rely on the MasterCreate
>> as a quicker way to update our database instead

[folder] - sql_statement_final
>> This folder contains the sql statement that has been properly updated and clean and should be used
>> for the final product. The files found here are references from sql_statement but presented in a more
>> organized and understandable format
