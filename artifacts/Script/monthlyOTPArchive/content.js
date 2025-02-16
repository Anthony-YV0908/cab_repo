const moment = modules.moment;


const datas = req.body;


const take = Number(10) || 10; 
const skip = Number(0) || 0;  

try {
    // Step 1: Get the total count of matching records
    const count = await entities.monthly_otp_archive.createQueryBuilder("alias")
            .where("alias.isDeleted = :isDeleted", { isDeleted: 1 })
            
            .take(take)
            .skip(skip)
            .getCount();

    let data;

    if (count <= take) {
        // Step 2: If the dataset is small, fetch all records without pagination
        data = await entities.monthly_otp_archive.createQueryBuilder("alias")
            .where("alias.isDeleted = :isDeleted", { isDeleted: 1 })
            .take(take)
            .skip(skip)
            .getMany();
    } else {
        // Step 3: Apply pagination for larger datasets
        data = await entities.monthly_otp_archive.createQueryBuilder("alias")
         .where("alias.isDeleted = :isDeleted", { isDeleted: 1 })
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






// const moment = modules.moment
// const momenttimezone = modules.momenttimezone


// const datas = req.body;

// // Parse the input date and convert it to the desired timezone
// const formattedDate = momenttimezone.tz('02/01/25', "MM/DD/YY", "Asia/Manila").format("YYYY-MM-DD");

// // Create the date string without time to store in the database
// const formattedDated = `${formattedDate}T00:00:00.000Z`;

// // Log the output for debugging
// console.log("Formatted Date:", formattedDated);


