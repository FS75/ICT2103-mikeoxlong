/*
Use to find taxi based on roadname or description
Example:WHERE NAME LIKE '%Bedok%';
*/
SELECT TaxiCode, IF(Bfa = 1, 'YES', 'No') as "Barrier Free", Type, Name, StnCode as "Nearest MRT"
FROM Taxi_Stand WHERE Name LIKE '%%';


