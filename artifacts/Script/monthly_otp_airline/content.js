
const moment = modules.moment;
const reqData = req.body;





const take = Number(reqData.take) || 10; 
const skip = Number(reqData.skip) || 0;  
const queryBuilder = await entities.monthly_otp.createQueryBuilder("alias")
  
    .where("isDeleted = :isDeleted", { isDeleted: 0 })
   
    .andWhere('Year = :Year',{Year:reqData.Year})
    .andWhere('Month = :Month' , {Month:reqData.Month})
    .andWhere('Airline = :Airline' , {
        Airline:reqData.Airline
    })

   
    
    .getMany();

const count = queryBuilder.length;

console.log(count);

let resultData;

if (count <= take) {
    // Fetch all records without pagination
    resultData = await entities.monthly_otp.createQueryBuilder("alias")
    
    .where("isDeleted = :isDeleted", { isDeleted: 0 })
    
    .andWhere('Year = :Year',{Year:reqData.Year})
    .andWhere('Month = :Month' , {Month:reqData.Month})
    .andWhere('Airline = :Airline' , {
        Airline:reqData.Airline
    })


        // .groupBy("FlightDate")
        .getMany();
} else {
    // Apply pagination for larger datasets
    resultData = await entities.monthly_otp.createQueryBuilder("alias")
    
        .where("isDeleted = :isDeleted", { isDeleted: 0 })
      .andWhere('Year = :Year',{Year:reqData.Year})
    .andWhere('Month = :Month' , {Month:reqData.Month})
    .andWhere('Airline = :Airline' , {
        Airline:reqData.Airline
    })


        // // .groupBy("FlightDate")
        .take(take)
        .skip(skip)
        .getMany();
}

console.log(resultData);
console.log('this is count', count);

// Return the results with total count
return res.json({
    data: resultData,
    totalCount: count,
});



