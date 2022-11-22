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
Create View Table to showcase number of bus services that start/pass by the interchange or terminal
*/
CREATE VIEW BusInterchange_Services AS
SELECT (IFNULL(query1_table.Count1,0) - IFNULL(query2_table.Count2,0)) as "BusServicesAvailable", query1_table.BusStopCode, bs.Description, bs.RoadName
FROM
(/*---QUERY 1 LABELED AS q1; GET ALL BUS SERVICES THAT THAT START/PASS/END AT INT/TER/TERMINAL---*/
SELECT COUNT(q1_br.ServiceNo) as "Count1", q1_br.BusStopCode
FROM bus_route q1_br JOIN bus_stop q1_bs
ON q1_br.BusStopCode = q1_bs.BusStopCode
WHERE q1_bs.Description LIKE "% int" OR q1_bs.Description LIKE "%ter"  OR q1_bs.Description LIKE "%terminal"
GROUP BY q1_br.BusStopCode
) query1_table
LEFT JOIN
(/*---QUERY 2 LABELED AS q2; GET ROW OF ALL END POINT OF BUS SERVICES---*/
SELECT COUNT(q2_br1.ServiceNo) as "Count2", q2_br1.BusStopCode
FROM bus_route q2_br1 
WHERE Stopsequence = 
/*---GET LAST STOP SEQUENCE--*/
(SELECT MAX( q2_br2.Stopsequence )
FROM bus_route q2_br2
WHERE q2_br1.ServiceNo = q2_br2.ServiceNo AND q2_br1.Direction = q2_br2.Direction)
GROUP BY q2_br1.BusStopCode
) query2_table
ON query1_table.BusStopCode =  query2_table.BusStopCode
/*---This join is to get bus stop description---*/
LEFT JOIN Bus_Stop bs
ON query1_table.BusStopCode = bs.BusStopCode
/*---This is to filter out bus stop that is not a origin ---*/
WHERE query1_table.BusStopCode IN
(SELECT OriginCode FROM bus_direction)
/*---This is to filter out bus stop has 0 services ---*/
HAVING BusServicesAvailable>0
/*---This is to sort by bus stop code ---*/
ORDER BY BusStopCode;