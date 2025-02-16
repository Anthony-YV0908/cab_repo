




// Report 13
const moment = modules.moment;
const reqData = req.body
log.info(reqData)





const selectedDate = moment(reqData.Month, 'M/DD/YY')
const currentMonth = moment(reqData.Month, 'M').format('M');
const currentYear = selectedDate.format('YYYY')
const startDate = moment(reqData.Month, 'M').startOf('month')
const endDate = moment(reqData.Month, 'M').endOf('month')




const startDate1 = startDate.format('MM/DD/YY');
const endDate1 = endDate.format('MM/DD/YY');





const [month, day, year] = startDate1.split('/').map(part => parseInt(part, 10))
const [month1, day1, year1] = endDate1.split('/').map(part => parseInt(part, 10))

const startdateformatted = new Date(`20${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T00:00:00.000Z`);

const enddateformatted = new Date(`20${year1}-${month1.toString().padStart(2, '0')}-${day1.toString().padStart(2, '0')}T00:00:00.000Z`);


// const from = moment(reqData.from, 'MM/DD/YY').format('M/DD/YY');
// const to = moment(reqData.to, 'MM/DD/YY').format('M/DD/YY');


const take = Number(reqData.take) || 10; 
const skip = Number(reqData.skip) || 0;  
const queryBuilder = await entities.daily_otp.createQueryBuilder("alias")
   .select(`'${currentYear}'`, 'Year') // Static year
    .addSelect(`'${currentMonth}'`, 'Month') // Static month
    .addSelect(`'${reqData.Airline}'`, 'Airline') // Static airline
    .addSelect(`
        CASE WHEN (COUNT(alias.IsOTPDeparture) + COUNT(alias.IsOTPArrival)) > 0
        THEN ((COUNT(CASE WHEN alias.IsOTPDeparture = 1 THEN 1 END) + COUNT(CASE WHEN alias.IsOTPArrival = 1 THEN 1 END)) * 100.0 / (COUNT(alias.IsOTPDeparture) + COUNT(alias.IsOTPArrival)))
        ELSE 0 END
    `, 'OnTime')
    .addSelect(`
        CASE WHEN (COUNT(alias.IsDelayedDeparture) + COUNT(alias.IsDelayedArrival)) > 0
        THEN ((COUNT(CASE WHEN alias.IsDelayedDeparture = 1 THEN 1 END) + COUNT(CASE WHEN alias.IsDelayedArrival = 1 THEN 1 END)) * 100.0 / (COUNT(alias.IsDelayedDeparture) + COUNT(alias.IsDelayedArrival)))
        ELSE 0 END
    `, 'Late')
    .addSelect(`
        CASE WHEN (COUNT(alias.IsCancelledDeparture) + COUNT(alias.IsCancelledArrival)) > 0
        THEN ((COUNT(CASE WHEN alias.IsCancelledDeparture = 1 THEN 1 END) + COUNT(CASE WHEN alias.IsCancelledArrival = 1 THEN 1 END)) * 100.0 / (COUNT(alias.IsCancelledDeparture) + COUNT(alias.IsCancelledArrival)))
        ELSE 0 END
    `, 'Cancelled')
    .where("alias.isDeleted = :isDeleted", { isDeleted: 0 })
    .andWhere("alias.AOC = :AOC", { AOC: reqData.Airline })
    .andWhere("alias.FlightDate BETWEEN :startDate AND :endDate", {
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
     .select(`'${currentYear}'`, 'Year') // Static year
    .addSelect(`'${currentMonth}'`, 'Month') // Static month
    .addSelect(`'${reqData.Airline}'`, 'Airline') // Static airline
    .addSelect(`
        CASE WHEN (COUNT(alias.IsOTPDeparture) + COUNT(alias.IsOTPArrival)) > 0
        THEN ((COUNT(CASE WHEN alias.IsOTPDeparture = 1 THEN 1 END) + COUNT(CASE WHEN alias.IsOTPArrival = 1 THEN 1 END)) * 100.0 / (COUNT(alias.IsOTPDeparture) + COUNT(alias.IsOTPArrival)))
        ELSE 0 END
    `, 'OnTime')
    .addSelect(`
        CASE WHEN (COUNT(alias.IsDelayedDeparture) + COUNT(alias.IsDelayedArrival)) > 0
        THEN ((COUNT(CASE WHEN alias.IsDelayedDeparture = 1 THEN 1 END) + COUNT(CASE WHEN alias.IsDelayedArrival = 1 THEN 1 END)) * 100.0 / (COUNT(alias.IsDelayedDeparture) + COUNT(alias.IsDelayedArrival)))
        ELSE 0 END
    `, 'Late')
    .addSelect(`
        CASE WHEN (COUNT(alias.IsCancelledDeparture) + COUNT(alias.IsCancelledArrival)) > 0
        THEN ((COUNT(CASE WHEN alias.IsCancelledDeparture = 1 THEN 1 END) + COUNT(CASE WHEN alias.IsCancelledArrival = 1 THEN 1 END)) * 100.0 / (COUNT(alias.IsCancelledDeparture) + COUNT(alias.IsCancelledArrival)))
        ELSE 0 END
    `, 'Cancelled')
    .where("alias.isDeleted = :isDeleted", { isDeleted: 0 })
    .andWhere("alias.AOC = :AOC", { AOC: reqData.Airline })
    .andWhere("alias.FlightDate BETWEEN :startDate AND :endDate", {
        startDate: startdateformatted,
        endDate: enddateformatted,
    })
        // .groupBy("FlightDate")
        .getRawMany();
} else {
    // Apply pagination for larger datasets
    resultData = await entities.daily_otp.createQueryBuilder("alias")
      .select(`'${currentYear}'`, 'Year') // Static year
    .addSelect(`'${currentMonth}'`, 'Month') // Static month
    .addSelect(`'${reqData.Airline}'`, 'Airline') // Static airline
    .addSelect(`
        CASE WHEN (COUNT(alias.IsOTPDeparture) + COUNT(alias.IsOTPArrival)) > 0
        THEN ((COUNT(CASE WHEN alias.IsOTPDeparture = 1 THEN 1 END) + COUNT(CASE WHEN alias.IsOTPArrival = 1 THEN 1 END)) * 100.0 / (COUNT(alias.IsOTPDeparture) + COUNT(alias.IsOTPArrival)))
        ELSE 0 END
    `, 'OnTime')
    .addSelect(`
        CASE WHEN (COUNT(alias.IsDelayedDeparture) + COUNT(alias.IsDelayedArrival)) > 0
        THEN ((COUNT(CASE WHEN alias.IsDelayedDeparture = 1 THEN 1 END) + COUNT(CASE WHEN alias.IsDelayedArrival = 1 THEN 1 END)) * 100.0 / (COUNT(alias.IsDelayedDeparture) + COUNT(alias.IsDelayedArrival)))
        ELSE 0 END
    `, 'Late')
    .addSelect(`
        CASE WHEN (COUNT(alias.IsCancelledDeparture) + COUNT(alias.IsCancelledArrival)) > 0
        THEN ((COUNT(CASE WHEN alias.IsCancelledDeparture = 1 THEN 1 END) + COUNT(CASE WHEN alias.IsCancelledArrival = 1 THEN 1 END)) * 100.0 / (COUNT(alias.IsCancelledDeparture) + COUNT(alias.IsCancelledArrival)))
        ELSE 0 END
    `, 'Cancelled')
    .where("alias.isDeleted = :isDeleted", { isDeleted: 0 })
    .andWhere("alias.AOC = :AOC", { AOC: reqData.Airline })
    .andWhere("alias.FlightDate BETWEEN :startDate AND :endDate", {
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
