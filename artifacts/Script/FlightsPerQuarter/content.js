















// Report 10
const moment = modules.moment;
const reqData = req.body;

const year = moment().year(); 
const startDate = moment().year(year).month((reqData.quarter - 1) * 3).startOf('month').format('M/DD/YYYY');
const endDate = moment().year(year).month(reqData.quarter * 3 - 1).endOf('month').format('M/DD/YYYY');
console.log(startDate)
console.log(endDate)

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
        'EstimatedTimeOfArrival',
        'ActualTimeofArrival',
        'AdultPax',
        'InfantPax',
        'TotalPax',

        `(CASE WHEN IsDelayedDeparture = 1 THEN 'true' ELSE 'false' END) AS IsDelayedDeparture`,
        `(CASE WHEN IsDelayedArrival = 1 THEN 'true' ELSE 'false' END) AS IsDelayedArrival`,
        `(CASE WHEN IsCancelledDeparture = 1 THEN 'true' ELSE 'false' END) AS IsCancelledDeparture`,
        `(CASE WHEN IsCancelledArrival = 1 THEN 'true' ELSE 'false' END) AS IsCancelledArrival`,
        `(CASE WHEN IsOTPDeparture = 0 THEN 'true' ELSE 'false' END) AS IsOTPDeparture`,
        `(CASE WHEN IsOTPArrival = 0 THEN 'true' ELSE 'false' END) AS IsOTPArrival`
    ])
    .where("isDeleted = :isDeleted", { isDeleted: 0 })
    .andWhere("FlightDate BETWEEN :startDate AND :endDate", {
        startDate: startDate,
        endDate: endDate
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
        'EstimatedTimeOfArrival',
        'ActualTimeofArrival',
        'AdultPax',
        'InfantPax',
        'TotalPax',

        `(CASE WHEN IsDelayedDeparture = 1 THEN 'true' ELSE 'false' END) AS IsDelayedDeparture`,
        `(CASE WHEN IsDelayedArrival = 1 THEN 'true' ELSE 'false' END) AS IsDelayedArrival`,
        `(CASE WHEN IsCancelledDeparture = 1 THEN 'true' ELSE 'false' END) AS IsCancelledDeparture`,
        `(CASE WHEN IsCancelledArrival = 1 THEN 'true' ELSE 'false' END) AS IsCancelledArrival`,
        `(CASE WHEN IsOTPDeparture = 0 THEN 'true' ELSE 'false' END) AS IsOTPDeparture`,
        `(CASE WHEN IsOTPArrival = 0 THEN 'true' ELSE 'false' END) AS IsOTPArrival`
    ])
    .where("isDeleted = :isDeleted", { isDeleted: 0 })
    .andWhere("FlightDate BETWEEN :startDate AND :endDate", {
        startDate: startDate,
        endDate: endDate
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
        'EstimatedTimeOfArrival',
        'ActualTimeofArrival',
        'AdultPax',
        'InfantPax',
        'TotalPax',

        `(CASE WHEN IsDelayedDeparture = 1 THEN 'true' ELSE 'false' END) AS IsDelayedDeparture`,
        `(CASE WHEN IsDelayedArrival = 1 THEN 'true' ELSE 'false' END) AS IsDelayedArrival`,
        `(CASE WHEN IsCancelledDeparture = 1 THEN 'true' ELSE 'false' END) AS IsCancelledDeparture`,
        `(CASE WHEN IsCancelledArrival = 1 THEN 'true' ELSE 'false' END) AS IsCancelledArrival`,
        `(CASE WHEN IsOTPDeparture = 0 THEN 'true' ELSE 'false' END) AS IsOTPDeparture`,
        `(CASE WHEN IsOTPArrival = 0 THEN 'true' ELSE 'false' END) AS IsOTPArrival`
    ])
    .where("isDeleted = :isDeleted", { isDeleted: 0 })
    .andWhere("FlightDate BETWEEN :startDate AND :endDate", {
        startDate: startDate,
        endDate: endDate
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
