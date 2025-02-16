
const data = req.body
// const data = { 
//     Month:'Jan',
//     Year:'2025',
//     take:10,
//     skip:0
// }

// log.info(reqData)




 

const take = Number(data.take) || 10; 
const skip = Number(data.skip) || 0;  
const queryBuilder = await entities.monthly_otp.createQueryBuilder("alias")
    .select([
    "Month",
    "Year",
    "Airport",
    "Airline",
    "NoOfFlightsDeparture",
    "NoOfFlightArrival",
    "TotalFlightsFlown",
    "NoOfDelayedDeparture",
    "NoOfDelayedArrival",
    "TotalFlightsDelayed",
    "NoOfCancelledDeparture",
    "NoOfCancelledArrival",
    "TotalFlightsCancelled",
    "NoOfOTPDeparture",
    "NoOfOTPArrival",
    "TotalFlightsOTP",
    "DEP",
    "ARR",
  ])
    .where("isDeleted = :isDeleted" , {isDeleted:0})
    .andWhere("Month = :Month", {Month:data.Month})
    .andWhere("Year = :Year", {Year:data.Year})
    .getRawMany();

const count = queryBuilder.length;

console.log(count);

let resultData;

if (count <= take) {
    // Fetch all records without pagination
    resultData = await entities.monthly_otp.createQueryBuilder("alias")
            .select([
            "Month",
            "Year",
            "Airport",
            "Airline",
            "NoOfFlightsDeparture",
            "NoOfFlightArrival",
            "TotalFlightsFlown",
            "NoOfDelayedDeparture",
            "NoOfDelayedArrival",
            "TotalFlightsDelayed",
            "NoOfCancelledDeparture",
            "NoOfCancelledArrival",
            "TotalFlightsCancelled",
            "NoOfOTPDeparture",
            "NoOfOTPArrival",
            "TotalFlightsOTP",
            "DEP",
            "ARR",
        ])
        .where("isDeleted = :isDeleted" , {isDeleted:0})
        .andWhere("Month = :Month", {Month:data.Month})
        .andWhere("Year = :Year", {Year:data.Year})
        .getRawMany();
} else {
    // Apply pagination for larger datasets
    resultData = await entities.monthly_otp.createQueryBuilder("alias")
      .select([
        "Month",
        "Year",
        "Airport",
        "Airline",
        "NoOfFlightsDeparture",
        "NoOfFlightArrival",
        "TotalFlightsFlown",
        "NoOfDelayedDeparture",
        "NoOfDelayedArrival",
        "TotalFlightsDelayed",
        "NoOfCancelledDeparture",
        "NoOfCancelledArrival",
        "TotalFlightsCancelled",
        "NoOfOTPDeparture",
        "NoOfOTPArrival",
        "TotalFlightsOTP",
        "DEP",
        "ARR",
    ])
    .where("isDeleted = :isDeleted" , {isDeleted:0})
    .andWhere("Month = :Month", {Month:data.Month})
    .andWhere("Year = :Year", {Year:data.Year})
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
