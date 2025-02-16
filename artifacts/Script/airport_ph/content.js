/*
    This code snippet is for fetching a single entity or multiple entries from a table based on a condition, in this case, 
    where the entity's ID matches a specified value.
*/
const entity = await entities.airport.createQueryBuilder("alias")
    
    .getMany();



console.log('entity' , entity)