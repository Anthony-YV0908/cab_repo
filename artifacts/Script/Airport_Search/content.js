


//  const datas = req.body;

// log.info(datas)
// const queryBuilder = entities.airport.createQueryBuilder("alias")
        
//        .where("isDeleted = :isDeleted", { isDeleted: 0 })
//        .andWhere("Country_Name = :Country_Name", { Country_Name: datas.countryname })
//        .take(datas.take) 
//        .skip(datas.skip) 
// const data = await queryBuilder.getMany();
// const count = await queryBuilder.getCount();

// console.log('FlightsOnTime:', data);
// console.log('Count:', count);

// return res.json({
//     data,
//     totalCount: count,
// });













const datas = req.body;

log.info(datas);

// Validate and set default pagination values
const take = Number(datas.take) || 10; // Default to 10 if not provided
const skip = Number(datas.skip) || 0;  // Default to 0 if not provided

try {
    // Step 1: Get the total count of matching records
    const count = await entities.airport.createQueryBuilder("alias")
        .where("isDeleted = :isDeleted", { isDeleted: 0 })
        .andWhere("Country_Name = :Country_Name", { Country_Name: datas.countryname })
        .getCount();

    let data;

    if (count <= take) {
        // Step 2: If the dataset is small, fetch all records without pagination
        data = await entities.airport.createQueryBuilder("alias")
            .where("isDeleted = :isDeleted", { isDeleted: 0 })
            .andWhere("Country_Name = :Country_Name", { Country_Name: datas.countryname })
            .getMany();
    } else {
        // Step 3: Apply pagination for larger datasets
        data = await entities.airport.createQueryBuilder("alias")
            .where("isDeleted = :isDeleted", { isDeleted: 0 })
            .andWhere("Country_Name = :Country_Name", { Country_Name: datas.countryname })
            .take(take)
            .skip(skip)
            .getMany();
    }

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




