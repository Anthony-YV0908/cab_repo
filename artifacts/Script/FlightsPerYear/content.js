const moment = modules.moment;
const reqData = req.body;

// Extract and validate the year from reqData
const currentYear = moment(reqData.year, 'YYYY').format('YYYY'); // e.g., "2025"
const year = moment(reqData.year, 'YYYY').format('YY')
// Define start and end dates for the entire year
const startDate = moment(`01/01/${year}`, 'MM/DD/YYYY').format('M/DD/YY'); // e.g., "2025-01-01"
const endDate = moment(`12/31/${year}`, 'MM/DD/YYYY').format('M/DD/YY'); // e.g., "2025-12-31"

console.log(`Start Date: ${startDate}, End Date: ${endDate}`);

const take = Number(reqData.take) || 10; 
const skip = Number(reqData.skip) || 0;  

// Query for flights within the specified date range
const queryBuilder = await entities.daily_otp.createQueryBuilder("alias")
    .select([
        'alias.FlightDate AS FlightDate',
        'alias.FlightId AS FlightId',
        'alias.FlightNumber AS FlightNumber',
        'alias.Airport AS Airport',
        'alias.AOC AS AOC',
        'alias.Origin AS Origin',
        'alias.Destination AS Destination',
        'alias.STD AS STD',
        'alias.EstimatedTimeDeparture AS EstimatedTimeDeparture',
        'alias.ActualTimeDeparture AS ActualTimeDeparture',
        'alias.EstimatedTimeOfArrival AS EstimatedTimeOfArrival',
        'alias.ActualTimeofArrival AS ActualTimeofArrival',
        'alias.AdultPax AS AdultPax',
        'alias.InfantPax AS InfantPax',
        'alias.TotalPax AS TotalPax',
        `CASE WHEN alias.IsDelayedDeparture = 1 THEN 'true' ELSE 'false' END AS IsDelayedDeparture`,
        `CASE WHEN alias.IsDelayedArrival = 1 THEN 'true' ELSE 'false' END AS IsDelayedArrival`,
        `CASE WHEN alias.IsCancelledDeparture = 1 THEN 'true' ELSE 'false' END AS IsCancelledDeparture`,
        `CASE WHEN alias.IsCancelledArrival = 1 THEN 'true' ELSE 'false' END AS IsCancelledArrival`,
        `CASE WHEN alias.IsOTPDeparture = 0 THEN 'true' ELSE 'false' END AS IsOTPDeparture`,
        `CASE WHEN alias.IsOTPArrival = 0 THEN 'true' ELSE 'false' END AS IsOTPArrival`
    ])
    .addSelect(`'${currentYear}'`, 'currentYear') // Ensure currentYear is treated as a string
    .where("alias.isDeleted = :isDeleted", { isDeleted: 0 })
    .andWhere("alias.FlightDate BETWEEN :startDate AND :endDate", {
        startDate: startDate,
        endDate: endDate
    })
    .getRawMany();

const count = queryBuilder.length;
console.log(`Total Flights Found: ${count}`);

// Handle pagination or fetch all results
let resultData;

if (count <= take) {
    resultData = queryBuilder;
} else {
    resultData = await entities.daily_otp.createQueryBuilder("alias")
        .select([
            'alias.FlightDate AS FlightDate',
            'alias.FlightId AS FlightId',
            'alias.FlightNumber AS FlightNumber',
            'alias.Airport AS Airport',
            'alias.AOC AS AOC',
            'alias.Origin AS Origin',
            'alias.Destination AS Destination',
            'alias.STD AS STD',
            'alias.EstimatedTimeDeparture AS EstimatedTimeDeparture',
            'alias.ActualTimeDeparture AS ActualTimeDeparture',
            'alias.EstimatedTimeOfArrival AS EstimatedTimeOfArrival',
            'alias.ActualTimeofArrival AS ActualTimeofArrival',
            'alias.AdultPax AS AdultPax',
            'alias.InfantPax AS InfantPax',
            'alias.TotalPax AS TotalPax',
             `CASE WHEN alias.IsDelayedDeparture = 1 THEN 'true' ELSE 'false' END AS IsDelayedDeparture`,
        `CASE WHEN alias.IsDelayedArrival = 1 THEN 'true' ELSE 'false' END AS IsDelayedArrival`,
        `CASE WHEN alias.IsCancelledDeparture = 1 THEN 'true' ELSE 'false' END AS IsCancelledDeparture`,
        `CASE WHEN alias.IsCancelledArrival = 1 THEN 'true' ELSE 'false' END AS IsCancelledArrival`,
        `CASE WHEN alias.IsOTPDeparture = 0 THEN 'true' ELSE 'false' END AS IsOTPDeparture`,
        `CASE WHEN alias.IsOTPArrival = 0 THEN 'true' ELSE 'false' END AS IsOTPArrival`
        ])
        .addSelect(`'${currentYear}'`, 'currentYear') // Ensure currentYear is treated as a string
        .where("alias.isDeleted = :isDeleted", { isDeleted: 0 })
        .andWhere("alias.FlightDate BETWEEN :startDate AND :endDate", {
            startDate: startDate,
            endDate: endDate
        })
        .take(take)
        .skip(skip)
        .getRawMany();
}

console.log(resultData);

// Return the results with total count
return res.json({
    data: resultData,
    totalCount: count,
});
