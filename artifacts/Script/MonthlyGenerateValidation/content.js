const data = {
  month:'Jan' , 
  year:'2025', 
  airport:'IMK',
  airline:'7V'
}


// const month = 'Feb';
// const year = '2025';
// const airport = '7V';
// const airline = 'RWN';

const duplicateRecordsCount = await entities.monthly_otp.createQueryBuilder("monthly_otp")
    .where("monthly_otp.Month = :month", { month:data.month })
   .andWhere("monthly_otp.Year = :year", { year:data.year })
   .andWhere("monthly_otp.Airport = :airport", { airport:data.airport })
   .andWhere("monthly_otp.Airline = :airline", { airline:data.airline })
  .getCount();



  result = duplicateRecordsCount

  console.log(duplicateRecordsCount)

    // console.log("Duplicate Records Count:", duplicateRecordsCount);

    // if (duplicateRecordsCount > 0) {
    // console.log('Duplicate records found!');
    // } else {
    // console.log('No duplicate records found.');
    // }



// const entity = await entities.monthly_otp.createQueryBuilder("alias")
   
//     .getMany();


// // const countentity = entity.length 

// console.log(entity)