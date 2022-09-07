DROP TABLE IF EXISTS Bus_Route;
DROP TABLE IF EXISTS Bus_Direction;
DROP TABLE IF EXISTS Bus_Services;
DROP TABLE IF EXISTS Bus_Stop;

CREATE TABLE Bus_Stop(
BusStopCode INT NOT NULL PRIMARY KEY,
RoadName VARCHAR (50) NOT NULL,
Description VARCHAR (50) NOT NULL,
Latitude DOUBLE NOT NULL,
Longitude DOUBLE NOT NULL
);

CREATE TABLE Bus_Services(
ServiceNo VARCHAR(5) NOT NULL PRIMARY KEY,
Operator VARCHAR(10) NOT NULL,
Category VARCHAR(10) NOT NULL
);

CREATE TABLE Bus_Direction(
ServiceNo VARCHAR(5) NOT NULL,
Direction INT NOT NULL,
OriginCode INT NOT NULL,
DestinationCode INT NOT NULL,
AMPeakFreq VARCHAR(10),
AMOffpeakFreq VARCHAR(10),
PMPeakFreq VARCHAR(10),
PMOffpeakFreq VARCHAR(10),
LoopDesc VARCHAR(50),
FOREIGN KEY (ServiceNo) REFERENCES Bus_Services(ServiceNo),
PRIMARY KEY (ServiceNo, Direction)
);

CREATE TABLE Bus_Route(
ServiceNo VARCHAR(5) NOT NULL,
Direction INT NOT NULL,
BusStopCode INT NOT NULL,
Distance DOUBLE NOT NULL,
StopSequence INT NOT NULL,
SATFirstBus INT,
SATLastBus INT,
SUNFirstBus INT,
SUNLastBus INT,
WDFirstBus INT,
WDLastBus INT,
FOREIGN KEY (ServiceNo, Direction) REFERENCES Bus_Direction(ServiceNo, Direction),
FOREIGN KEY (BusStopCode) REFERENCES Bus_Stop(BusStopCode)
);