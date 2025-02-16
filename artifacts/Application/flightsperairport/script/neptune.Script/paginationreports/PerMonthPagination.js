var paginationBar10 = {
    configuration10: {
        maxNumberOfButtons: 6,
    },
    pagination10: {
        take: 10, // Number of records per page
        index: 1,  // Current page index (starts from 1)
        count: 1,  // Total count of records (to be updated dynamically)
    },

    totalCount10: 0,


    run10: function () {


        var index = parseInt(paginationBar10.pagination10.index, 10);
        var takePagination = parseInt(paginationBar10.pagination10.take, 10);
        var skipPagination = takePagination * (paginationBar10.pagination10.index - 1);
      const url = `/api/serverscript/cabserverside/PerMonth`;

         var permonth = PerMonthFlight.getValue(); 


        if(!permonth) 
        { 
            sap.m.MessageToast.show("No Month is choosen") 
               return;

        }
        // Set the flag to indicate API call in progress
        // paginationBar10.isApiCalled = true;

     

        $.ajax({
            type: 'POST',
            url: url,
            data: {month:permonth, take:takePagination, skip:skipPagination }, // Send `take` and `skip` as query parameters
            success: function (response) {
               console.log("API response:", response.data);

                if (response && Array.isArray(response.data)) {
                    modelTable5.setData(response.data);
                    console.log("Data appended to the table:", response.data);
                } else {
                    console.log("No data returned.");
                }

                paginationBar10.totalCount10 = response.totalCount || 0; // Update global totalCount
                paginationBar10.handlePagination10(paginationBar10.totalCount10);
            },

            
            error: function (error) {
                console.error('Error during API call:', error);
            },
            complete: function () {
                // Reset the flag after the API call
                paginationBar10.isApiCalled = false;
            },
        });
    },

    searchCreateAirport: function() 
    { 
        let search = SearchField1;
        let searchValue = search.getValue();

        // Calculate 'take' and 'skip' for pagination
        var index = parseInt(paginationBar10.pagination10.index, 10); // Current page index
        var take = parseInt(paginationBar10.pagination10.take, 10);  // Number of records per page
        var skip = take * index; // Calculate skip based on current page

      const url = `/api/serverscript/cabserverside/AirportSearch`;

        $.ajax({
            url: url,
            method: 'GET',
              data: {
                countryname: searchValue,
                take: take,
                skip: skip
            },
            success: function (response) {
                console.log('This is the search response', response);

                if (response && Array.isArray(response.data)) {
                    modelTable5.setData(response.data);
                    console.log("Data appended to the table:", response.data);
                } else {
                    console.log("No data returned.");
                }

                paginationBar10.totalCount10 = response.totalCount || 0; // Update global totalCount
                paginationBar10.handlePagination10(paginationBar10.totalCount10);
            },
            error: function (xhr, status, error) {
                console.error('Search failed:', error);
            }
        });
    },

    handlePagination10: function (totalCount10) {
        const take = paginationBar10.pagination10.take;
        console.log('take' ,take)
        const maxIndex = Math.ceil(totalCount10 / take);

      

        // Enable/disable navigation buttons
        toolPaginationFirst10.setEnabled(paginationBar10.pagination10.index > 1);
        toolPaginationPrev10.setEnabled(paginationBar10.pagination10.index > 1);
        toolPaginationNext10.setEnabled(paginationBar10.pagination10.index < maxIndex);
        toolPaginationLast10.setEnabled(paginationBar10.pagination10.index < maxIndex);

        // Clear old pagination buttons
        toolPaginationPages10.destroyItems();

        const maxItems = paginationBar10.configuration10.maxNumberOfButtons;
        const startItem = Math.max(1, paginationBar10.pagination10.index - Math.floor(maxItems / 2));
        const endItem = Math.min(maxIndex, startItem + maxItems - 1);



            
            for (let i = startItem; i <= endItem; i++) {
            toolPaginationPages10.addItem(new sap.m.SegmentedButtonItem({
                text: i.toString(),
                key: i,
                 press: function () {
                     paginationBar10.pagination10.index = i
                        paginationBar10.run10();
                }
            }));
        }

        toolPaginationPages10.setSelectedKey(paginationBar10.pagination10.index);
        toolPaginationTitle10.setNumber(`${paginationBar10.pagination10.index} / ${maxIndex}`);
    },
};

// Initialize and fetch data for the first time
// paginationBar10.run10(true);
// paginationBar2.searchCreateAirport(true)
