/*------BUS ROUTE INDEX------*/
CREATE INDEX idx_busservice
ON bus_route (ServiceNo);

CREATE INDEX idx_busstop_code
ON bus_route (BusStopCode);

/*------BUS STOP INDEX------*/
CREATE INDEX idx_busstop_code
ON bus_stop (BusStopCode);

/*------BUS DIRECTION INDEX------*/
CREATE INDEX idx_busservice
ON bus_direction (ServiceNo);

/*------MRT INDEX------*/
CREATE INDEX idx_mrt_description
ON mrt_station (MRTStation);

/*------TAXI STAND INDEX------*/
CREATE INDEX idx_taxi_name
ON taxi_stand (Name);