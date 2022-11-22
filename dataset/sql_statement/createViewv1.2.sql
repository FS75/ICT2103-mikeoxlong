/*
Create View Table to showcase number of bus services that start at the interchange or terminal
*/
CREATE VIEW BusInterchange_Services_StartOnly AS
SELECT COUNT(ServiceNo) as "BusServicesAvailable", OriginCode as "BusStopCode", bs.Description, bs.RoadName
FROM bus_direction bd JOIN bus_stop bs
ON bd.OriginCode = bs.BusStopCode
WHERE bs.Description LIKE "% int" OR bs.Description LIKE "%ter"  OR bs.Description LIKE "%terminal"
GROUP BY OriginCode
ORDER BY bs.Description ASC;

/*
Create View Table to showcase bus services that start/pass by the interchange or terminal
*/
CREATE VIEW BusInterchange_BusServices AS
SELECT query1_table.*
FROM
(/*---QUERY 1 LABELED AS q1; GET ALL BUS SERVICES THAT THAT START/PASS/END AT INT/TER/TERMINAL---*/
SELECT q1_br.ServiceNo, q1_br.Direction, q1_br.BusStopCode, q1_br.StopSequence, q1_bs.RoadName, q1_bs.Description
FROM bus_route q1_br JOIN bus_stop q1_bs
ON q1_br.BusStopCode = q1_bs.BusStopCode
WHERE q1_bs.Description LIKE "% int" OR q1_bs.Description LIKE "%ter"  OR q1_bs.Description LIKE "%terminal"
) query1_table
LEFT JOIN
(/*---QUERY 2 LABELED AS q2; GET ROW OF ALL END POINT OF BUS SERVICES---*/
SELECT q2_br1.ServiceNo, q2_br1.Direction, q2_br1.BusStopCode, q2_br1.StopSequence
FROM bus_route q2_br1 
WHERE Stopsequence = 
/*---GET LAST STOP SEQUENCE--*/
(SELECT MAX( q2_br2.Stopsequence )
FROM bus_route q2_br2
WHERE q2_br1.ServiceNo = q2_br2.ServiceNo AND q2_br1.Direction = q2_br2.Direction)
) query2_table
ON query1_table.BusStopCode =  query2_table.BusStopCode AND
query1_table.ServiceNo =  query2_table.ServiceNo AND
query1_table.Direction =  query2_table.Direction AND
query1_table.StopSequence =  query2_table.StopSequence
/*---LEFT OUTER JOIN CONDITION---*/
WHERE query2_table.ServiceNo IS NULL
/*---This is to filter out bus stop that is not a origin ---*/
AND query1_table.BusStopCode IN
(SELECT OriginCode FROM bus_direction);


/*
Create View Table to showcase distinct number of bus services that start/pass by the interchange or terminal
*/
CREATE VIEW BusInterchange_Services AS
SELECT COUNT(DISTINCT(ServiceNo)) as "BusServicesAvailable", BusStopCode, Description, RoadName
FROM BusInterchange_BusServices
GROUP BY BusStopCode;