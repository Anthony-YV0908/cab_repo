// var paginationBar9 = {
//     configuration9: {
//         maxNumberOfButtons: 6,
//     },
//     pagination9: {
//         take: 10,
//         index: 0,
//         count: 1,
//     },
//     totalCount9:0, // Define totalCount as a property

//     run9: function () {
   

//         var index = parseInt(paginationBar9.pagination9.index, 10);
//         var takePagination = parseInt(paginationBar9.pagination9.take, 10);
//         var skipPagination = takePagination * (paginationBar9.pagination9.index - 1);

      

//         paginationBar9.isApiCalled = true;

//   const url = `http://localhost:8080/api/serverscript/cabserverside/DailyToday`;

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
//                     modelTable.setData(response.data);
//                     console.log("Data appended to the table:", response.data);
//                 } else {
//                     console.log("No data returned.");
//                 }

//                 paginationBar9.totalCount9 = response.totalCount || 0; // Update global totalCount
//                 paginationBar9.handlePagination9(paginationBar9.totalCount9);
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

//         var index = parseInt(paginationBar9.pagination9.index, 10);
//         var take = parseInt(paginationBar9.pagination9.take, 10);
//         var skip = take * index;

//         const url = `http://localhost:8080/api/serverscript/cabserverside/DailyToday`;

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

//                 paginationBar9.totalCount9 = response.totalCount || 0; // Update global totalCount
//                 paginationBar9.handlePagination9(paginationBar9.totalCount9);
//             },
//             error: function (xhr, status, error) {
//                 console.error('Search failed:', error);
//             }
//         });
//     },



//     dailyDate: function() 
//     { 
//         const selectedDate = DatePicker.getValue();


//         const dateObj = new Date(selectedDate);

        
//         const formattedDate = dateObj.toLocaleDateString("en-US", {
//             month: "numeric",
//             day: "numeric",
//             year: "2-digit"
//         }).split('/').map(part => part.padStart(2, '0')).join('/');


//             const url = `http://localhost:8080/api/serverscript/cabserverside/DateDaily`;

//             $.ajax({ 
//                 type:'POST', 
//                 url:url,
//                 data:{date:formattedDate},
//                 success:function(response) 
//                 { 
//                     console.log('This is the search response', response);

//                 if (response && Array.isArray(response.data)) {
//                     modelTable.setData(response.data);
//                     console.log("Data appended to the table:", response.data);
//                 } else {
//                     console.log("No data returned.");
//                 }
//                 },
//                 error: function(xhr, status, error) {
//                     console.error('Error during API call:', status, error, xhr.responseText);
//                 }
//             })
//     },



//     handlePagination9: function (totalcount9) {
      

//         var take = parseInt(paginationBar9.pagination9.take);
//         var maxIndex = Math.ceil(totalcount9 / take);

//         console.log('this is handle pagination', maxIndex);

//         toolPaginationFirst.setEnabled(paginationBar9.pagination9.index > 0);
//         toolPaginationPrev.setEnabled(paginationBar9.pagination9.index > 0);
//         toolPaginationNext.setEnabled(paginationBar9.pagination9.index + 1 < maxIndex);
//         toolPaginationLast.setEnabled(paginationBar9.pagination9.index + 1 < maxIndex);

//         toolPaginationPages.destroyItems();


//         var maxItems = paginationBar9.configuration9.maxNumberOfButtons - 1;
//         var startItem = Math.max(1, paginationBar9.pagination9.index - Math.floor(maxItems / 2));
//         const endItem = Math.min(maxIndex, startItem + maxItems - 1);

//              for (let i = startItem; i <= endItem; i++) {
//             toolPaginationPages.addItem(new sap.m.SegmentedButtonItem({
//                 text: i.toString(),
//                 key: i,
//                  press: function () {
//                      paginationBar9.pagination9.index = i
//                         paginationBar9.run9();
//                 }
//             }));
//         }


//         toolPaginationPages.setSelectedKey(paginationBar9.pagination9.index);
//         toolPaginationTitle.setNumber(`${paginationBar9.pagination9.index} / ${maxIndex}`);
//     },
// };


// paginationBar9.run9(true);
