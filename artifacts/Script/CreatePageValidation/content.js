/*
    This code snippet is for fetching a single entity or multiple entries from a table based on a condition, in this case, 
    where the entity's ID matches a specified value.
*/

const data = req.body
const validation = await entities.daily_otp.createQueryBuilder("alias")
    
  
    .where("FlightNumber = :FlightNumber ", {FlightNumber:data.flightnumber})
    .andWhere("FlightId = :FlightId",{FlightId:data.flightid})
    .getCount()



result = validation
// if(validation > 0) 
// { 
//     console.log('there is the same data' )
// }else 
// { 
//     console.log('no duplicate data ')
// }
// const entity = await entities.daily_otp.createQueryBuilder("alias")

//     .getMany();


// console.log(entity)