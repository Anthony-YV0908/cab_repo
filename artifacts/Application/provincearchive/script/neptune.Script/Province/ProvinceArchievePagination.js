








var paginationBar16 = {
    configuration16: {
        maxNumberOfButtons: 6, // Max pagination buttons visible
    },
    pagination16: {
        take: 10, // Items per page
        index: 1, // Current page index
        count: 1, // Total number of pages (calculated)
    },
    totalCount16: 0, // Total number of items
    isSearchMode16: false, // Flag to track search mode

    // Run in default mode
    run16: function () {
        paginationBar16.isSearchMode16 = false; // Disable search mode
        paginationBar16.pagination16.index = 1; // Reset to the first page
        paginationBar16.executeFetch16();
    },

    // Search and create origin (reset the index when search is triggered)
    searchProvinceArchive: function (keepIndex) {
        const searchValue = SearchField9.getValue().trim(); // Get search value

        if (!searchValue) {
            // If search field is empty, fallback to default mode
            paginationBar16.run16();
            return;
        }

        paginationBar16.isSearchMode16 = true; // Enable search mode

        // Reset to the first page when search is performed
        paginationBar16.pagination16.index = 1; // Reset to the first page

        if (!keepIndex) {
            paginationBar16.pagination16.index = 1; // Ensure the first page is shown when search is done
        }

        // Fetch data for the search and update the UI
        paginationBar16.executeFetch16();
    },

    // Update pagination UI after index reset or changes
    updatePaginationUI16: function () {
        const take = paginationBar16.pagination16.take;
        const maxIndex = Math.ceil(paginationBar16.totalCount16 / take); // Total pages

        // Ensure index is within bounds
        paginationBar16.pagination16.index = Math.min(paginationBar16.pagination16.index, maxIndex);
        if (paginationBar16.pagination16.index < 1) {
            paginationBar16.pagination16.index = 1;
        }

        // Update button states
        toolPaginationFirst12.setEnabled(paginationBar16.pagination16.index > 1);
        toolPaginationPrev12.setEnabled(paginationBar16.pagination16.index > 1);
        toolPaginationNext12.setEnabled(paginationBar16.pagination16.index < maxIndex);
        toolPaginationLast12.setEnabled(paginationBar16.pagination16.index < maxIndex);

        // Update page numbers
        toolPaginationPages12.destroyItems();

        const maxItems = paginationBar16.configuration16.maxNumberOfButtons;
        const startItem = Math.max(1, paginationBar16.pagination16.index - Math.floor(maxItems / 2));
        const endItem = Math.min(maxIndex, startItem + maxItems - 1);

        for (let i = startItem; i <= endItem; i++) {
            toolPaginationPages12.addItem(new sap.m.SegmentedButtonItem({
                text: i.toString(),
                key: i,
                press: function () {
                    if (paginationBar16.pagination16.index !== i) {
                        paginationBar16.pagination16.index = i; // Update the index
                        paginationBar16.handleModePagination16(); // Fetch data for current mode
                        paginationBar16.updatePaginationUI16(); // Reflect UI changes
                    }
                }
            }));
        }

        // Ensure the correct page is selected in the UI
        toolPaginationPages12.setSelectedKey(paginationBar16.pagination16.index);
        toolPaginationTitle12.setNumber(`${paginationBar16.pagination16.index} / ${maxIndex}`); // Update pagination title
    },

    // Fetch data (shared logic for both modes)
    executeFetch16: function () {
        const index = parseInt(paginationBar16.pagination16.index, 10);
        const take = parseInt(paginationBar16.pagination16.take, 10);
        const skip = take * (index - 1);

        const url = paginationBar16.isSearchMode16
             ? `http://localhost:8080/api/serverscript/cabserverside/ProvinceSearchArchive`
            : `http://localhost:8080/api/serverscript/cabserverside/ProvinceArchive`;

        const data = paginationBar16.isSearchMode16
            ? { countryname: SearchField9.getValue(), take, skip }
            : { take, skip };

        // AJAX call
        $.ajax({
            url: url,
            method: 'POST',
            data: data,
            success: function (response) {
                console.log('API response:', response);

                if (response && Array.isArray(response.data)) {
                    modelTable12.setData(response.data); // Update table
                    paginationBar16.totalCount16 = response.totalCount || 0; // Update total count
                    // Update pagination UI to reflect the new search results
                    paginationBar16.updatePaginationUI16();
                } else {
                    console.error('Invalid response:', response);
                }
            },
            error: function (xhr, status, error) {
                console.error('API call failed:', error);
            }
        });
    },


    handleModePagination16: function () {
        paginationBar16.executeFetch16();
        paginationBar16.updatePaginationUI16();
    },
};

// Initial call
paginationBar16.run16(true);









 








 

