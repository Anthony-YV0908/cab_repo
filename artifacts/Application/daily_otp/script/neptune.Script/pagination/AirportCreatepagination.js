
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
        paginationBar2.executeFetch3();
    },

    // Search and create origin (reset the index when search is triggered)
    searchCreateAirport: function (keepIndex) {
        const searchValue = SearchField1.getValue().trim(); // Get search value

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
        paginationBar2.executeFetch3();
    },

    // Update pagination UI after index reset or changes
    updatePaginationUI3: function () {
        const take = paginationBar2.pagination2.take;
        const maxIndex = Math.ceil(paginationBar2.totalCount2 / take); // Total pages

        // Ensure index is within bounds
        paginationBar2.pagination2.index = Math.min(paginationBar2.pagination2.index, maxIndex);
        if (paginationBar2.pagination2.index < 1) {
            paginationBar2.pagination2.index = 1;
        }

        // Update button states
        toolPaginationFirst2.setEnabled(paginationBar2.pagination2.index > 1);
        toolPaginationPrev2.setEnabled(paginationBar2.pagination2.index > 1);
        toolPaginationNext2.setEnabled(paginationBar2.pagination2.index < maxIndex);
        toolPaginationLast2.setEnabled(paginationBar2.pagination2.index < maxIndex);

        // Update page numbers
        toolPaginationPages2.destroyItems();

        const maxItems = paginationBar2.configuration2.maxNumberOfButtons;
        const startItem = Math.max(1, paginationBar2.pagination2.index - Math.floor(maxItems / 2));
        const endItem = Math.min(maxIndex, startItem + maxItems - 1);

        for (let i = startItem; i <= endItem; i++) {
            toolPaginationPages2.addItem(new sap.m.SegmentedButtonItem({
                text: i.toString(),
                key: i,
                press: function () {
                    if (paginationBar2.pagination2.index !== i) {
                        paginationBar2.pagination2.index = i; // Update the index
                        paginationBar2.handleModePagination3(); // Fetch data for current mode
                        paginationBar2.updatePaginationUI3(); // Reflect UI changes
                    }
                }
            }));
        }

        // Ensure the correct page is selected in the UI
        toolPaginationPages2.setSelectedKey(paginationBar2.pagination2.index);
        toolPaginationTitle2.setNumber(`${paginationBar2.pagination2.index} / ${maxIndex}`); // Update pagination title
    },

    // Fetch data (shared logic for both modes)
executeFetch3: function () {
    const index = parseInt(paginationBar2.pagination2.index, 10);
    const take = parseInt(paginationBar2.pagination2.take, 10);
    const skip = take * (index - 1);

    const url = paginationBar2.isSearchMode2
        ? `http://localhost:8080/api/serverscript/cabserverside/AirportSearch`
        : `http://localhost:8080/api/serverscript/cabserverside/Airport`;

    const data = paginationBar2.isSearchMode2
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
                    modelTable19.setData(response.data); // Update table
                    paginationBar2.totalCount2 = response.totalCount || 0; // Update total count
                    // Update pagination UI to reflect the new search results
                    paginationBar2.updatePaginationUI3();
                } else {
                    console.error('Invalid response:', response);
                }
            },
            error: function (xhr, status, error) {
                console.error('API call failed:', error);
            }
        });

},


    // Handle pagination logic based on mode
    handleModePagination3: function () {
        paginationBar2.executeFetch3();
        paginationBar2.updatePaginationUI3();
    },
};

// Initial call
paginationBar2.run2(true);


