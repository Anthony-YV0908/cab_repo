


 const datas = req.body;

const queryBuilder = entities.globalregion_archive.createQueryBuilder("alias")
        
        .where("isDeleted = :isDeleted", { isDeleted: 1 })
       .andWhere("GlobalRegionName = :GlobalRegionName", { GlobaRegionName: datas.globalregionname })
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







