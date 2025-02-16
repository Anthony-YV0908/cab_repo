// var paginationBar1 = {
//     configuration1: {
//         maxNumberOfButtons: 6,
//     },
//     pagination1: {
//         take: 10, // Number of records per page
//         index: 1,  // Current page index (starts from 1)
//         count: 1,  // Total count of records (to be updated dynamically)
//     },

//     totalCount2: 0,


//     run1: function () {


//         var index = parseInt(paginationBar1.pagination1.index, 10);
//         var takePagination = parseInt(paginationBar1.pagination1.take, 10);
//         var skipPagination = takePagination * (paginationBar1.pagination1.index - 1);
//       const url = `http://localhost:8080/api/serverscript/cabserverside/MonthlyOTPAirline`;


//          var month = PerMonthly1.getValue(); 
//          var year = YearAirline.getValue()
//          var airline = AirlineInput.getValue() 

//         // Set the flag to indicate API call in progress
//         paginationBar1.isApiCalled = true;

     

//         $.ajax({
//             type: 'POST',
//             url: url,
//             data: {Month:month,Year:year, Airline:airline, take:takePagination, skip:skipPagination }, // Send `take` and `skip` as query parameters
//             success: function (response) {
//                console.log("API response:", response.data);

//                 if (response && Array.isArray(response.data)) {
//                     modelTable1.setData(response.data);
//                     console.log("Data appended to the table:", response.data);
//                 } else {
//                     console.log("No data returned.");
//                 }

//                 paginationBar1.totalCount2 = response.totalCount || 0; // Update global totalCount
//                 paginationBar1.handlePagination1(paginationBar1.totalCount2);
//             },

            
//             error: function (error) {
//                 console.error('Error during API call:', error);
//             },
//             complete: function () {
//                 // Reset the flag after the API call
//                 paginationBar1.isApiCalled = false;
//             },
//         });
//     },

//     searchAirport: function() 
//     { 
//         let search = SearchField;
//         let searchValue = search.getValue();

//         // Calculate 'take' and 'skip' for pagination1
//         var index = parseInt(paginationBar1.pagination1.index, 10); // Current page index
//         var take = parseInt(paginationBar1.pagination1.take, 10);  // Number of records per page
//         var skip = take * index; // Calculate skip based on current page

//       const url = `http://localhost:8080/api/serverscript/cabserverside/MonthlyOTPAirline`;

//         $.ajax({
//             url: url,
//             method: 'POST',
//               data: {
//                 countryname: searchValue,
//                 take: take,
//                 skip: skip
//             },
//             success: function (response) {
//                 console.log('This is the search response', response);

//                 console.log('this is total count',response.totalCount)

//                 if (response && Array.isArray(response.data)) {
//                     modelTable1.setData(response.data);
//                     console.log("Data appended to the table:", response.data);
//                 } else {
//                     console.log("No data returned.");
//                 }

//                 paginationBar1.totalCount2 = response.totalCount || 0; // Update global totalCount
//                 paginationBar1.handlePagination1(paginationBar1.totalCount2);
//             },
//             error: function (xhr, status, error) {
//                 console.error('Search failed:', error);
//             }
//         });
//     },

//     handlePagination1: function (totalCount2) {
//         const take = paginationBar1.pagination1.take;
//         console.log('take' ,take)
//         const maxIndex = Math.ceil(totalCount2 / take);

      

//         // Enable/disable navigation buttons
//         toolPaginationFirst1.setEnabled(paginationBar1.pagination1.index > 1);
//         toolPaginationPrev1.setEnabled(paginationBar1.pagination1.index > 1);
//         toolPaginationNext1.setEnabled(paginationBar1.pagination1.index < maxIndex);
//         toolPaginationLast1.setEnabled(paginationBar1.pagination1.index < maxIndex);

//         // Clear old pagination1 buttons
//         toolPaginationPages1.destroyItems();

//         const maxItems = paginationBar1.configuration1.maxNumberOfButtons;
//         const startItem = Math.max(1, paginationBar1.pagination1.index - Math.floor(maxItems / 2));
//         const endItem = Math.min(maxIndex, startItem + maxItems - 1);

//         for (let i = startItem; i <= endItem; i++) {
//             toolPaginationPages1.addItem(new sap.m.SegmentedButtonItem({
//                 text: i.toString(),
//                 key: i,
//                  press: function () {
//                      paginationBar1.pagination1.index = i;
//                     paginationBar1.run1();
                  
                   
//                 }
//             }));
//         }

//         toolPaginationPages1.setSelectedKey(paginationBar1.pagination1.index);
//         toolPaginationTitle1.setNumber(`${paginationBar1.pagination1.index} / ${maxIndex}`);
//     },
// };

// // Initialize and fetch data for the first time
// // paginationBar1.run1(true);























var paginationBar2 = {
    configuration2: {
        maxNumberOfButtons: 6, // Max pagination buttons visible
    },
    pagination2: {
        take: 10, // Items per page
        index: 1, // Current page index
        count: 1, // Total number of pages (calculated)
    },
    totalCount2: 0, // Total number of items
    isSearchMode2: false, // Flag to track search mode

    // Run in default mode
    run2: function () {
        paginationBar2.isSearchMode2 = false; // Disable search mode
        paginationBar2.pagination2.index = 1; // Reset to the first page
        paginationBar2.executeFetch2();
    },

    // Search and create origin (reset the index when search is triggered)
    searchState: function (keepIndex) {
        const searchValue = SearchField2.getValue().trim(); // Get search value

        if (!searchValue) {
            // If search field is empty, fallback to default mode
            paginationBar2.run2();
            return;
        }

        paginationBar2.isSearchMode2 = true; // Enable search mode

        // Reset to the first page when search is performed
        paginationBar2.pagination2.index = 1; // Reset to the first page

        if (!keepIndex) {
            paginationBar2.pagination2.index = 1; // Ensure the first page is shown when search is done
        }

        // Fetch data for the search and update the UI
        paginationBar2.executeFetch2();
    },

    // Update pagination UI after index reset or changes
    updatePaginationUI2: function () {
        const take = paginationBar2.pagination2.take;
        const maxIndex = Math.ceil(paginationBar2.totalCount2 / take); // Total pages

        // Ensure index is within bounds
        paginationBar2.pagination2.index = Math.min(paginationBar2.pagination2.index, maxIndex);
        if (paginationBar2.pagination2.index < 1) {
            paginationBar2.pagination2.index = 1;
        }

        // Update button states
        toolPaginationFirst1.setEnabled(paginationBar2.pagination2.index > 1);
        toolPaginationPrev1.setEnabled(paginationBar2.pagination2.index > 1);
        toolPaginationNext1.setEnabled(paginationBar2.pagination2.index < maxIndex);
        toolPaginationLast1.setEnabled(paginationBar2.pagination2.index < maxIndex);

        // Update page numbers
        toolPaginationPages1.destroyItems();

        const maxItems = paginationBar2.configuration2.maxNumberOfButtons;
        const startItem = Math.max(1, paginationBar2.pagination2.index - Math.floor(maxItems / 2));
        const endItem = Math.min(maxIndex, startItem + maxItems - 1);

        for (let i = startItem; i <= endItem; i++) {
            toolPaginationPages1.addItem(new sap.m.SegmentedButtonItem({
                text: i.toString(),
                key: i,
                press: function () {
                    if (paginationBar2.pagination2.index !== i) {
                        paginationBar2.pagination2.index = i; // Update the index
                        paginationBar2.handleModePagination2(); // Fetch data for current mode
                        paginationBar2.updatePaginationUI2(); // Reflect UI changes
                    }
                }
            }));
        }

        // Ensure the correct page is selected in the UI
        toolPaginationPages1.setSelectedKey(paginationBar2.pagination2.index);
        toolPaginationTitle1.setNumber(`${paginationBar2.pagination2.index} / ${maxIndex}`); // Update pagination title
    },

    // Fetch data (shared logic for both modes)
    executeFetch2: function () {
        const index = parseInt(paginationBar2.pagination2.index, 10);
        const take = parseInt(paginationBar2.pagination2.take, 10);
        const skip = take * (index - 1);



         var month = PerMonthly1.getValue(); 
         var year = YearAirline.getValue()
         var airline = AirlineInput.getValue()

        const url = paginationBar2.isSearchMode2
            ? `http://localhost:8080/api/serverscript/cabserverside/MonthlyOTPSearch `
            : `http://localhost:8080/api/serverscript/cabserverside/MonthlyOTPAirline`;

        const data = paginationBar2.isSearchMode2
            ? { take, skip }
            : { Month:month, Year:year, Airline:airline, take, skip };


        console.log('flightsummary payload' , data) 

        // AJAX call
        $.ajax({
            url: url,
            method: 'POST',
            data: data,
            success: function (response) {
                console.log('API response:', response);

                if (response && Array.isArray(response.data)) {
                    modelTable1.setData(response.data); // Update table
                    paginationBar2.totalCount2 = response.totalCount || 0; // Update total count
                    // Update pagination UI to reflect the new search results
                    paginationBar2.updatePaginationUI2();
                } else {
                    console.error('Invalid response:', response);
                }
            },
            error: function (xhr, status, error) {
                console.error('API call failed:', error);
            }
        });
    },


    handleModePagination2: function () {
        paginationBar2.executeFetch2();
        paginationBar2.updatePaginationUI2();
    },
};

// Initial call
paginationBar2.run2(true);









 


