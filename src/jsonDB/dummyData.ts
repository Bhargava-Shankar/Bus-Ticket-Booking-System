import { BusConditioningType,BusSeatingType } from "@prisma/client";

    //INSERTING DUMMY JSON DATA TO DB
    //    data.map(async (busData) => {
    //     console.log()
    //     await db.bus.create({
    //         data: busData
    //     })
    // })
    // res.send("SUCCESS")
const dummyData = [
  {
    "busNumber": "BN1001",
    "travelsName": "Best Travels",
    "source": "City A",
    "destination": "City B",
    "arrivalTime": "2024-06-21T14:30:00Z",
    "departureTime": "2024-06-21T08:00:00Z",
    "conditioningType": BusConditioningType.AC,
    "seatingType": BusSeatingType.SLEEPER,
    "seatsAvailable": 10,
    "totalSeats": 40
  },
  {
    "busNumber": "BN1002",
    "travelsName": "Happy Journeys",
    "source": "City C",
    "destination": "City D",
    "arrivalTime": "2024-06-21T16:45:00Z",
    "departureTime": "2024-06-21T10:15:00Z",
    "conditioningType": BusConditioningType.NON_AC,
    "seatingType": BusSeatingType.SEMI_SLEEPER,
    "seatsAvailable": 20,
    "totalSeats": 50
  },
  {
    "busNumber": "BN1003",
    "travelsName": "Comfort Rides",
    "source": "City E",
    "destination": "City F",
    "arrivalTime": "2024-06-21T19:00:00Z",
    "departureTime": "2024-06-21T12:30:00Z",
    "conditioningType": BusConditioningType.AC,
    "seatingType": BusSeatingType.SEMI_SLEEPER,
    "seatsAvailable": 15,
    "totalSeats": 45
  },
  {
    "busNumber": "BN1004",
    "travelsName": "Speedy Travels",
    "source": "City G",
    "destination": "City H",
    "arrivalTime": "2024-06-21T21:15:00Z",
    "departureTime": "2024-06-21T15:45:00Z",
    "conditioningType": BusConditioningType.NON_AC,
    "seatingType": BusSeatingType.SLEEPER,
    "seatsAvailable": 25,
    "totalSeats": 55
  },
  {
    "busNumber": "BN1005",
    "travelsName": "Swift Transit",
    "source": "City I",
    "destination": "City J",
    "arrivalTime": "2024-06-21T23:30:00Z",
    "departureTime": "2024-06-21T18:00:00Z",
    "conditioningType": BusConditioningType.AC,
    "seatingType": BusSeatingType.SEMI_SLEEPER,
    "seatsAvailable": 30,
    "totalSeats": 60
  },
  {
    "busNumber": "BN1006",
    "travelsName": "Luxury Lines",
    "source": "City K",
    "destination": "City L",
    "arrivalTime": "2024-06-22T01:45:00Z",
    "departureTime": "2024-06-21T20:15:00Z",
    "conditioningType": BusConditioningType.NON_AC,
    "seatingType": BusSeatingType.SLEEPER,
    "seatsAvailable": 5,
    "totalSeats": 35
  },
  {
    "busNumber": "BN1007",
    "travelsName": "Economy Travels",
    "source": "City M",
    "destination": "City N",
    "arrivalTime": "2024-06-22T04:00:00Z",
    "departureTime": "2024-06-21T22:30:00Z",
    "conditioningType": BusConditioningType.AC,
    "seatingType": BusSeatingType.SEMI_SLEEPER,
    "seatsAvailable": 12,
    "totalSeats": 42
  },
  {
    "busNumber": "BN1008",
    "travelsName": "Express Voyages",
    "source": "City O",
    "destination": "City P",
    "arrivalTime": "2024-06-22T06:15:00Z",
    "departureTime": "2024-06-22T00:45:00Z",
    "conditioningType": BusConditioningType.NON_AC,
    "seatingType": BusSeatingType.SLEEPER,
    "seatsAvailable": 22,
    "totalSeats": 52
  },
  {
    "busNumber": "BN1009",
    "travelsName": "Comfort Bus",
    "source": "City Q",
    "destination": "City R",
    "arrivalTime": "2024-06-22T08:30:00Z",
    "departureTime": "2024-06-22T03:00:00Z",
    "conditioningType": BusConditioningType.AC,
    "seatingType": BusSeatingType.SEMI_SLEEPER,
    "seatsAvailable": 18,
    "totalSeats": 48
  },
  {
    "busNumber": "BN1010",
    "travelsName": "Journey Plus",
    "source": "City S",
    "destination": "City T",
    "arrivalTime": "2024-06-22T10:45:00Z",
    "departureTime": "2024-06-22T05:15:00Z",
    "conditioningType": BusConditioningType.NON_AC,
    "seatingType": BusSeatingType.SLEEPER,
    "seatsAvailable": 28,
    "totalSeats": 58
  }
];

export default dummyData;
