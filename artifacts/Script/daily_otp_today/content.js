
const datas = req.body
var moment = modules.moment;

var currentDate = moment().format('M/DD/YY'); // Get the current date in the format 'YYYY-MM-DD'



// Convert MM/DD/YY to YYYY-MM-DD format
const [month, day, year] = currentDate.split('/').map(part => parseInt(part, 10));

// Create a new date object, assuming the year is 20XX (i.e., 2025 for '25')
const formattedDate = new Date(`20${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T00:00:00.000Z`);

console.log(formattedDate)

const take = Number(datas.take) || 10; // Default to 10 if not provided
const skip = Number(datas.skip) || 0;  // Default to 0 if not provided

try {
    // Step 1: Get the total count of matching records
    const count = await entities.daily_otp.createQueryBuilder("alias")
            .where("alias.isDeleted = :isDeleted", { isDeleted: 0 })
            .andWhere("DATE(alias.FlightDate) = :FlightDate", { FlightDate: formattedDate.toISOString().split('T')[0] })
            // .take(datas.take) 
            // .skip(datas.skip) 
            .getCount();

    let data;

    if (count <= take) {
        // Step 2: If the dataset is small, fetch all records without pagination
        data = await entities.daily_otp.createQueryBuilder("alias")
            .where("alias.isDeleted = :isDeleted", { isDeleted: 0 })
    .andWhere("DATE(alias.FlightDate) = :FlightDate", { FlightDate: formattedDate.toISOString().split('T')[0] })
            .take(take) 
            .skip(skip) 
            .getMany();
    } else {
        // Step 3: Apply pagination for larger datasets
        data = await entities.daily_otp.createQueryBuilder("alias")
         .where("alias.isDeleted = :isDeleted", { isDeleted: 0 })
    .andWhere("DATE(alias.FlightDate) = :FlightDate", { FlightDate: formattedDate.toISOString().split('T')[0] })
            .take(take) 
            .skip(skip) 
            .getMany();
    }

console.log('data' , data)
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
