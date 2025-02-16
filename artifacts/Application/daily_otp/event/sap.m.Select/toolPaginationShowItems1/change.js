if (toolPaginationShowItems1.getVisible()) {
    paginationBar.pagination.take = parseInt(toolPaginationShowItems1.getSelectedKey());
}



paginationBar.pagination.index = 0;
paginationBar.handleModePagination1(); // Fetch data for current mode
paginationBar.updatePaginationUI1(); // Reflect UI changes
