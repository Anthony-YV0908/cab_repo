const moment = modules.moment;
// const data = { 
//     Month:'01/30/25',
//     Airport:'RWN',
//     Airline:'7V',

// }

const data = req.body
log.info(data)

// Extract the current month and year
const currentMonth = moment(data.Month, 'M/D/YY').format('MMM');
const currentYear = moment(data.Month, 'M/D/YY').format('YYYY');
const startDate = moment(data.Month, 'M').startOf('month')
const endDate = moment(data.Month, 'M').endOf('month')


const startDate1 = startDate.format('MM/DD/YY');
const endDate1 = endDate.format('MM/DD/YY');


const [month, day, year] = startDate1.split('/').map(part => parseInt(part, 10))
const [month1, day1, year1] = endDate1.split('/').map(part => parseInt(part, 10))

const startdateformatted = new Date(`20${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T00:00:00.000Z`);

const enddateformatted = new Date(`20${year1}-${month1.toString().padStart(2, '0')}-${day1.toString().padStart(2, '0')}T00:00:00.000Z`);

const aoc = data.Airline
const airport = data.Airport
const carrier = data.Carrier

const FlightsOnTime = await entities.daily_otp.createQueryBuilder("alias")
   .select(`'${currentYear}'`, 'Year') // Static year
    .addSelect(`'${currentMonth}'`, 'Month') // Add the current month as a static value
    .addSelect(`'${aoc}'`, 'Airline')
    .addSelect(`'${airport}'`, 'Airport')
    .addSelect(`'${carrier}'`, 'Carrier')
   
    .addSelect(`COUNT(alias.EstimatedTimeDeparture)`, 'NoOfFlightsDeparture')
    .addSelect(`COUNT(alias.EstimatedTimeofArrival)`, 'NoOfFlightArrival')
    .addSelect('COUNT(alias.EstimatedTimeDeparture) + COUNT(alias.ActualTimeDeparture)', 'TotalFlightsFlown')
    .addSelect(`COUNT(CASE WHEN alias.IsDelayedDeparture = 1 THEN 1 END)`, 'NoOfDelayedDeparture')
    .addSelect(`COUNT(CASE WHEN alias.IsDelayedArrival = 1 THEN 1 END)`, 'NoOfDelayedArrival')
    .addSelect(`COUNT(CASE WHEN alias.IsDelayedDeparture = 1 THEN 1 END) + COUNT(CASE WHEN alias.IsDelayedArrival = 1 THEN 1 END)`, 'TotalFlightsDelayed')
    .addSelect(`COUNT(CASE WHEN alias.IsCancelledDeparture = 1 THEN 1 END )`, 'NoOfCancelledDeparture')
    .addSelect(`COUNT(CASE WHEN alias.IsCancelledArrival = 1 THEN 1 END )`, 'NoOfCancelledArrival')
    .addSelect('COUNT(CASE WHEN alias.IsCancelledDeparture = 1 THEN 1 END ) + COUNT(CASE WHEN alias.IsCancelledArrival = 1 THEN 1 END )', 'TotalFlightsCancelled')
    .addSelect(`COUNT(CASE WHEN alias.IsOTPDeparture = 1 THEN 1 END )`, 'NoOfOTPDeparture')
    .addSelect(`COUNT(CASE WHEN alias.IsOTPArrival = 1 THEN 1 END )`, 'NoOfOTPArrival')
    .addSelect('COUNT(CASE WHEN alias.IsOTPDeparture = 1 THEN 1 END  ) + COUNT(CASE WHEN alias.IsOTPArrival = 1 THEN 1 ELSE 0  END )', 'TotalFlightsOTP')
   .addSelect(
    `(COUNT(CASE WHEN alias.IsOTPDeparture = 1 THEN 1 END) * 1.0 / NULLIF(COUNT(alias.EstimatedTimeDeparture), 0)) * 100.0`,
    'DEP'
)
.addSelect(
    `(COUNT(CASE WHEN alias.IsOTPDeparture = 1 THEN 1 END) * 1.0 / NULLIF(COUNT(alias.EstimatedTimeofArrival), 0)) * 100.0`,
    'ARR'
)
    .addSelect(
    `(
        (
            COUNT(CASE WHEN alias.IsOTPDeparture = 1 THEN 1 END) +
            COUNT(CASE WHEN alias.IsOTPArrival = 1 THEN 1 END)
        ) 
        /
        NULLIF(
            COUNT(alias.EstimatedTimeDeparture) + COUNT(alias.ActualTimeDeparture), 0
        ) * 100
    )`,
    'TotalPercentage'
)

    .where("alias.isDeleted = :isDeleted", { isDeleted: 0 })
    .andWhere('alias.AOC = :AOC', { AOC: aoc })
    .andWhere('alias.Airport = :Airport', { Airport:airport })
    .andWhere("alias.FlightDate BETWEEN :startDate AND :endDate", {
        startDate: startdateformatted,
        endDate: enddateformatted,
    })
    .getRawMany(); // Returns only the raw selected fields

result = FlightsOnTime;
// Output the result
console.log(FlightsOnTime);
