var paginationBar13 = {
    configuration13: {
        maxNumberOfButtons: 6,
    },
    pagination13: {
        take: 10, // Number of records per page
        index: 1,  // Current page index (starts from 1)
        count: 1,  // Total count of records (to be updated dynamically)
    },

    totalCount13: 0,


    run13: function () {


        var index = parseInt(paginationBar13.pagination13.index, 10);
        var takePagination = parseInt(paginationBar13.pagination13.take, 10);
        var skipPagination = takePagination * (paginationBar13.pagination13.index - 1);
      const url = `api/serverscript/cabserverside/OnTimePerformancePerAirline`;


    var month = OnTimePerformanceAirlineDate.getValue()
    var AirlineOnTime = OnTimePerformancePerAirlineInput.getValue()

    if(!month) 
    { 
        sap.m.MessageToast.show("No month is choosen ")
           return;
    } 

    if(!AirlineOnTime) 
    { 
        sap.m.MessageToast.show("No Airline is choosen")
        return;
    }


        // Set the flag to indicate API call in progress
        paginationBar13.isApiCalled = true;

     

        $.ajax({
            type: 'POST',
            url: url,
            data: { Month:month, Airline:AirlineOnTime, take:takePagination, skip:skipPagination }, // Send `take` and `skip` as query parameters
            success: function (response) {
               console.log("API response:", response.data);

                if (response && Array.isArray(response.data)) {
                    modelTable16.setData(response.data);
                    console.log("Data appended to the table:", response.data);
                } else {
                    console.log("No data returned.");
                }

                paginationBar13.totalCount13 = response.totalCount || 0; // Update global totalCount
                paginationBar13.handlePagination13(paginationBar13.totalCount13);
            },

            
            error: function (error) {
                console.error('Error during API call:', error);
            },
            complete: function () {
                // Reset the flag after the API call
                paginationBar13.isApiCalled = false;
            },
        });
    },

    searchCreateAirport: function() 
    { 
        let search = SearchField1;
        let searchValue = search.getValue();

        // Calculate 'take' and 'skip' for pagination
        var index = parseInt(paginationBar13.pagination13.index, 10); // Current page index
        var take = parseInt(paginationBar13.pagination13.take, 10);  // Number of records per page
        var skip = take * index; // Calculate skip based on current page

      const url = `api/serverscript/cabserverside/AirportSearch`;

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
                    modelTable16.setData(response.data);
                    console.log("Data appended to the table:", response.data);
                } else {
                    console.log("No data returned.");
                }

                paginationBar13.totalCount13 = response.totalCount || 0; // Update global totalCount
                paginationBar13.handlePagination13(paginationBar13.totalCount13);
            },
            error: function (xhr, status, error) {
                console.error('Search failed:', error);
            }
        });
    },

    handlePagination13: function (totalCount13) {
        const take = paginationBar13.pagination13.take;
        console.log('take' ,take)
        const maxIndex = Math.ceil(totalCount13 / take);

      

        // Enable/disable navigation buttons
        toolPaginationFirst13.setEnabled(paginationBar13.pagination13.index > 1);
        toolPaginationPrev13.setEnabled(paginationBar13.pagination13.index > 1);
        toolPaginationNext13.setEnabled(paginationBar13.pagination13.index < maxIndex);
        toolPaginationLast13.setEnabled(paginationBar13.pagination13.index < maxIndex);

        // Clear old pagination buttons
        toolPaginationPages13.destroyItems();

        const maxItems = paginationBar13.configuration13.maxNumberOfButtons;
        const startItem = Math.max(1, paginationBar13.pagination13.index - Math.floor(maxItems / 2));
        const endItem = Math.min(maxIndex, startItem + maxItems - 1);



            
            for (let i = startItem; i <= endItem; i++) {
            toolPaginationPages13.addItem(new sap.m.SegmentedButtonItem({
                text: i.toString(),
                key: i,
                 press: function () {
                     paginationBar13.pagination13.index = i
                        paginationBar13.run13();
                }
            }));
        }

        toolPaginationPages13.setSelectedKey(paginationBar13.pagination13.index);
        toolPaginationTitle13.setNumber(`${paginationBar13.pagination13.index} / ${maxIndex}`);
    },
};

// Initialize and fetch data for the first time
// paginationBar13.run13();
// paginationBar2.searchCreateAirport(true)
