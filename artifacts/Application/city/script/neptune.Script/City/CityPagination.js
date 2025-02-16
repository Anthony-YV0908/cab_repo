



var paginationBar3 = {
    configuration2: {
        maxNumberOfButtons: 6, // Max pagination buttons visible
    },
    pagination3: {
        take: 10, // Items per page
        index: 1, // Current page index
        count: 1, // Total number of pages (calculated)
    },
    totalCount3: 0, // Total number of items
    isSearchMode3: false, // Flag to track search mode

    // Run in default mode
    run3: function () {
        paginationBar3.isSearchMode3 = false; // Disable search mode
        paginationBar3.pagination3.index = 1; // Reset to the first page
        paginationBar3.executeFetch3();
    },

    // Search and create origin (reset the index when search is triggered)
    searchCity: function (keepIndex) {
        const searchValue = SearchField4.getValue().trim(); // Get search value

        if (!searchValue) {
            // If search field is empty, fallback to default mode
            paginationBar3.run3();
            return;
        }

        paginationBar3.isSearchMode3 = true; // Enable search mode

        // Reset to the first page when search is performed
        paginationBar3.pagination3.index = 1; // Reset to the first page

        if (!keepIndex) {
            paginationBar3.pagination3.index = 1; // Ensure the first page is shown when search is done
        }

        // Fetch data for the search and update the UI
        paginationBar3.executeFetch3();
    },

    // Update pagination UI after index reset or changes
    updatePaginationUI3: function () {
        const take = paginationBar3.pagination3.take;
        const maxIndex = Math.ceil(paginationBar3.totalCount3 / take); // Total pages

        // Ensure index is within bounds
        paginationBar3.pagination3.index = Math.min(paginationBar3.pagination3.index, maxIndex);
        if (paginationBar3.pagination3.index < 1) {
            paginationBar3.pagination3.index = 1;
        }

        // Update button states
        toolPaginationFirst2.setEnabled(paginationBar3.pagination3.index > 1);
        toolPaginationPrev2.setEnabled(paginationBar3.pagination3.index > 1);
        toolPaginationNext2.setEnabled(paginationBar3.pagination3.index < maxIndex);
        toolPaginationLast2.setEnabled(paginationBar3.pagination3.index < maxIndex);

        // Update page numbers
        toolPaginationPages2.destroyItems();

        const maxItems = paginationBar3.configuration2.maxNumberOfButtons;
        const startItem = Math.max(1, paginationBar3.pagination3.index - Math.floor(maxItems / 2));
        const endItem = Math.min(maxIndex, startItem + maxItems - 1);

        for (let i = startItem; i <= endItem; i++) {
            toolPaginationPages2.addItem(new sap.m.SegmentedButtonItem({
                text: i.toString(),
                key: i,
                press: function () {
                    if (paginationBar3.pagination3.index !== i) {
                        paginationBar3.pagination3.index = i; // Update the index
                        paginationBar3.handleModePagination3(); // Fetch data for current mode
                        paginationBar3.updatePaginationUI3(); // Reflect UI changes
                    }
                }
            }));
        }

        // Ensure the correct page is selected in the UI
        toolPaginationPages2.setSelectedKey(paginationBar3.pagination3.index);
        toolPaginationTitle2.setNumber(`${paginationBar3.pagination3.index} / ${maxIndex}`); // Update pagination title
    },

    // Fetch data (shared logic for both modes)
    executeFetch3: function () {
        const index = parseInt(paginationBar3.pagination3.index, 10);
        const take = parseInt(paginationBar3.pagination3.take, 10);
        const skip = take * (index - 1);

        const url = paginationBar3.isSearchMode3
            ? `http://localhost:8080/api/serverscript/cabserverside/CitySearch`
            : `http://localhost:8080/api/serverscript/cabserverside/City`;

        const data = paginationBar3.isSearchMode3
            ? { cityname: SearchField4.getValue(), take, skip }
            : { take, skip };

        // AJAX call
        $.ajax({
            url: url,
            method: 'POST',
            data: data,
            success: function (response) {
                console.log('API response:', response);

                if (response && Array.isArray(response.data)) {
                    modelTable1.setData(response.data); // Update table
                    paginationBar3.totalCount3 = response.totalCount || 0; // Update total count
                    // Update pagination UI to reflect the new search results
                    paginationBar3.updatePaginationUI3();
                } else {
                    console.error('Invalid response:', response);
                }
            },
            error: function (xhr, status, error) {
                console.error('API call failed:', error);
            }
        });
    },


    handleModePagination3: function () {
        paginationBar3.executeFetch3();
        paginationBar3.updatePaginationUI3();
    },
};

// Initial call
paginationBar3.run3(true);









 

