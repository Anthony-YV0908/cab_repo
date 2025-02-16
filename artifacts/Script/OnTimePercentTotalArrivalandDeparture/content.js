



//Report 4 
const moment = modules.moment;
 const data = req.body;

 const from = moment(data.from,'MM/DD/YY').format('M/DD/YY');
const to = moment(data.to, 'MM/DD/YY').format('M/DD/YY');






const [month, day, year] = from.split('/').map(part => parseInt(part, 10))

const [month1, day1, year1] = to.split('/').map(part => parseInt(part, 10))

const fromformatted = new Date(`20${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T00:00:00.000Z`);

const toformatted = new Date(`20${year1}-${month1.toString().padStart(2, '0')}-${day1.toString().padStart(2, '0')}T00:00:00.000Z`);



const take = Number(data.take) || 10; 
const skip = Number(data.skip) || 0;  

try {
   
 const groupedData = await entities.daily_otp.createQueryBuilder("alias")
    .select('FlightDate')
    .addSelect("COUNT(alias.EstimatedTimeDeparture) + COUNT(alias.ActualTimeDeparture) AS TotalFlights")
     .addSelect(
        `SUM(CASE WHEN alias.IsOTPDeparture = 1 THEN 1 ELSE 0 END) + SUM(CASE WHEN alias.IsOTPArrival = 1 THEN 1 ELSE 0 END) AS TotalOTP`
    )
   .addSelect(`
    CASE 
        WHEN (COUNT(alias.EstimatedTimeDeparture) + COUNT(alias.ActualTimeDeparture)) > 0 THEN 
            ROUND(
                (
                    (SUM(CASE WHEN alias.IsOTPDeparture = 1 THEN 1 ELSE 0 END) + 
                    SUM(CASE WHEN alias.IsOTPArrival = 1 THEN 1 ELSE 0 END)) * 100.0
                ) / 
                (COUNT(alias.EstimatedTimeDeparture) + COUNT(alias.ActualTimeDeparture)), 2
            )
        ELSE 0
    END AS OTPTotalPercentage
`)
    .where("alias.isDeleted = :isDeleted", { isDeleted: 0 })
    .andWhere("alias.FlightDate BETWEEN :startDate AND :endDate", {
        startDate: from,
        endDate: to
    })
    .groupBy("FlightDate") // Group by FlightDate
    .getRawMany();

// Get the count of the grouped rows
const count = groupedData.length;

console.log(count); 
        
    let data;

    if (count <= take) {
        // Step 2: If the dataset is small, fetch all records without pagination
        data = await entities.daily_otp.createQueryBuilder("alias")
        .select('FlightDate')
    .addSelect("COUNT(alias.EstimatedTimeDeparture) + COUNT(alias.ActualTimeDeparture) AS TotalFlights")
     .addSelect(
        `SUM(CASE WHEN alias.IsOTPDeparture = 1 THEN 1 ELSE 0 END) + SUM(CASE WHEN alias.IsOTPArrival = 1 THEN 1 ELSE 0 END) AS TotalOTP`
    )
    .addSelect(`
    CASE 
        WHEN (COUNT(alias.EstimatedTimeDeparture) + COUNT(alias.ActualTimeDeparture)) > 0 THEN 
            ROUND(
                (
                    (SUM(CASE WHEN alias.IsOTPDeparture = 1 THEN 1 ELSE 0 END) + 
                    SUM(CASE WHEN alias.IsOTPArrival = 1 THEN 1 ELSE 0 END)) * 100.0
                ) / 
                (COUNT(alias.EstimatedTimeDeparture) + COUNT(alias.ActualTimeDeparture)), 2
            )
        ELSE 0
    END AS OTPTotalPercentage
`)

    .where("isDeleted = :isDeleted", { isDeleted: 0 })
            .andWhere("FlightDate BETWEEN :startDate AND :endDate", {
                startDate:from,
                endDate: to,
            })
             .groupBy("FlightDate") // Group by FlightDate
            .getRawMany();
    } else {
        // Step 3: Apply pagination for larger datasets
         data = await entities.daily_otp.createQueryBuilder("alias")
     .select('FlightDate')
    .addSelect("COUNT(alias.EstimatedTimeDeparture) + COUNT(alias.ActualTimeDeparture) AS TotalFlights")
.addSelect(
    `SUM(CASE WHEN alias.IsOTPDeparture = 1 THEN 1 ELSE 0 END) + SUM(CASE WHEN alias.IsOTPArrival = 1 THEN 1 ELSE 0 END) AS TotalOTP`
)

.addSelect(`
    CASE 
        WHEN COUNT(ActualTimeOfArrival) > 0 THEN 
            (SUM(CASE WHEN IsOTPArrival = 1 THEN 1 ELSE 0 END) * 100.0) / COUNT(ActualTimeOfArrival)
        ELSE 0 
    END AS PercentageOnTimeArrival
`)

  .addSelect(`
    CASE 
        WHEN (COUNT(alias.EstimatedTimeDeparture) + COUNT(alias.ActualTimeDeparture)) > 0 THEN 
            ROUND(
                (
                    (SUM(CASE WHEN alias.IsOTPDeparture = 1 THEN 1 ELSE 0 END) + 
                    SUM(CASE WHEN alias.IsOTPArrival = 1 THEN 1 ELSE 0 END)) * 100.0
                ) / 
                (COUNT(alias.EstimatedTimeDeparture) + COUNT(alias.ActualTimeDeparture)), 2
            )
        ELSE 0
    END AS OTPTotalPercentage
`)

    .where("isDeleted = :isDeleted", { isDeleted: 0 })
            .andWhere("FlightDate BETWEEN :startDate AND :endDate", {
                startDate: from,
                endDate: to,
            })
            
            .take(take)
            .skip(skip)
             .groupBy("FlightDate") // Group by FlightDate
            .getRawMany();

            }

    console.log(data)
    console.log('this is count' , count) 

    // Step 4: Return the results with total count
    return res.json({
        data,
        totalCount: count,
    });
} catch (error) {
    log.error("Error fetching data:", error);
    return res.status(500).json({
        error: "An error occurred while fetching data.",
    });
}













