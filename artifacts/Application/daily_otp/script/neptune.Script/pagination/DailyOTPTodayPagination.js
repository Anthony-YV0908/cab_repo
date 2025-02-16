var paginationBar8 = {
    configuration8: {
        maxNumberOfButtons: 6,
    },
    pagination8: {
        take: 10,
        index: 0,
        count: 1,
    },
    totalCount8:0, // Define totalCount as a property

    run8: function () {
        

        var index = parseInt(paginationBar8.pagination8.index, 10);
        var takePagination = parseInt(paginationBar8.pagination8.take, 10);
        var skipPagination = takePagination * (paginationBar8.pagination8.index);
        //  var index = parseInt(paginationBar8.pagination8.index, 10);
        // var take = parseInt(paginationBar8.pagination8.take, 10);
        // var skip = take * index;

      

        paginationBar8.isApiCalled = true;

  const url = `http://localhost:8080/api/serverscript/cabserverside/DailyToday`;

        $.ajax({
            url: url,
            type: 'POST',
            data: { take: takePagination, skip: skipPagination },
            beforeSend: function () {
                console.log("Sending API request...");
            },
            success: function (response) {
                console.log("API response:", response.data);

                if (response && Array.isArray(response.data)) {
                    modelTable.setData(response.data);
                    console.log("Data appended to the table:", response.data);
                } else {
                    console.log("No data returned.");
                }

                paginationBar8.totalCount8 = response.totalCount || 0; // Update global totalCount
                paginationBar8.handlePagination8(paginationBar8.totalCount8);
            },
            error: function (xhr, status, error) {
                console.error("Error during API call:", error);
            },
            complete: function () {
                paginationBar8.isApiCalled = false;
            }
        });
    },

    // searchCountry: function () {
    //     let search = SearchField2;
    //     let searchValue = search.getValue();

    //     var index = parseInt(paginationBar8.pagination8.index, 10);
    //     var take = parseInt(paginationBar8.pagination8.take, 10);
    //     var skip = take * index;

    //     const url = `http://localhost:8080/api/serverscript/cabserverside/AirportSearch`;

    //     $.ajax({
    //         url: url,
    //         method: 'POST',
    //         data: {
    //             countryname: searchValue,
    //             take: take,
    //             skip: skip
    //         },
    //         success: function (response) {
    //             console.log('This is the search response', response);

    //             if (response && Array.isArray(response.data)) {
    //                 modelTable.setData(response.data);
    //                 console.log("Data appended to the table:", response.data);
    //             } else {
    //                 console.log("No data returned.");
    //             }

    //             paginationBar8.totalCount8 = response.totalCount || 0; // Update global totalCount
    //             paginationBar8.handlePagination8(paginationBar8.totalCount8);
    //         },
    //         error: function (xhr, status, error) {
    //             console.error('Search failed:', error);
    //         }
    //     });
    // },




    dailyDate: function() 
    { 
        const selectedDate = DatePicker.getValue();


        const dateObj = new Date(selectedDate);

        var index = parseInt(paginationBar8.pagination8.index, 10);
        var take = parseInt(paginationBar8.pagination8.take, 10);
        var skip = take * index;
        const formattedDate = dateObj.toLocaleDateString("en-US", {
            month: "numeric",
            day: "numeric",
            year: "2-digit"
        }).split('/').map(part => part.padStart(2, '0')).join('/');


            const url = `http://localhost:8080/api/serverscript/cabserverside/DateDaily`;

            $.ajax({ 
                type:'POST', 
                url:url,
                data: {
                date: formattedDate,
                take: take,
                skip: skip
            },
             success: function (response) {
                console.log('This is the search response', response);

                if (response && Array.isArray(response.data)) {
                    modelTable.setData(response.data);
                    console.log("Data appended to the table:", response.data);
                } else {
                    console.log("No data returned.");
                }

                paginationBar8.totalCount8 = response.totalCount || 0; // Update global totalCount
                paginationBar8.handlePagination8(paginationBar8.totalCount8);
            },
                error: function(xhr, status, error) {
                    console.error('Error during API call:', status, error, xhr.responseText);
                }
            })
    },




handlePagination8: function (totalcount8) {
    var take = parseInt(paginationBar8.pagination8.take);
    var maxIndex = Math.ceil(totalcount8 / take);

    // Log maxIndex for debugging
    console.log('Handle Pagination:', maxIndex);

    // Disable buttons based on index
    toolPaginationFirst.setEnabled(paginationBar8.pagination8.index > 0);
    toolPaginationPrev.setEnabled(paginationBar8.pagination8.index > 0);
    toolPaginationNext.setEnabled(paginationBar8.pagination8.index + 1 < maxIndex);
    toolPaginationLast.setEnabled(paginationBar8.pagination8.index + 1 < maxIndex);

    // Clear pagination items
    toolPaginationPages.destroyItems();

    var maxItems = paginationBar8.configuration8.maxNumberOfButtons;
    var startItem = Math.max(1, paginationBar8.pagination8.index - Math.floor(maxItems / 2));
    var endItem = Math.min(maxIndex, startItem + maxItems - 1);

    for (let i = startItem; i <= endItem; i++) {
        toolPaginationPages.addItem(new sap.m.SegmentedButtonItem({
            text: i.toString(),
            key: i,
            press: function () {
                paginationBar8.pagination8.index = i - 1; // Update index for 0-based logic
                paginationBar8.run8();
            }
        }));
    }

    // Set current page
    toolPaginationPages.setSelectedKey(paginationBar8.pagination8.index + 1); // Adjust for display
    toolPaginationTitle.setNumber(`${paginationBar8.pagination8.index + 1} / ${maxIndex}`);
}
}


setTimeout(() => {
    paginationBar8.run8(true);
}, 1000);
 paginationBar8.run8(true);

// paginationBar8.dailyDate()