This folders contain all the individual SQL queries/files to CREATE & INSERT data into our Database(SQL)

You will find 9 files here which are split into 4 categories
- CREATE TABLE
    - createTable.sql
- CREATE INDEX
    - createIndex.sql
- CREATE VIEW
    - createView.sql
- INSERT DATA
    - insertBusStop.sql
    - insertBusService.sql
    - insertBusDirection.sql
    - insertBusRoute.sql
    - insertMRTStation.sql
    - insertTaxiStand.sql

The files are there for references only

Pre-requisite
1. Do ensure you have already set up SQL on your PC
2. Create a new schema called "bus_directory"
3. Ensure that you are on the schema you have just created

To install/set up the Database, you may choose to run
-> MasterCreate.sql

If there is any crash or whatsoever such as lag, you may proceed to run each file individual in a 
sequential way from CREATE TABLE -> CREATE INDEX -> CREATE VIEW -> INSERT DATA

Once you have run the query, the database is ready to be used.