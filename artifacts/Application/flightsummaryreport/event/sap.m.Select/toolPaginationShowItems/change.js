if (toolPaginationShowItems.getVisible()) {
    paginationBar1.pagination1.take = parseInt(toolPaginationShowItems.getSelectedKey());
}

paginationBar1.pagination1.index = 0;
paginationBar1.handleModePagination1(); // Fetch data for current mode
paginationBar1.updatePaginationUI1(); // Reflect UI changes
