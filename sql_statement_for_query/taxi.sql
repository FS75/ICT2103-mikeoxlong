/*
Use to find taxi based on roadname or description
Example:WHERE NAME LIKE '%Bedok%';
*/
SELECT TaxiCode, IF(Bfa = 1, 'YES', 'No') as "Barrier Free", Type, Name, StnCode as "Nearest MRT"
FROM Taxi_Stand WHERE Name LIKE '%%';

/*
Find all Taxi Stand at MRT that the Bus Service pass through
Can include direction
Example:WHERE ServiceNo = '98';
*/
SELECT Name
FROM Taxi_Stand taxi
WHERE taxi.StnCode IN (
SELECT DISTINCT mrt.StnCode
FROM MRT_Station mrt
LEFT JOIN bus_route br ON mrt.busStopCode = br.busStopCode
WHERE ServiceNo = '98');

