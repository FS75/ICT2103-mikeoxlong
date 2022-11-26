--VERSION 5--
STEP 1: MasterCreate_v4.1.sql

--VERSION 4 OUTDATED--
STEP 1: MasterCreate_v3.2.sql

--VERSION 3 OUTDATED--

STEP 1: MasterCreate_v2.sql
STEP 2: createIndex.sql
STEP 3: createView.sql
STEP 4: updateMRTLatLong.sql

--VERSION 2 OUTDATED--

STEP 1: MasterCreate_v1.sql
STEP 2: updateMRTStation.sql
STEP 3: updateTaxiStand.sql
STEP 4: createIndex.sql
STEP 5: createView.sql
STEP 6: updateMRTLatLong.sql

--VERSION 1 OUTDATED--

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
STEP 8: createIndex.sql
STEP 9: createView.sql
STEP 10: updateMRTLatLong.sql

