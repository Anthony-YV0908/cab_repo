var paginationBar12 = {
    configuration12: {
        maxNumberOfButtons: 6,
    },
    pagination12: {
        take: 10, // Number of records per page
        index: 1,  // Current page index (starts from 1)
        count: 1,  // Total count of records (to be updated dynamically)
    },

    totalCount12: 0,


    run12: function () {


        var index = parseInt(paginationBar12.pagination12.index, 10);
        var takePagination = parseInt(paginationBar12.pagination12.take, 10);
        var skipPagination = takePagination * (paginationBar12.pagination12.index - 1);
      const url = `/api/serverscript/cabserverside/PerYear`;

        var yearflights = FlightsYear.getValue()


        if(!yearflights) 
        { 
            sap.m.MessageToast("No year is selected") 
               return;
        }


        // // Set the flag to indicate API call in progress
        // paginationBar12.isApiCalled = true;

     

        $.ajax({
            type: 'POST',
            url: url,
            data: { year:yearflights ,take:takePagination, skip:skipPagination }, // Send `take` and `skip` as query parameters
            success: function (response) {
               console.log("API response:", response.data);

                if (response && Array.isArray(response.data)) {
                    modelTable1.setData(response.data);
                    console.log("Data appended to the table:", response.data);
                } else {
                    console.log("No data returned.");
                }

                paginationBar12.totalCount12 = response.totalCount || 0; // Update global totalCount
                paginationBar12.handlePagination12(paginationBar12.totalCount12);
            },

            
            error: function (error) {
                console.error('Error during API call:', error);
            },
            complete: function () {
                // Reset the flag after the API call
                paginationBar12.isApiCalled = false;
            },
        });
    },

    searchCreateAirport: function() 
    { 
        let search = SearchField1;
        let searchValue = search.getValue();

        // Calculate 'take' and 'skip' for pagination
        var index = parseInt(paginationBar12.pagination12.index, 10); // Current page index
        var take = parseInt(paginationBar12.pagination12.take, 10);  // Number of records per page
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
                    modelTable1.setData(response.data);
                    console.log("Data appended to the table:", response.data);
                } else {
                    console.log("No data returned.");
                }

                paginationBar12.totalCount12 = response.totalCount || 0; // Update global totalCount
                paginationBar12.handlePagination12(paginationBar12.totalCount12);
            },
            error: function (xhr, status, error) {
                console.error('Search failed:', error);
            }
        });
    },

    handlePagination12: function (totalCount12) {
        const take = paginationBar12.pagination12.take;
        console.log('take' ,take)
        const maxIndex = Math.ceil(totalCount12 / take);

      

        // Enable/disable navigation buttons
        toolPaginationFirst12.setEnabled(paginationBar12.pagination12.index > 1);
        toolPaginationPrev12.setEnabled(paginationBar12.pagination12.index > 1);
        toolPaginationNext12.setEnabled(paginationBar12.pagination12.index < maxIndex);
        toolPaginationLast12.setEnabled(paginationBar12.pagination12.index < maxIndex);

        // Clear old pagination buttons
        toolPaginationPages12.destroyItems();

        const maxItems = paginationBar12.configuration12.maxNumberOfButtons;
        const startItem = Math.max(1, paginationBar12.pagination12.index - Math.floor(maxItems / 2));
        const endItem = Math.min(maxIndex, startItem + maxItems - 1);



            
            for (let i = startItem; i <= endItem; i++) {
            toolPaginationPages12.addItem(new sap.m.SegmentedButtonItem({
                text: i.toString(),
                key: i,
                 press: function () {
                     paginationBar12.pagination12.index = i
                        paginationBar12.run12();
                }
            }));
        }

        toolPaginationPages12.setSelectedKey(paginationBar12.pagination12.index);
        toolPaginationTitle12.setNumber(`${paginationBar12.pagination12.index} / ${maxIndex}`);
    },
};

// Initialize and fetch data for the first time
// paginationBar12.run12(true);
// paginationBar2.searchCreateAirport(true)
