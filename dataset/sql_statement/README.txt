--VERSION 1--

STEP 1: CreateTable.sql
STEP 2: InsertALL.sql
IF STEP 2 LAG:
	STEP a: InsertBusStop.sql
	STEP b: InsertBusServices.sql
	STEP c: InsertBusDirection.sql
	STEP d:	InsertBusRoute.sql
STEP 3: CreateTable_2.sql
STEP 4: insertTaxiStand.sql
STEP 5: insertMRTStation.sql
STEP 6: updateMRTStation.sql
STEP 7: updateTaxiStand.sql

--VERSION 2--

STEP 1: MasterCreate_v1.sql
STEP 2: updateMRTStation.sql
STEP 2: updateTaxiStand.sql


--VERSION 3--

STEP 1: MasterCreate_v2.sql