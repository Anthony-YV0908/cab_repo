


const moment = modules.moment;


const datas = req.body;


const take = Number(datas.take) || 10; 
const skip = Number(datas.skip) || 0;  

try {
    // Step 1: Get the total count of matching records
    const count = await entities.globalregion_archive.createQueryBuilder("alias")
            .where("alias.isDeleted = :isDeleted", { isDeleted: 1 })

            .take(datas.take) 
            .skip(datas.skip) 
            .getCount();

    let data;

    if (count <= take) {
        // Step 2: If the dataset is small, fetch all records without pagination
        data = await entities.globalregion_archive.createQueryBuilder("alias")
            .where("alias.isDeleted = :isDeleted", { isDeleted: 1 })

            // .take(take) 
            // .skip(skip) 
            .getMany();
    } else {
        // Step 3: Apply pagination for larger datasets
        data = await entities.globalregion_archive.createQueryBuilder("alias")
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


