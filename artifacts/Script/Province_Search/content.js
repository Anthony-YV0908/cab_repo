
const datas = req.body;

// const datas = { 
//     provincename:'Cebu'
// }

log.info(datas);

const take = Number(datas.take) || 10; 
const skip = Number(datas.skip) || 0;  

try {
   
    const count = await entities.tbl_province.createQueryBuilder("alias")
        .where("isDeleted = :isDeleted", { isDeleted: 0 })
        .andWhere("ProvinceName = :ProvinceName", { ProvinceName: datas.provincename })
        .getCount();

    let data;


     if (count <= take) {
        // Step 2: If the dataset is small, fetch all records without pagination
        data = await entities.tbl_province.createQueryBuilder("alias")
            .where("isDeleted = :isDeleted", { isDeleted: 0 })
            .andWhere("ProvinceName = :ProvinceName", { ProvinceName: datas.provincename })
            .getMany();
    } else {
        // Step 3: Apply pagination for larger datasets
        data = await entities.tbl_province.createQueryBuilder("alias")
            .where("isDeleted = :isDeleted", { isDeleted: 0 })
            .andWhere("ProvinceName = :ProvinceName", { ProvinceName: datas.provincename })
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

