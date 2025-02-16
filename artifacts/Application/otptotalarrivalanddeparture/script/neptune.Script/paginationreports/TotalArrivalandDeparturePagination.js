var paginationBar4 = {
    configuration4: {
        maxNumberOfButtons: 6,
    },
    pagination4: {
        take: 10, // Number of records per page
        index: 1,  // Current page index (starts from 1)
        count: 1,  // Total count of records (to be updated dynamically)
    },

    totalCount4: 0,


    run4: function () {


        var index = parseInt(paginationBar4.pagination4.index, 10);
        var takePagination = parseInt(paginationBar4.pagination4.take, 10);
        var skipPagination = takePagination * (paginationBar4.pagination4.index - 1);
      const url = `/api/serverscript/cabserverside/OnTimePercentTotalArrivalandDeparture`;

     

    var fromDate = TotalArrivalandDeparture.getFrom()
    var toDate = TotalArrivalandDeparture.getTo()


    if(!fromDate && !toDate) 
    { 
        sap.m.MessageToast.show('No date choosen ')
        return;
    }

  // Validate the dates
    if (!(fromDate instanceof Date) || isNaN(fromDate)) {
        console.error("Invalid fromDate. Please check the input.");
        return;
    }

    if (!(toDate instanceof Date) || isNaN(toDate)) {
        console.error("Invalid toDate. Please check the input.");
        return;
    }

    // Format the start date
    const formattedStartDate = fromDate.toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "2-digit",
    })
    .split('/')
    .map(part => part.padStart(2, '0'))
    .join('/');

    // Format the end date
    const formattedEndDate = toDate.toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "2-digit",
    })
    .split('/')
    .map(part => part.padStart(2, '0'))
    .join('/');


        // Set the flag to indicate API call in progress
        paginationBar4.isApiCalled = true;

     

        $.ajax({
            type: 'POST',
            url: url,
            data: {from:formattedStartDate,to:formattedEndDate, take:takePagination, skip:skipPagination }, // Send `take` and `skip` as query parameters
            success: function (response) {
               console.log("API response:", response.data);

                if (response && Array.isArray(response.data)) {
                    modelTable14.setData(response.data);
                    console.log("Data appended to the table:", response.data);
                } else {
                    console.log("No data returned.");
                }

                paginationBar4.totalCount4 = response.totalCount || 0; // Update global totalCount
                paginationBar4.handlePagination4(paginationBar4.totalCount4);
            },

            
            error: function (error) {
                console.error('Error during API call:', error);
            },
            complete: function () {
                // Reset the flag after the API call
                paginationBar4.isApiCalled = false;
            },
        });
    },

    searchCreateAirport: function() 
    { 
        let search = SearchField1;
        let searchValue = search.getValue();

        // Calculate 'take' and 'skip' for pagination
        var index = parseInt(paginationBar4.pagination4.index, 10); // Current page index
        var take = parseInt(paginationBar4.pagination4.take, 10);  // Number of records per page
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
                    modelTable14.setData(response.data);
                    console.log("Data appended to the table:", response.data);
                } else {
                    console.log("No data returned.");
                }

                paginationBar4.totalCount4 = response.totalCount || 0; // Update global totalCount
                paginationBar4.handlePagination4(paginationBar4.totalCount4);
            },
            error: function (xhr, status, error) {
                console.error('Search failed:', error);
            }
        });
    },

    handlePagination4: function (totalCount4) {
        const take = paginationBar4.pagination4.take;
        console.log('take' ,take)
        const maxIndex = Math.ceil(totalCount4 / take);

      

        // Enable/disable navigation buttons
        toolPaginationFirst4.setEnabled(paginationBar4.pagination4.index > 1);
        toolPaginationPrev4.setEnabled(paginationBar4.pagination4.index > 1);
        toolPaginationNext4.setEnabled(paginationBar4.pagination4.index < maxIndex);
        toolPaginationLast4.setEnabled(paginationBar4.pagination4.index < maxIndex);

        // Clear old pagination buttons
        toolPaginationPages4.destroyItems();

        const maxItems = paginationBar4.configuration4.maxNumberOfButtons;
        const startItem = Math.max(1, paginationBar4.pagination4.index - Math.floor(maxItems / 2));
        const endItem = Math.min(maxIndex, startItem + maxItems - 1);



            
            for (let i = startItem; i <= endItem; i++) {
            toolPaginationPages4.addItem(new sap.m.SegmentedButtonItem({
                text: i.toString(),
                key: i,
                 press: function () {
                     paginationBar4.pagination4.index = i
                        paginationBar4.run4();
                }
            }));
        }

        toolPaginationPages4.setSelectedKey(paginationBar4.pagination4.index);
        toolPaginationTitle4.setNumber(`${paginationBar4.pagination4.index} / ${maxIndex}`);
    },
};

// Initialize and fetch data for the first time
// paginationBar4.run4(true);
// paginationBar2.searchCreateAirport(true)
