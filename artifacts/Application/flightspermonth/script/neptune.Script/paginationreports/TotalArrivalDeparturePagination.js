var paginationBar3 = {
    configuration3: {
        maxNumberOfButtons: 6,
    },
    pagination3: {
        take: 10, // Number of records per page
        index: 1,  // Current page index (starts from 1)
        count: 1,  // Total count of records (to be updated dynamically)
    },

    totalCount3: 0,


    run3: function () {


        var index = parseInt(paginationBar3.pagination3.index, 10);
        var takePagination = parseInt(paginationBar3.pagination3.take, 10);
        var skipPagination = takePagination * (paginationBar3.pagination3.index - 1);
      const url = `/api/serverscript/cabserverside/OnTimePercentTotalArrival`;




         console.log('pressed')
        var fromDate = PercentTotalArrivalDeparture.getFrom()
        var toDate = PercentTotalArrivalDeparture.getTo()


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
        paginationBar3.isApiCalled = true;

     

        $.ajax({
            type: 'POST',
            url: url,
            data: {from:formattedStartDate,to:formattedEndDate, take:takePagination, skip:skipPagination }, // Send `take` and `skip` as query parameters
            success: function (response) {
               console.log("API response:", response.data);

                if (response && Array.isArray(response.data)) {
                    modelTable13.setData(response.data);
                    console.log("Data appended to the table:", response.data);
                } else {
                    console.log("No data returned.");
                }

                paginationBar3.totalCount3 = response.totalCount || 0; // Update global totalCount
                paginationBar3.handlePagination3(paginationBar3.totalCount3);
            },

            
            error: function (error) {
                console.error('Error during API call:', error);
            },
            complete: function () {
                // Reset the flag after the API call
                paginationBar3.isApiCalled = false;
            },
        });
    },

    searchCreateAirport: function() 
    { 
        let search = SearchField1;
        let searchValue = search.getValue();

        // Calculate 'take' and 'skip' for pagination
        var index = parseInt(paginationBar3.pagination3.index, 10); // Current page index
        var take = parseInt(paginationBar3.pagination3.take, 10);  // Number of records per page
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
                    modelTable16.setData(response.data);
                    console.log("Data appended to the table:", response.data);
                } else {
                    console.log("No data returned.");
                }

                paginationBar3.totalCount3 = response.totalCount || 0; // Update global totalCount
                paginationBar3.handlePagination3(paginationBar3.totalCount3);
            },
            error: function (xhr, status, error) {
                console.error('Search failed:', error);
            }
        });
    },

    handlePagination3: function (totalCount3) {
        const take = paginationBar3.pagination3.take;
        console.log('take' ,take)
        const maxIndex = Math.ceil(totalCount3 / take);

      

        // Enable/disable navigation buttons
        toolPaginationFirst3.setEnabled(paginationBar3.pagination3.index > 1);
        toolPaginationNext3.setEnabled(paginationBar3.pagination3.index < maxIndex);
        toolPaginationPrev3.setEnabled(paginationBar3.pagination3.index > 1);
        toolPaginationLast3.setEnabled(paginationBar3.pagination3.index < maxIndex);

        // Clear old pagination buttons
        toolPaginationPages3.destroyItems();

        const maxItems = paginationBar3.configuration3.maxNumberOfButtons;
        const startItem = Math.max(1, paginationBar3.pagination3.index - Math.floor(maxItems / 2));
        const endItem = Math.min(maxIndex, startItem + maxItems - 1);



            
            for (let i = startItem; i <= endItem; i++) {
            toolPaginationPages3.addItem(new sap.m.SegmentedButtonItem({
                text: i.toString(),
                key: i,
                 press: function () {
                     paginationBar3.pagination3.index = i
                        paginationBar3.run3();
                }
            }));
        }

        toolPaginationPages3.setSelectedKey(paginationBar3.pagination3.index);
        toolPaginationTitle3.setNumber(`${paginationBar3.pagination3.index} / ${maxIndex}`);
    },
};

// Initialize and fetch data for the first time
// paginationBar3.run3(true);
// paginationBar2.searchCreateAirport(true)
