


// Report 9 
// const moment = modules.moment;
// // const reqData = req.body;


// const reqData = {
//     month:'01/22/25'
// }


const startOfMonth = moment(reqData.month, 'M').startOf('month');
const endOfMonth = moment(reqData.month, 'M').endOf('month');

const startDate = startOfMonth.format('MM/DD/YY');
const endDate = endOfMonth.format('MM/DD/YY');





const [month, day, year] = startDate.split('/').map(part => parseInt(part, 10))
const [month1, day1, year1] = endDate.split('/').map(part => parseInt(part, 10))



const startdateformatted = new Date(`20${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T00:00:00.000Z`);

const enddateformatted = new Date(`20${year1}-${month1.toString().padStart(2, '0')}-${day1.toString().padStart(2, '0')}T00:00:00.000Z`);

const currentMonth = moment(reqData.month, 'M/D/YY').format('M');

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
    .addSelect(currentMonth,'currentMonth')
    .where("isDeleted = :isDeleted", { isDeleted: 0 })
   .andWhere("FlightDate BETWEEN :startDate AND :endDate", {
        startDate: startdateformatted,
        endDate: enddateformatted,
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
    .addSelect(currentMonth,'currentMonth')
    .where("isDeleted = :isDeleted", { isDeleted: 0 })
   .andWhere("FlightDate BETWEEN :startDate AND :endDate", {
        startDate: startdateformatted,
        endDate: enddateformatted,
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
    .addSelect(currentMonth,'currentMonth')
    .where("isDeleted = :isDeleted", { isDeleted: 0 })
   .andWhere("FlightDate BETWEEN :startDate AND :endDate", {
        startDate: startdateformatted,
        endDate: enddateformatted,
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
