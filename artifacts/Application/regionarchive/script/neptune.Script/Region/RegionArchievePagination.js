
var paginationBar14 = {
    configuration14: {
        maxNumberOfButtons: 6, 
    },
    pagination14: {
        take: 10, 
        index: 1, 
        count: 1,  
    },
    totalCount14: 0,  
    isSearchMode14: false,  

    
    run14: function () {
        paginationBar14.isSearchMode14 = false; 
        paginationBar14.pagination14.index = 1; 
        paginationBar14.executeFetch14();
    },

  
    searchRegionArchive: function (keepIndex) {
        const searchValue = SearchField7.getValue().trim();  

        if (!searchValue) {
         
            paginationBar14.run14();
            return;
        }

        paginationBar14.isSearchMode14 = true;  

        
        paginationBar14.pagination14.index = 1;  

        if (!keepIndex) {
            paginationBar14.pagination14.index = 1;  
        }

    
        paginationBar14.executeFetch14();
    },

   
    updatePaginationUI14: function () {
        const take = paginationBar14.pagination14.take;
        const maxIndex = Math.ceil(paginationBar14.totalCount14 / take);  

      
        paginationBar14.pagination14.index = Math.min(paginationBar14.pagination14.index, maxIndex);
        if (paginationBar14.pagination14.index < 1) {
            paginationBar14.pagination14.index = 1;
        }

        
        toolPaginationFirst11.setEnabled(paginationBar14.pagination14.index > 1);
        toolPaginationPrev11.setEnabled(paginationBar14.pagination14.index > 1);
        toolPaginationNext11.setEnabled(paginationBar14.pagination14.index < maxIndex);
        toolPaginationLast11.setEnabled(paginationBar14.pagination14.index < maxIndex);

        
        toolPaginationPages11.destroyItems();

        const maxItems = paginationBar14.configuration14.maxNumberOfButtons;
        const startItem = Math.max(1, paginationBar14.pagination14.index - Math.floor(maxItems / 2));
        const endItem = Math.min(maxIndex, startItem + maxItems - 1);

        for (let i = startItem; i <= endItem; i++) {
            toolPaginationPages11.addItem(new sap.m.SegmentedButtonItem({
                text: i.toString(),
                key: i,
                press: function () {
                    if (paginationBar14.pagination14.index !== i) {
                        paginationBar14.pagination14.index = i; 
                        paginationBar14.handleModePagination14(); 
                        paginationBar14.updatePaginationUI14(); 
                    }
                }
            }));
        }

      
        toolPaginationPages11.setSelectedKey(paginationBar14.pagination14.index);
        toolPaginationTitle11.setNumber(`${paginationBar14.pagination14.index} / ${maxIndex}`); 
    },

   
    executeFetch14: function () {
        const index = parseInt(paginationBar14.pagination14.index, 10);
        const take = parseInt(paginationBar14.pagination14.take, 10);
        const skip = take * (index - 1);

        const url = paginationBar14.isSearchMode14
            ? `http://localhost:8080/api/serverscript/cabserverside/RegionSearchArchive`
            : `http://localhost:8080/api/serverscript/cabserverside/RegionArchive`;

        const data = paginationBar14.isSearchMode14
            ? { countryname: SearchField7.getValue(), take, skip }
            : { take, skip };

       
        $.ajax({
            url: url,
            method: 'POST',
            data: data,
            success: function (response) {
                console.log('API response:', response);

                if (response && Array.isArray(response.data)) {
                    modelTable11.setData(response.data); 
                    paginationBar14.totalCount14 = response.totalCount || 0; 
                  
                    paginationBar14.updatePaginationUI14();
                } else {
                    console.error('Invalid response:', response);
                }
            },
            error: function (xhr, status, error) {
                console.error('API call failed:', error);
            }
        });
    },


    handleModePagination14: function () {
        paginationBar14.executeFetch14();
        paginationBar14.updatePaginationUI14();
    },
};

// Initial call
paginationBar14.run14(true);









 








 

