








var paginationBar15 = {
    configuration15: {
        maxNumberOfButtons: 6, // Max pagination buttons visible
    },
    pagination15: {
        take: 10, // Items per page
        index: 1, // Current page index
        count: 1, // Total number of pages (calculated)
    },
    totalCount15: 0, // Total number of items
    isSearchMode15: false, // Flag to track search mode

    // Run in default mode
    run15: function () {
        paginationBar15.isSearchMode15 = false; // Disable search mode
        paginationBar15.pagination15.index = 1; // Reset to the first page
        paginationBar15.executeFetch15();
    },

    // Search and create origin (reset the index when search is triggered)
    searchCountry: function (keepIndex) {
        const searchValue = SearchField13.getValue().trim(); // Get search value

        if (!searchValue) {
            // If search field is empty, fallback to default mode
            paginationBar15.run15();
            return;
        }

        paginationBar15.isSearchMode15 = true; // Enable search mode

        // Reset to the first page when search is performed
        paginationBar15.pagination15.index = 1; // Reset to the first page

        if (!keepIndex) {
            paginationBar15.pagination15.index = 1; // Ensure the first page is shown when search is done
        }

        // Fetch data for the search and update the UI
        paginationBar15.executeFetch15();
    },

    // Update pagination UI after index reset or changes
    updatePaginationUI15: function () {
        const take = paginationBar15.pagination15.take;
        const maxIndex = Math.ceil(paginationBar15.totalCount15 / take); // Total pages

        // Ensure index is within bounds
        paginationBar15.pagination15.index = Math.min(paginationBar15.pagination15.index, maxIndex);
        if (paginationBar15.pagination15.index < 1) {
            paginationBar15.pagination15.index = 1;
        }

        // Update button states
        toolPaginationFirst14.setEnabled(paginationBar15.pagination15.index > 1);
        toolPaginationPrev14.setEnabled(paginationBar15.pagination15.index > 1);
        toolPaginationNext14.setEnabled(paginationBar15.pagination15.index < maxIndex);
        toolPaginationLast14.setEnabled(paginationBar15.pagination15.index < maxIndex);

        // Update page numbers
        toolPaginationPages14.destroyItems();

        const maxItems = paginationBar15.configuration15.maxNumberOfButtons;
        const startItem = Math.max(1, paginationBar15.pagination15.index - Math.floor(maxItems / 2));
        const endItem = Math.min(maxIndex, startItem + maxItems - 1);

        for (let i = startItem; i <= endItem; i++) {
            toolPaginationPages14.addItem(new sap.m.SegmentedButtonItem({
                text: i.toString(),
                key: i,
                press: function () {
                    if (paginationBar15.pagination15.index !== i) {
                        paginationBar15.pagination15.index = i; // Update the index
                        paginationBar15.handleModePagination15(); // Fetch data for current mode
                        paginationBar15.updatePaginationUI15(); // Reflect UI changes
                    }
                }
            }));
        }

        // Ensure the correct page is selected in the UI
        toolPaginationPages14.setSelectedKey(paginationBar15.pagination15.index);
        toolPaginationTitle14.setNumber(`${paginationBar15.pagination15.index} / ${maxIndex}`); // Update pagination title
    },

    // Fetch data (shared logic for both modes)
    executeFetch15: function () {
        const index = parseInt(paginationBar15.pagination15.index, 10);
        const take = parseInt(paginationBar15.pagination15.take, 10);
        const skip = take * (index - 1);

        const url = paginationBar15.isSearchMode15
             ? `http://localhost:8080/api/serverscript/cabserverside/GlobalRegionSearchArchive`
            : `http://localhost:8080/api/serverscript/cabserverside/GlobalRegionArchive`;

        const data = paginationBar15.isSearchMode15
            ? { countryname: SearchField13.getValue(), take, skip }
            : { take, skip };

        // AJAX call
        $.ajax({
            url: url,
            method: 'POST',
            data: data,
            success: function (response) {
                console.log('API response:', response);

                if (response && Array.isArray(response.data)) {
                    modelTable14.setData(response.data); // Update table
                    paginationBar15.totalCount15 = response.totalCount || 0; // Update total count
                    // Update pagination UI to reflect the new search results
                    paginationBar15.updatePaginationUI15();
                } else {
                    console.error('Invalid response:', response);
                }
            },
            error: function (xhr, status, error) {
                console.error('API call failed:', error);
            }
        });
    },


    handleModePagination15: function () {
        paginationBar15.executeFetch15();
        paginationBar15.updatePaginationUI15();
    },
};

// Initial call
paginationBar15.run15(true);









 








 

