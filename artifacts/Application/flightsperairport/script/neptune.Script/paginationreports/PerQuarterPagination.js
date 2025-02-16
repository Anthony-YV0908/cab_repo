var paginationBar11 = {
    configuration11: {
        maxNumberOfButtons: 6,
    },
    pagination11: {
        take: 10, // Number of records per page
        index: 1,  // Current page index (starts from 1)
        count: 1,  // Total count of records (to be updated dynamically)
    },

    totalCount11: 0,


    run11: function () {


        var index = parseInt(paginationBar11.pagination11.index, 10);
        var takePagination = parseInt(paginationBar11.pagination11.take, 10);
        var skipPagination = takePagination * (paginationBar11.pagination11.index - 1);
      const url = `/api/serverscript/cabserverside/PerQuarter`;

         var perQuarter = Select1.getSelectedKey() 


         if(!perQuarter) 
         { 
            sap.m.MessageToast.show("No quarter is selected") 
         }

        // Set the flag to indicate API call in progress
        paginationBar11.isApiCalled = true;

     

        $.ajax({
            type: 'POST',
            url: url,
            data: {quarter:perQuarter, take:takePagination, skip:skipPagination }, // Send `take` and `skip` as query parameters
            success: function (response) {
               console.log("API response:", response.data);

                if (response && Array.isArray(response.data)) {
                    modelTable6.setData(response.data);
                    console.log("Data appended to the table:", response.data);
                } else {
                    console.log("No data returned.");
                }

                paginationBar11.totalCount11 = response.totalCount || 0; // Update global totalCount
                paginationBar11.handlePagination11(paginationBar11.totalCount11);
            },

            
            error: function (error) {
                console.error('Error during API call:', error);
            },
            complete: function () {
                // Reset the flag after the API call
                paginationBar11.isApiCalled = false;
            },
        });
    },

    searchCreateAirport: function() 
    { 
        let search = SearchField1;
        let searchValue = search.getValue();

        // Calculate 'take' and 'skip' for pagination
        var index = parseInt(paginationBar11.pagination11.index, 10); // Current page index
        var take = parseInt(paginationBar11.pagination11.take, 10);  // Number of records per page
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
                    modelTable6.setData(response.data);
                    console.log("Data appended to the table:", response.data);
                } else {
                    console.log("No data returned.");
                }

                paginationBar11.totalCount11 = response.totalCount || 0; // Update global totalCount
                paginationBar11.handlePagination11(paginationBar11.totalCount11);
            },
            error: function (xhr, status, error) {
                console.error('Search failed:', error);
            }
        });
    },

    handlePagination11: function (totalCount11) {
        const take = paginationBar11.pagination11.take;
        console.log('take' ,take)
        const maxIndex = Math.ceil(totalCount11 / take);

      

        // Enable/disable navigation buttons
        toolPaginationFirst11.setEnabled(paginationBar11.pagination11.index > 1);
        toolPaginationPrev11.setEnabled(paginationBar11.pagination11.index > 1);
        toolPaginationNext11.setEnabled(paginationBar11.pagination11.index < maxIndex);
        toolPaginationLast11.setEnabled(paginationBar11.pagination11.index < maxIndex);

        // Clear old pagination buttons
        toolPaginationPages11.destroyItems();

        const maxItems = paginationBar11.configuration11.maxNumberOfButtons;
        const startItem = Math.max(1, paginationBar11.pagination11.index - Math.floor(maxItems / 2));
        const endItem = Math.min(maxIndex, startItem + maxItems - 1);



            
            for (let i = startItem; i <= endItem; i++) {
            toolPaginationPages11.addItem(new sap.m.SegmentedButtonItem({
                text: i.toString(),
                key: i,
                 press: function () {
                     paginationBar11.pagination11.index = i
                        paginationBar11.run11();
                }
            }));
        }

        toolPaginationPages11.setSelectedKey(paginationBar11.pagination11.index);
        toolPaginationTitle11.setNumber(`${paginationBar11.pagination11.index} / ${maxIndex}`);
    },
};

// Initialize and fetch data for the first time
// paginationBar11.run11(true);
// paginationBar2.searchCreateAirport(true)
