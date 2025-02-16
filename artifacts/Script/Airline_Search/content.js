


 const datas = req.body;

const queryBuilder = entities.airportcode.createQueryBuilder("alias")
        
      .where("isDeleted = :isDeleted", { isDeleted: 0 })
       .andWhere("Country_Name = :Country_Name", { Country_Name: datas.countryname })
       .take(datas.take) 
       .skip(datas.skip) 
const data = await queryBuilder.getMany();
const count = await queryBuilder.getCount();

console.log('FlightsOnTime:', data);
console.log('Count:', count);

return res.json({
    data,
    totalCount: count,
});




/*
    This code snippet is for fetching a single entity or multiple entries from a table based on a condition, in this case, 
    where the entity's ID matches a specified value.
*/
// const entity = await entities.monthly_otp.createQueryBuilder("alias")
//     .where("alias.id = :id", {id: 1})
//     .getOne();

// const entity = await entities.airportcode.createQueryBuilder("alias")
//     .where("Country_Name = :Country_Name", { Country_Name: 'Philippines' })
//     .getMany();


// console.log(entity)
