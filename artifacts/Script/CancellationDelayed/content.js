/*
    This code snippet is for fetching a single entity or multiple entries from a table based on a condition, in this case, 
    where the entity's ID matches a specified value.
*/
const entity = await entities.daily_otp.createQueryBuilder("alias")
    .where("alias.id = :id", {id: 1})
    .getOne();

const entity = await entities.daily_otp.createQueryBuilder("alias")
    .where("alias.id = :id", {id: 1})
    .getMany();
