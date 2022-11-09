/*
Find the number of bus services at bus interchange/terminal
*/
CREATE VIEW BusInterchange_Services AS
SELECT COUNT(ServiceNo) as "Bus Services Available", OriginCode as "Bus Stop Code", bs.Description, bs.RoadName
FROM bus_direction bd JOIN bus_stop bs
ON bd.OriginCode = bs.BusStopCode
WHERE bs.Description LIKE "%int%" OR bs.Description LIKE "%ter%"
GROUP BY OriginCode
ORDER BY bs.Description ASC