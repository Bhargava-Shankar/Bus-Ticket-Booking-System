const busIds =  [
  {
    "busId": "66750c49f4e458f5dd0e3daf"
  },
  {
    "busId": "66750c49f4e458f5dd0e3db0"
  },
  {
    "busId": "66750c49f4e458f5dd0e3db1"
  },
  {
    "busId": "66750c49f4e458f5dd0e3db2"
  },
  {
    "busId": "66750c4af4e458f5dd0e3db3"
  },
  {
    "busId": "66750c4af4e458f5dd0e3db4"
  },
  {
    "busId": "66750c4af4e458f5dd0e3db5"
  },
  {
    "busId": "66750c4af4e458f5dd0e3db6"
  },
  {
    "busId": "66750c4af4e458f5dd0e3db7"
  },
  {
    "busId": "66750c4af4e458f5dd0e3db8"
  }
]

const userIds = [
  {
    "userId": "6674e9e854cd6596af7cef07"
  },
  {
    "userId": "6674ea42c824162f8a6ec059"
  },
  {
    "userId": "667514adf63055d32d2251cc"
  },
  {
    "userId": "667516296d6f771b12d980f2"
  }
]


export const bookingDummyData = [
    {
        "bookingNumber" : "B001",
        "userId": "6674e9e854cd6596af7cef07",
        "busId": "66750c49f4e458f5dd0e3daf"
    },
    {
        "bookingNumber" : "B002",
        "userId": "6674e9e854cd6596af7cef07",
        "busId": "66750c49f4e458f5dd0e3db0"
    },
    {
        "bookingNumber" : "B003",
        "userId": "6674e9e854cd6596af7cef07",
        "busId": "66750c49f4e458f5dd0e3db1"

    }, {
        "bookingNumber" : "B004",
        "userId": "667514adf63055d32d2251cc",
        "busId": "66750c4af4e458f5dd0e3db8"
    },
    {
         "bookingNumber" : "B005",
        "userId": "667516296d6f771b12d980f2",
         "busId": "66750c4af4e458f5dd0e3db8"
    }
]

const seatNumbers = [
  "LL1", "LL2", "LL3", "LL4", "LL5",
  "LR1", "LR2", "LR3", "LR4", "LR5",
  "UL1", "UL2", "UL3", "UL4", "UL5",
  "UR1", "UR2", "UR3", "UR4", "UR5"
];



export const createSeats = () => {
    let seatDummyData: any = []
    busIds.map((bus) => {
    seatNumbers.map((seatNo) => {
        seatDummyData.push({
        busId: bus['busId'],
        seatNo : seatNo,
        isBooked : false
    })
    })
        console.log(seatDummyData)
        return seatDummyData;
})
}



