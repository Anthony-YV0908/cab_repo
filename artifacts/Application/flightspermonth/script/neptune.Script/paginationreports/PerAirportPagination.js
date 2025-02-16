var paginationBar8 = {
    configuration8: {
        maxNumberOfButtons: 6,
    },
    pagination8: {
        take: 10, // Number of records per page
        index: 1,  // Current page index (starts from 1)
        count: 1,  // Total count of records (to be updated dynamically)
    },

    totalCount8: 0,


    run8: function () {


        var index = parseInt(paginationBar8.pagination8.index, 10);
        var takePagination = parseInt(paginationBar8.pagination8.take, 10);
        var skipPagination = takePagination * (paginationBar8.pagination8.index - 1);
      const url = `/api/serverscript/cabserverside/FlightsPerAirport`;

              var fromDate = DatePerAirport.getFrom()
                var toDate = DatePerAirport.getTo()
                var airportinput = AirportInput_1.getValue()




    if(!fromDate && !toDate ) 
    { 
        sap.m.MessageToast.show('No date choosen ')
           return;
        return;
    }


    if(!airportinput)
    {
        sap.m.MessageToast.show("No airport choosen")
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
        paginationBar8.isApiCalled = true;








     

        $.ajax({
            type: 'POST',
            url: url,
            data: {from:formattedStartDate, to:formattedEndDate, airport:airportinput, take:takePagination, skip:skipPagination }, // Send `take` and `skip` as query parameters
            success: function (response) {
               console.log("API response:", response.data);

                if (response && Array.isArray(response.data)) {
                    modelTable8.setData(response.data);
                    console.log("Data appended to the table:", response.data);
                } else {
                    console.log("No data returned.");
                }

                paginationBar8.totalCount8 = response.totalCount || 0; // Update global totalCount
                paginationBar8.handlePagination8(paginationBar8.totalCount8);
            },

            
            error: function (error) {
                console.error('Error during API call:', error);
            },
            complete: function () {
                // Reset the flag after the API call
                paginationBar8.isApiCalled = false;
            },
        });
    },

    searchCreateAirport: function() 
    { 
        let search = SearchField1;
        let searchValue = search.getValue();

        // Calculate 'take' and 'skip' for pagination
        var index = parseInt(paginationBar8.pagination8.index, 10); // Current page index
        var take = parseInt(paginationBar8.pagination8.take, 10);  // Number of records per page
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
                    modelTable8.setData(response.data);
                    console.log("Data appended to the table:", response.data);
                } else {
                    console.log("No data returned.");
                }

                paginationBar8.totalCount8 = response.totalCount || 0; // Update global totalCount
                paginationBar8.handlePagination8(paginationBar8.totalCount8);
            },
            error: function (xhr, status, error) {
                console.error('Search failed:', error);
            }
        });
    },

    handlePagination8: function (totalCount8) {
        const take = paginationBar8.pagination8.take;
        console.log('take' ,take)
        const maxIndex = Math.ceil(totalCount8 / take);

      

        // Enable/disable navigation buttons
        toolPaginationFirst7.setEnabled(paginationBar8.pagination8.index > 1);
        toolPaginationPrev7.setEnabled(paginationBar8.pagination8.index > 1);
        toolPaginationNext7.setEnabled(paginationBar8.pagination8.index < maxIndex);
        toolPaginationLast7.setEnabled(paginationBar8.pagination8.index < maxIndex);

        // Clear old pagination buttons
        toolPaginationPages7.destroyItems();

        const maxItems = paginationBar8.configuration8.maxNumberOfButtons;
        const startItem = Math.max(1, paginationBar8.pagination8.index - Math.floor(maxItems / 2));
        const endItem = Math.min(maxIndex, startItem + maxItems - 1);



            
            for (let i = startItem; i <= endItem; i++) {
            toolPaginationPages7.addItem(new sap.m.SegmentedButtonItem({
                text: i.toString(),
                key: i,
                 press: function () {
                     paginationBar8.pagination8.index = i
                        paginationBar8.run8();
                }
            }));
        }

        toolPaginationPages7.setSelectedKey(paginationBar8.pagination8.index);
        toolPaginationTitle7.setNumber(`${paginationBar8.pagination8.index} / ${maxIndex}`);
    },
};

// Initialize and fetch data for the first time
// paginationBar8.run8(true);
// paginationBar2.searchCreateAirport(true)
