








var paginationBar9 = {
    configuration9: {
        maxNumberOfButtons: 6, // Max pagination buttons visible
    },
    pagination9: {
        take: 10, // Items per page
        index: 1, // Current page index
        count: 1, // Total number of pages (calculated)
    },
    totalCount9: 0, // Total number of items
    isSearchMode8: false, // Flag to track search mode

    // Run in default mode
    run9: function () {
        paginationBar9.isSearchMode8 = false; // Disable search mode
        paginationBar9.pagination9.index = 1; // Reset to the first page
        paginationBar9.executeFetch9();
    },

    // Search and create origin (reset the index when search is triggered)
    searchAirportArchive: function (keepIndex) {
        const searchValue = SearchField1.getValue().trim(); // Get search value

        if (!searchValue) {
            // If search field is empty, fallback to default mode
            paginationBar9.run9();
            return;
        }

        paginationBar9.isSearchMode8 = true; // Enable search mode

        // Reset to the first page when search is performed
        paginationBar9.pagination9.index = 1; // Reset to the first page

        if (!keepIndex) {
            paginationBar9.pagination9.index = 1; // Ensure the first page is shown when search is done
        }

        // Fetch data for the search and update the UI
        paginationBar9.executeFetch9();
    },

    // Update pagination UI after index reset or changes
    updatePaginationUI9: function () {
        const take = paginationBar9.pagination9.take;
        const maxIndex = Math.ceil(paginationBar9.totalCount9 / take); // Total pages

        // Ensure index is within bounds
        paginationBar9.pagination9.index = Math.min(paginationBar9.pagination9.index, maxIndex);
        if (paginationBar9.pagination9.index < 1) {
            paginationBar9.pagination9.index = 1;
        }

         // Enable/disable navigation buttons
        toolPaginationFirst8.setEnabled(paginationBar9.pagination9.index > 1);
        toolPaginationPrev8.setEnabled(paginationBar9.pagination9.index > 1);
        toolPaginationNext8.setEnabled(paginationBar9.pagination9.index < maxIndex);
        toolPaginationLast8.setEnabled(paginationBar9.pagination9.index < maxIndex);

        // Update page numbers
        toolPaginationPages8.destroyItems();

        const maxItems = paginationBar9.configuration9.maxNumberOfButtons;
        const startItem = Math.max(1, paginationBar9.pagination9.index - Math.floor(maxItems / 2));
        const endItem = Math.min(maxIndex, startItem + maxItems - 1);

        for (let i = startItem; i <= endItem; i++) {
            toolPaginationPages8.addItem(new sap.m.SegmentedButtonItem({
                text: i.toString(),
                key: i,
                press: function () {
                    if (paginationBar9.pagination9.index !== i) {
                        paginationBar9.pagination9.index = i; // Update the index
                        paginationBar9.handleModePagination9(); // Fetch data for current mode
                        paginationBar9.updatePaginationUI9(); // Reflect UI changes
                    }
                }
            }));
        }

        // Ensure the correct page is selected in the UI
        toolPaginationPages9.setSelectedKey(paginationBar9.pagination9.index);
        toolPaginationTitle9.setNumber(`${paginationBar9.pagination9.index} / ${maxIndex}`); // Update pagination title
    },

    // Fetch data (shared logic for both modes)
    executeFetch9: function () {
        const index = parseInt(paginationBar9.pagination9.index, 10);
        const take = parseInt(paginationBar9.pagination9.take, 10);
        const skip = take * (index - 1);

        const url = paginationBar9.isSearchMode8
            ? `http://localhost:8080/api/serverscript/cabserverside/AirportSearch`
            : `http://localhost:8080/api/serverscript/cabserverside/AirportArchive`;

        const data = paginationBar9.isSearchMode8
            ? { countryname: SearchField1.getValue(), take, skip }
            : { take, skip };

        // AJAX call
        $.ajax({
            url: url,
            method: 'POST',
            data: data,
            success: function (response) {
                console.log('API response:', response);

                if (response && Array.isArray(response.data)) {
                    modelTable8.setData(response.data); // Update table
                    paginationBar9.totalCount9 = response.totalCount || 0; // Update total count
                    // Update pagination UI to reflect the new search results
                    paginationBar9.updatePaginationUI9();
                } else {
                    console.error('Invalid response:', response);
                }
            },
            error: function (xhr, status, error) {
                console.error('API call failed:', error);
            }
        });
    },


    handleModePagination9: function () {
        paginationBar9.executeFetch9();
        paginationBar9.updatePaginationUI9();
    },
};

// Initial call
paginationBar9.run9(true);


