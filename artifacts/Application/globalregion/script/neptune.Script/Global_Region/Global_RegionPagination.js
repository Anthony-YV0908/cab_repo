
var paginationBar7 = {
    configuration7: {
        maxNumberOfButtons: 6, // Max pagination buttons visible
    },
    pagination7: {
        take: 10, // Items per page
        index: 1, // Current page index
        count: 1, // Total number of pages (calculated)
    },
    totalCount7: 0, // Total number of items
    isSearchMode7: false, // Flag to track search mode

    // Run in default mode
    run7: function () {
        paginationBar7.isSearchMode7 = false; // Disable search mode
        paginationBar7.pagination7.index = 1; // Reset to the first page
        paginationBar7.executeFetch7();
    },

    // Search and create origin (reset the index when search is triggered)
    searchGlobalRegion: function (keepIndex) {
        const searchValue = SearchField12.getValue().trim(); // Get search value

        if (!searchValue) {
            // If search field is empty, fallback to default mode
            paginationBar7.run7();
            return;
        }

        paginationBar7.isSearchMode7 = true; // Enable search mode

        // Reset to the first page when search is performed
        paginationBar7.pagination7.index = 1; // Reset to the first page

        if (!keepIndex) {
            paginationBar7.pagination7.index = 1; // Ensure the first page is shown when search is done
        }

        // Fetch data for the search and update the UI
        paginationBar7.executeFetch7();
    },

    // Update pagination UI after index reset or changes
    updatePaginationUI7: function () {
        const take = paginationBar7.pagination7.take;
        const maxIndex = Math.max(1, Math.ceil(paginationBar7.totalCount7 / take));


        // Ensure index is within bounds
        paginationBar7.pagination7.index = Math.min(paginationBar7.pagination7.index, maxIndex);
        if (paginationBar7.pagination7.index < 1) {
            paginationBar7.pagination7.index = 1;
        }

        // Update button states
        toolPaginationFirst6.setEnabled(paginationBar7.pagination7.index > 1);
        toolPaginationPrev6.setEnabled(paginationBar7.pagination7.index > 1);
        toolPaginationNext6.setEnabled(paginationBar7.pagination7.index < maxIndex);
        toolPaginationLast6.setEnabled(paginationBar7.pagination7.index < maxIndex);

        // Update page numbers
        toolPaginationPages6.destroyItems();

        const maxItems = paginationBar7.configuration7.maxNumberOfButtons;
        const startItem = Math.max(1, paginationBar7.pagination7.index - Math.floor(maxItems / 2));
        const endItem = Math.min(maxIndex, startItem + maxItems - 1);

        for (let i = startItem; i <= endItem; i++) {
            toolPaginationPages6.addItem(new sap.m.SegmentedButtonItem({
                text: i.toString(),
                key: i,
                press: function () {
                    if (paginationBar7.pagination7.index !== i) {
                        paginationBar7.pagination7.index = i; // Update the index
                        paginationBar7.handleModePagination7(); // Fetch data for current mode
                        paginationBar7.updatePaginationUI7(); // Reflect UI changes
                    }
                }
            }));
        }

        // Ensure the correct page is selected in the UI
        toolPaginationPages6.setSelectedKey(paginationBar7.pagination7.index);
        toolPaginationTitle6.setNumber(`${paginationBar7.pagination7.index} / ${maxIndex}`); // Update pagination title
    },

    // Fetch data (shared logic for both modes)
    executeFetch7: function () {
        const index = parseInt(paginationBar7.pagination7.index, 10);
        const take = parseInt(paginationBar7.pagination7.take, 10);
        const skip = take * (index - 1);

        const url = paginationBar7.isSearchMode7
            ? `http://localhost:8080/api/serverscript/cabserverside/GlobalRegionSearch`
            : `http://localhost:8080/api/serverscript/cabserverside/GlobalRegion`;

        const data = paginationBar7.isSearchMode7
            ? { globalregionname: SearchField12.getValue(), take, skip }
            : { take, skip };

        // AJAX call
        $.ajax({
            url: url,
            method: 'POST',
            data: data,
            success: function (response) {
                console.log('API response:', response);

                if (response && Array.isArray(response.data)) {
                     modelTable6.setData(response.data); // Update table
                    paginationBar7.totalCount7 = response.totalCount || 0; // Update total count
                    // Update pagination UI to reflect the new search results
                    paginationBar7.updatePaginationUI7();
                } else {
                    console.error('Invalid response:', response);
                }
            },
            error: function (xhr, status, error) {
                console.error('API call failed:', error);
            }
        });
    },


    handleModePagination7: function () {
        paginationBar7.executeFetch7();
        paginationBar7.updatePaginationUI7();
    },
};

// Initial call
paginationBar7.run7(true);









 







