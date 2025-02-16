
var paginationBar10 = {
    configuration10: {
        maxNumberOfButtons: 6, // Max pagination buttons visible
    },
    pagination10: {
        take: 10, // Items per page
        index: 1, // Current page index
        count: 1, // Total number of pages (calculated)
    },
    totalCount10: 0, // Total number of items
    isSearchMode10: false, // Flag to track search mode

    // Run in default mode
    run10: function () {
        paginationBar10.isSearchMode10 = false; // Disable search mode
        paginationBar10.pagination10.index = 1; // Reset to the first page
        paginationBar10.executeFetch10();
    },

    // Search and create origin (reset the index when search is triggered)
    searchStateArchive: function (keepIndex) {
        const searchValue = SearchField3.getValue().trim(); // Get search value

        if (!searchValue) {
            // If search field is empty, fallback to default mode
            paginationBar10.run10();
            return;
        }

        paginationBar10.isSearchMode10 = true; // Enable search mode

        // Reset to the first page when search is performed
        paginationBar10.pagination10.index = 1; // Reset to the first page

        if (!keepIndex) {
            paginationBar10.pagination10.index = 1; // Ensure the first page is shown when search is done
        }

        // Fetch data for the search and update the UI
        paginationBar10.executeFetch10();
    },

    // Update pagination UI after index reset or changes
    updatePaginationUI10: function () {
        const take = paginationBar10.pagination10.take;
        const maxIndex = Math.ceil(paginationBar10.totalCount10 / take); // Total pages

        // Ensure index is within bounds
        paginationBar10.pagination10.index = Math.min(paginationBar10.pagination10.index, maxIndex);
        if (paginationBar10.pagination10.index < 1) {
            paginationBar10.pagination10.index = 1;
        }

        // Update button states
        toolPaginationFirst9.setEnabled(paginationBar10.pagination10.index > 1);
        toolPaginationPrev9.setEnabled(paginationBar10.pagination10.index > 1);
        toolPaginationNext9.setEnabled(paginationBar10.pagination10.index < maxIndex);
        toolPaginationLast9.setEnabled(paginationBar10.pagination10.index < maxIndex);

        // Update page numbers
        toolPaginationPages9.destroyItems();

        const maxItems = paginationBar10.configuration10.maxNumberOfButtons;
        const startItem = Math.max(1, paginationBar10.pagination10.index - Math.floor(maxItems / 2));
        const endItem = Math.min(maxIndex, startItem + maxItems - 1);

        for (let i = startItem; i <= endItem; i++) {
            toolPaginationPages9.addItem(new sap.m.SegmentedButtonItem({
                text: i.toString(),
                key: i,
                press: function () {
                    if (paginationBar10.pagination10.index !== i) {
                        paginationBar10.pagination10.index = i; // Update the index
                        paginationBar10.handleModePagination10(); // Fetch data for current mode
                        paginationBar10.updatePaginationUI10(); // Reflect UI changes
                    }
                }
            }));
        }

        // Ensure the correct page is selected in the UI
        toolPaginationPages9.setSelectedKey(paginationBar10.pagination10.index);
        toolPaginationTitle9.setNumber(`${paginationBar10.pagination10.index} / ${maxIndex}`); // Update pagination title
    },

    // Fetch data (shared logic for both modes)
    executeFetch10: function () {
        const index = parseInt(paginationBar10.pagination10.index, 10);
        const take = parseInt(paginationBar10.pagination10.take, 10);
        const skip = take * (index - 1);

        const url = paginationBar10.isSearchMode10
            ? `http://localhost:8080/api/serverscript/cabserverside/StateSearchArchive`
            : `http://localhost:8080/api/serverscript/cabserverside/StateArchive`;

        const data = paginationBar10.isSearchMode10
            ? { statename: SearchField3.getValue(), take, skip }
            : { take, skip };

        // AJAX call
        $.ajax({
            url: url,
            method: 'POST',
            data: data,
            success: function (response) {
                console.log('API response:', response);

                if (response && Array.isArray(response.data)) {
                    modelTable9.setData(response.data); // Update table
                    paginationBar10.totalCount10 = response.totalCount || 0; // Update total count
                    // Update pagination UI to reflect the new search results
                    paginationBar10.updatePaginationUI10();
                } else {
                    console.error('Invalid response:', response);
                }
            },
            error: function (xhr, status, error) {
                console.error('API call failed:', error);
            }
        });
    },


    handleModePagination10: function () {
        paginationBar10.executeFetch10();
        paginationBar10.updatePaginationUI10();
    },
};

// Initial call
paginationBar10.run10(true);









 
