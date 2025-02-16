if (toolPaginationShowItems11.getVisible()) {
    paginationBar14.pagination14.take = parseInt(toolPaginationShowItems11.getSelectedKey());
}

paginationBar14.pagination14.index = 0;
paginationBar14.handleModePagination14(); // Fetch data for current mode
paginationBar14.updatePaginationUI14(); // Reflect UI changes
