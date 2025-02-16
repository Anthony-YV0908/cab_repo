




// Report 1
const moment = modules.moment;
 const data = req.body;

const from = moment(data.from, 'MM/DD/YY').format('MM/DD/YY');
const to = moment(data.to, 'MM/DD/YY').format('MM/DD/YY');



const [month, day, year] = from.split('/').map(part => parseInt(part, 10))

const [month1, day1, year1] = to.split('/').map(part => parseInt(part, 10))

const fromformatted = new Date(`20${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T00:00:00.000Z`);

const toformatted = new Date(`20${year1}-${month1.toString().padStart(2, '0')}-${day1.toString().padStart(2, '0')}T00:00:00.000Z`);



console.log(from)
console.log(to) 
const take = Number(data.take) || 10; 
const skip = Number(data.skip) || 0;  

try {
   const groupedData = await entities.daily_otp.createQueryBuilder("alias")
    .select("FlightDate") // Select FlightDate values
    .where("isDeleted = :isDeleted", { isDeleted: 0 })
    .andWhere("FlightDate BETWEEN :startDate AND :endDate", {
        startDate: from,
        endDate: to,
    })
    .groupBy("FlightDate") // Group by FlightDate
    .getRawMany();

// Get the count of the grouped rows
const count = groupedData.length;


        
    let data;

    if (count <= take) {
        // Step 2: If the dataset is small, fetch all records without pagination
        data = await entities.daily_otp.createQueryBuilder("alias")
             .select("DISTINCT FlightDate")
            .addSelect('COUNT(EstimatedTimeDeparture) AS Departure')
            .addSelect('COUNT(ActualTimeDeparture) AS Arrival')
            .addSelect('COUNT(EstimatedTimeDeparture) + COUNT(ActualTimeDeparture) AS TotalFlightsFlown')
            .addSelect('COUNT(IsOTPDeparture) AS OTPDeparture')
            .addSelect('COUNT(IsOTPArrival) AS OTPArrival')
            .addSelect('COUNT(IsOTPDeparture) + COUNT(IsOTPArrival) AS TotalNoofOTP')
            .where("isDeleted = :isDeleted", { isDeleted: 0 })
            .andWhere("FlightDate BETWEEN :startDate AND :endDate", {
                 startDate: fromformatted,
                    endDate: toformatted,
            })
  

                .groupBy("FlightDate")

            .getRawMany();
    } else {
        // Step 3: Apply pagination for larger datasets
         data = await entities.daily_otp.createQueryBuilder("alias")
            .select("FlightDate", "FlightDate")
            .addSelect('COUNT(EstimatedTimeDeparture)', 'Departure')
            .addSelect('COUNT(ActualTimeDeparture)', 'Arrival')
            .addSelect('COUNT(EstimatedTimeDeparture) + COUNT(ActualTimeDeparture)', 'TotalFlightsFlown')
            .addSelect('COUNT(IsOTPDeparture)', 'OTPDeparture')
            .addSelect('COUNT(IsOTPArrival)', 'OTPArrival')
            .addSelect('COUNT(IsOTPDeparture) + COUNT(IsOTPArrival)', 'TotalNoofOTP')
            .where("isDeleted = :isDeleted", { isDeleted: 0 })
            .andWhere("FlightDate BETWEEN :startDate AND :endDate", {
                  startDate: fromformatted,
                endDate: toformatted,
            })
       
            .groupBy("FlightDate")
            .take(take)
            .skip(skip)
            .getRawMany();

            }

    console.log(data)
    console.log(count) 

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













// const dailyotptoday = await entities.daily_otp.createQueryBuilder("alias")
//     .where("alias.isDeleted = :isDeleted", { isDeleted: 0 }) // First condition
//     //  .andWhere("alias.DateIssued = :DateIssued", { DateIssued:formattedDate }) // Second condition
//     .getMany();


// console.log(dailyotptoday)