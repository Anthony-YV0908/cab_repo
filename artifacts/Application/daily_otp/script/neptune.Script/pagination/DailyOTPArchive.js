// var paginationBar = {
//     configuration: {
//         maxNumberOfButtons: 6,
//     },
//     pagination: {
//         take: 10,
//         index: 0,
//         count: 1,
//     },
//     totalCount:0, // Define totalCount as a property

//     run: function () {
//         console.log("Current index:", paginationBar.pagination.index);

//         var index = parseInt(paginationBar.pagination.index, 10);
//         var takePagination = parseInt(paginationBar.pagination.take, 10);
//         var skipPagination = takePagination * (paginationBar.pagination.index - 1);

//         console.log("Skip:", skipPagination, "Take:", takePagination);

//         paginationBar.isApiCalled = true;

//   const url = `http://localhost:8080/api/serverscript/cabserverside/Airport`;

//         $.ajax({
//             url: url,
//             type: 'POST',
//             data: { take: takePagination, skip: skipPagination },
//             beforeSend: function () {
//                 console.log("Sending API request...");
//             },
//             success: function (response) {
//                 console.log("API response:", response.data);

//                 if (response && Array.isArray(response.data)) {
//                     modelTable20.setData(response.data);
//                     console.log("Data appended to the table:", response.data);
//                 } else {
//                     console.log("No data returned.");
//                 }

//                 paginationBar.totalCount = response.totalCount || 0; // Update global totalCount
//                 paginationBar.handlePagination(paginationBar.totalCount);
//             },
//             error: function (xhr, status, error) {
//                 console.error("Error during API call:", error);
//             },
//             complete: function () {
//                 paginationBar.isApiCalled = false;
//             }
//         });
//     },

//     searchCreateOrigin: function () {
//         let search = SearchField2;
//         let searchValue = search.getValue();

//         var index = parseInt(paginationBar.pagination.index, 10);
//         var take = parseInt(paginationBar.pagination.take, 10);
//         var skip = take * index;

//         const url = `http://localhost:8080/api/serverscript/cabserverside/AirportSearch`;

//         $.ajax({
//             url: url,
//             method: 'POST',
//             data: {
//                 countryname: searchValue,
//                 take: take,
//                 skip: skip
//             },
//             success: function (response) {
//                 console.log('This is the search response', response);

//                 if (response && Array.isArray(response.data)) {
//                     modelTable20.setData(response.data);
//                     console.log("Data appended to the table:", response.data);
//                 } else {
//                     console.log("No data returned.");
//                 }

//                 paginationBar.totalCount = response.totalCount || 0; // Update global totalCount
//                 paginationBar.handlePagination(paginationBar.totalCount);
//             },
//             error: function (xhr, status, error) {
//                 console.error('Search failed:', error);
//             }
//         });
//     },

//     handlePagination: function (totalcount) {
//         console.log('handle pagination', totalcount);
//         console.log('handle pagination count', paginationBar.pagination.count);

//         var take = parseInt(paginationBar.pagination.take);
//         var maxIndex = Math.ceil(totalcount / take);

//         console.log('this is handle pagination', maxIndex);

//         toolPaginationFirst1.setEnabled(paginationBar.pagination.index > 0);
//         toolPaginationPrev1.setEnabled(paginationBar.pagination.index > 0);
//         toolPaginationNext1.setEnabled(paginationBar.pagination.index + 1 < maxIndex);
//         toolPaginationLast1.setEnabled(paginationBar.pagination.index + 1 < maxIndex);

//         toolPaginationPages1.destroyItems();


//         var maxItems = paginationBar.configuration.maxNumberOfButtons - 1;
//         var startItem = Math.max(0, paginationBar.pagination.index - Math.floor(maxItems / 2));
//         const endItem = Math.min(maxIndex, startItem + maxItems - 1);

//              for (let i = startItem; i <= endItem; i++) {
//             toolPaginationPages1.addItem(new sap.m.SegmentedButtonItem({
//                 text: i.toString(),
//                 key: i,
//                  press: function () {
//                      paginationBar.pagination.index = i
//                         paginationBar.run();
//                 }
//             }));
//         }


//         toolPaginationPages1.setSelectedKey(paginationBar.pagination.index);
//         toolPaginationTitle1.setNumber(`${paginationBar.pagination.index} / ${maxIndex}`);
//     },
// };

// // Run the methods
// paginationBar.run(true);
// // paginationBar.searchCreateOrigin(true);
