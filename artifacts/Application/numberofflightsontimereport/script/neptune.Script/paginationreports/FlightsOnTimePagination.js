var paginationBar1 = {
    configuration1: {
        maxNumberOfButtons: 6,
    },
    pagination1: {
        take: 10, // Number of records per page
        index: 1,  // Current page index (starts from 1)
        count: 1,  // Total count of records (to be updated dynamically)
    },

    totalCount1: 0,


 run1: function () {
    var index = parseInt(paginationBar1.pagination1.index, 10);
    var takePagination = parseInt(paginationBar1.pagination1.take, 10);
    var skipPagination = takePagination * (paginationBar1.pagination1.index - 1);
    const url = `/api/serverscript/cabserverside/OnTimeFlight`;

    // Get fromDate and toDate
    var fromDate = OnTimeArrival.getFrom();
    var toDate = OnTimeArrival.getTo();


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
    paginationBar1.isApiCalled = true;

    $.ajax({
        type: 'POST',
        url: url,
        data: { 
            from: formattedStartDate,
            to: formattedEndDate,
            take: takePagination,
            skip: skipPagination,
        },
        success: function (response) {
            console.log("API response:", response.data);

            if (response && Array.isArray(response.data)) {
                modelTable15.setData(response.data);
                console.log("Data appended to the table:", response.data);
            } else {
                console.log("No data returned.");
            }

            paginationBar1.totalCount1 = response.totalCount || 0; // Update global totalCount
            paginationBar1.handlePagination1(paginationBar1.totalCount1);
        },
        error: function (error) {
            console.error('Error during API call:', error);
        },
        complete: function () {
            // Reset the flag after the API call
            paginationBar1.isApiCalled = false;
        },
    });
},
    searchCreateAirport: function() 
    { 
        let search = SearchField1;
        let searchValue = search.getValue();

        // Calculate 'take' and 'skip' for pagination
        var index = parseInt(paginationBar1.pagination1.index, 10); // Current page index
        var take = parseInt(paginationBar1.pagination1.take, 10);  // Number of records per page
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
                    modelTable19.setData(response.data);
                    console.log("Data appended to the table:", response.data);
                } else {
                    console.log("No data returned.");
                }

                paginationBar1.totalCount1 = response.totalCount || 0; // Update global totalCount
                paginationBar1.handlePagination1(paginationBar1.totalCount1);
            },
            error: function (xhr, status, error) {
                console.error('Search failed:', error);
            }
        });
    },

    handlePagination1: function (totalCount1) {
        console.log('total',totalCount1)
        const take = paginationBar1.pagination1.take;
        console.log('take' ,take)
        const maxIndex = Math.ceil(totalCount1 / take);

      

        // Enable/disable navigation buttons
        toolPaginationFirst1.setEnabled(paginationBar1.pagination1.index > 1);
        toolPaginationPrev1.setEnabled(paginationBar1.pagination1.index > 1);
        toolPaginationNext1.setEnabled(paginationBar1.pagination1.index < maxIndex);
        toolPaginationLast1.setEnabled(paginationBar1.pagination1.index < maxIndex);

        // Clear old pagination buttons
        toolPaginationPages1.destroyItems();

        const maxItems = paginationBar1.configuration1.maxNumberOfButtons;
        const startItem = Math.max(1, paginationBar1.pagination1.index - Math.floor(maxItems / 2));
        const endItem = Math.min(maxIndex, startItem + maxItems - 1);



            
            for (let i = startItem; i <= endItem; i++) {
            toolPaginationPages1.addItem(new sap.m.SegmentedButtonItem({
                text: i.toString(),
                key: i,
                 press: function () {
                     paginationBar1.pagination1.index = i
                        paginationBar1.run1();
                }
            }));
        }

        toolPaginationPages1.setSelectedKey(paginationBar1.pagination1.index);
        toolPaginationTitle1.setNumber(`${paginationBar1.pagination1.index} / ${maxIndex}`);
    },
};

// Initialize and fetch data for the first time
// paginationBar1.run1(true);
// paginationBar2.searchCreateAirport(true)
