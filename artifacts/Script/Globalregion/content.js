


//  const datas = req.body;

// const queryBuilder = entities.tbl_globalregion.createQueryBuilder("alias")
        
//        .where("isDeleted = :isDeleted", { isDeleted: 0 })
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






const moment = modules.moment;


const datas = req.body;


const take = Number(datas.take) || 10; 
const skip = Number(datas.skip) || 0;  

try {
    // Step 1: Get the total count of matching records
    const count = await entities.tbl_globalregion.createQueryBuilder("alias")
            .where("alias.isDeleted = :isDeleted", { isDeleted: 0 })
          
            .take(datas.take) 
            .skip(datas.skip) 
            .getCount();

    let data;

    if (count <= take) {
       
        data = await entities.tbl_globalregion.createQueryBuilder("alias")
            .where("alias.isDeleted = :isDeleted", { isDeleted: 0 })
   
            .getMany();
    } else {
        // Step 3: Apply pagination for larger datasets
        data = await entities.tbl_globalregion.createQueryBuilder("alias")
        .where("alias.isDeleted = :isDeleted", { isDeleted: 0 })

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





