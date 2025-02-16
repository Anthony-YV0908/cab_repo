


const moment = modules.moment;


const datas = req.body;

// var currentDate = moment(datas.date, 'MM/DD/YY').format('M/DD/YY'); // Get the current date in the format 'YYYY-MM-DD'

// // Convert MM/DD/YY to YYYY-MM-DD format
// const [month, day, year] = currentDate.split('/').map(part => parseInt(part, 10));

// // Create a new date object, assuming the year is 20XX (i.e., 2025 for '25')
// const formattedDated = new Date(`20${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T00:00:00.000Z`);



const take = Number(datas.take) || 10; 
const skip = Number(datas.skip) || 0;  

try {
    // Step 1: Get the total count of matching records
    const count = await entities.airport_archive.createQueryBuilder("alias")
            .where("alias.isDeleted = :isDeleted", { isDeleted: 1 })

            .take(datas.take) 
            .skip(datas.skip) 
            .getCount();

    let data;

    if (count <= take) {
        // Step 2: If the dataset is small, fetch all records without pagination
        data = await entities.airport_archive.createQueryBuilder("alias")
            .where("alias.isDeleted = :isDeleted", { isDeleted: 1 })

            // .take(take) 
            // .skip(skip) 
            .getMany();
    } else {
        // Step 3: Apply pagination for larger datasets
        data = await entities.airport_archive.createQueryBuilder("alias")
         .where("alias.isDeleted = :isDeleted", { isDeleted: 1 })

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


