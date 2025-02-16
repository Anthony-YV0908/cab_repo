
const datas = req.body;

log.info(datas);

const take = Number(datas.take) || 10; 
const skip = Number(datas.skip) || 0;  

try {
   
    const count = await entities.country_archive.createQueryBuilder("alias")
        .where("isDeleted = :isDeleted", { isDeleted: 1 })
        .andWhere("Country_Name = :Country_Name", { Country_Name: datas.countryname })
        .getCount();

    let data;

    if (count <= take) {
        // Step 2: If the dataset is small, fetch all records without pagination
        data = await entities.tbl_city.createQueryBuilder("alias")
            .where("isDeleted = :isDeleted", { isDeleted: 1 })
            .andWhere("Country_Name = :Country_Name", { Country_Name: datas.countryname })
            .getMany();
    } else {
        // Step 3: Apply pagination for larger datasets
        data = await entities.tbl_city.createQueryBuilder("alias")
            .where("isDeleted = :isDeleted", { isDeleted: 1 })
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
    return res.status(510).json({
        error: "An error occurred while fetching data.",
    });
}
