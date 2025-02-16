if (toolPaginationShowItems4.getVisible()) {
    paginationBar8.pagination8.take = parseInt(toolPaginationShowItems4.getSelectedKey());
}

paginationBar8.pagination8.index = 0;
paginationBar8.handleModePagination8(); // Fetch data for current mode
paginationBar8.updatePaginationUI8(); // Reflect UI changes
