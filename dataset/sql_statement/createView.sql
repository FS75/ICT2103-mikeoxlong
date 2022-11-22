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
SELECT COUNT(startpass_table.ServiceNo) as "BusServicesAvailable", startpass_table.BusStopCode, bs.Description, bs.RoadName
FROM
/*---THE QUERY BELOW RETURN ALL BUS SERVICES THAT START/PASS BY INT/TER/TERMINAL LABEL AS startpass_table---*/
(
/*---QUERY 1 LABELED AS q1
GET ALL BUS SERVICES THAT THAT START/PASS/END AT INT/TER/TERMINAL---*/
SELECT q1_br.ServiceNo, q1_br.Direction, q1_br.BusStopCode, q1_br.Distance, q1_br.Stopsequence
FROM bus_route q1_br JOIN bus_stop q1_bs
ON q1_br.BusStopCode = q1_bs.BusStopCode
WHERE q1_bs.Description LIKE "% int" OR q1_bs.Description LIKE "%ter"  OR q1_bs.Description LIKE "%terminal"

EXCEPT /*---REMOVE END POINT FROM QUERY 1 SINCE WE DON'T WANT BUS SERVICES THAT END THERE---*/

/*---QUERY 2 LABELED AS q2
GET ROW OF ALL END POINT OF BUS SERVICES---*/
SELECT q2_br1.ServiceNo, q2_br1.Direction, q2_br1.BusStopCode, q2_br1.Distance, q2_br1.Stopsequence
FROM bus_route q2_br1 
WHERE Stopsequence = 
/*---GET LAST STOP SEQUENCE--*/
(SELECT MAX( q2_br2.Stopsequence )
FROM bus_route q2_br2
WHERE q2_br1.ServiceNo = q2_br2.ServiceNo AND q2_br1.Direction = q2_br2.Direction)
) startpass_table 
JOIN bus_stop bs /*---THIS JOIN IS GET THE DESCRIPTION AND ROADNAME---*/
ON startpass_table.BusStopCode = bs.BusStopCode
WHERE startpass_table.BusStopCode IN 
/*---GET ALL BUSSTOP THAT IS A STARTING POINT, THIS IS TO PREVENT BUS STOP DESCRIPTION 
THAT MIGHT HAVE INT/TER/TERMINAL SUCH AS 'BEF KAMPONG BAHRU TER'---*/
(SELECT OriginCode FROM bus_direction)
GROUP BY bs.BusStopCode;