/*
Use to find mrt based on description
Example:WHERE MRTStation LIKE '%Bedok%';
*/
SELECT * FROM MRT_Station WHERE MRTStation LIKE '%%';


/*
Find MRT Station for the Service No selected by user
Example:WHERE ServiceNo = '98';
*/
SELECT DISTINCT mrt.StnCode, mrt.MRTStation, mrt.MRTLine
FROM MRT_Station mrt
LEFT JOIN bus_route br ON mrt.busStopCode = br.busStopCode
WHERE ServiceNo = '';


 /*
 Shows where this bus service reaches other bus services
 */
SELECT serviceNo, busStopCode, stopSequence, count(busStopCode)
FROM bus_route
WHERE BusStopCode IN (
SELECT busStopCode FROM bus_route
WHERE serviceNo = "98")
GROUP BY serviceNo
ORDER BY serviceNo;
 









