










// // Report 6
const moment = modules.moment;
const reqData = req.body;

const from = moment(reqData.from, 'MM/DD/YY').format('MM/DD/YY');
const to = moment(reqData.to, 'MM/DD/YY').format('MM/DD/YY');



const [month, day, year] = from.split('/').map(part => parseInt(part, 10))

const [month1, day1, year1] = to.split('/').map(part => parseInt(part, 10))

const fromformatted = new Date(`20${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T00:00:00.000Z`);

const toformatted = new Date(`20${year1}-${month1.toString().padStart(2, '0')}-${day1.toString().padStart(2, '0')}T00:00:00.000Z`);



const take = Number(reqData.take) || 10; 
const skip = Number(reqData.skip) || 0;  
const queryBuilder = await entities.daily_otp.createQueryBuilder("alias")
   .select([
        'FlightDate',
        'FlightId',
        'FlightNumber',
        'Airport',
        'AOC',
        'Origin',
        'Destination',
        'STD',
        'EstimatedTimeDeparture',
        'ActualTimeDeparture',
        'STA',
        'EstimatedTimeOfArrival',
        'ActualTimeofArrival',
        'AdultPax',
        'InfantPax',
        'TotalPax',
        'IsDelayedDeparture',
        'IsDelayedArrival',
        'IsCancelledDeparture',
        'IsCancelledArrival',

        // Transform IsDelayedDeparture into a boolean
        `(CASE WHEN IsDelayedDeparture = 1 THEN 'true' ELSE 'false' END) AS IsDelayedDeparture`,
         `(CASE WHEN IsDelayedArrival = 1 THEN 'true' ELSE 'false' END) AS IsDelayedArrival`,
         `(CASE WHEN IsCancelledDeparture = 1 THEN 'true' ELSE 'false' END) AS IsCancelledDeparture`,
         `(CASE WHEN IsCancelledArrival = 1 THEN 'true' ELSE 'false' END) AS IsCancelledArrival`,
         `(CASE WHEN IsOTPDeparture = 0 THEN 'true' ELSE 'false' END) AS IsOTPDeparture`,
        `(CASE WHEN IsOTPArrival = 0 THEN 'true' ELSE 'false' END) AS IsOTPArrival`
    ])
    .where("isDeleted = :isDeleted", { isDeleted: 0 })
    .andWhere('AOC = :AOC' , {
        AOC:reqData.airline
    })

   
    
     .andWhere("FlightDate BETWEEN :startDate AND :endDate", {
        startDate: fromformatted,
        endDate: toformatted,
    })

    // .groupBy("FlightDate") // Group by FlightDate
    .getRawMany();

const count = queryBuilder.length;

console.log(count);

let resultData;

if (count <= take) {
    // Fetch all records without pagination
    resultData = await entities.daily_otp.createQueryBuilder("alias")
     .select([
        'FlightDate',
        'FlightId',
        'FlightNumber',
        'Airport',
        'AOC',
        'Origin',
        'Destination',
        'STD',
        'EstimatedTimeDeparture',
        'ActualTimeDeparture',
        'STA',
        'EstimatedTimeOfArrival',
        'ActualTimeofArrival',
        'AdultPax',
        'InfantPax',
        'TotalPax',
        'IsDelayedDeparture',
        'IsDelayedArrival',
        'IsCancelledDeparture',
        'IsCancelledArrival',
  // Transform IsDelayedDeparture into a boolean
        `(CASE WHEN IsDelayedDeparture = 1 THEN 'true' ELSE 'false' END) AS IsDelayedDeparture`,
         `(CASE WHEN IsDelayedArrival = 1 THEN 'true' ELSE 'false' END) AS IsDelayedArrival`,
         `(CASE WHEN IsCancelledDeparture = 1 THEN 'true' ELSE 'false' END) AS IsCancelledDeparture`,
         `(CASE WHEN IsCancelledArrival = 1 THEN 'true' ELSE 'false' END) AS IsCancelledArrival`,
         `(CASE WHEN IsOTPDeparture = 0 THEN 'true' ELSE 'false' END) AS IsOTPDeparture`,
        `(CASE WHEN IsOTPArrival = 0 THEN 'true' ELSE 'false' END) AS IsOTPArrival`
    ])
    .where("isDeleted = :isDeleted", { isDeleted: 0 })
    .andWhere('AOC = :AOC' , {
        AOC:reqData.airline
    })
      .andWhere("FlightDate BETWEEN :startDate AND :endDate", {
        startDate: fromformatted,
        endDate: toformatted,
    })

        // .groupBy("FlightDate")
        .getRawMany();
} else {
    // Apply pagination for larger datasets
    resultData = await entities.daily_otp.createQueryBuilder("alias")
     .select([
        'FlightDate',
        'FlightId',
        'FlightNumber',
        'Airport',
        'AOC',
        'Origin',
        'Destination',
        'STD',
        'EstimatedTimeDeparture',
        'ActualTimeDeparture',
        'STA',
        'EstimatedTimeOfArrival',
        'ActualTimeofArrival',
        'AdultPax',
        'InfantPax',
        'TotalPax',
        'IsDelayedDeparture',
        'IsDelayedArrival',
        'IsCancelledDeparture',
        'IsCancelledArrival',

         // Transform IsDelayedDeparture into a boolean
        `(CASE WHEN IsDelayedDeparture = 1 THEN 'true' ELSE 'false' END) AS IsDelayedDeparture`,
         `(CASE WHEN IsDelayedArrival = 1 THEN 'true' ELSE 'false' END) AS IsDelayedArrival`,
         `(CASE WHEN IsCancelledDeparture = 1 THEN 'true' ELSE 'false' END) AS IsCancelledDeparture`,
         `(CASE WHEN IsCancelledArrival = 1 THEN 'true' ELSE 'false' END) AS IsCancelledArrival`,
         `(CASE WHEN IsOTPDeparture = 0 THEN 'true' ELSE 'false' END) AS IsOTPDeparture`,
        `(CASE WHEN IsOTPArrival = 0 THEN 'true' ELSE 'false' END) AS IsOTPArrival`
        ])
        .where("isDeleted = :isDeleted", { isDeleted: 0 })
        .andWhere('AOC = :AOC' , {
            AOC:reqData.airline
        })
          .andWhere("FlightDate BETWEEN :startDate AND :endDate", {
        startDate: fromformatted,
        endDate: toformatted,
    })

        // .groupBy("FlightDate")
        .take(take)
        .skip(skip)
        .getRawMany();
}

console.log(resultData);
console.log('this is count', count);

// Return the results with total count
return res.json({
    data: resultData,
    totalCount: count,
});
