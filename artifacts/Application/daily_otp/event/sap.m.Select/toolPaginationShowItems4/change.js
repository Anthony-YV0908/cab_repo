if (toolPaginationShowItems4.getVisible()) {
    paginationBar3.pagination3.take = parseInt(toolPaginationShowItems4.getSelectedKey());
}

paginationBar3.pagination3.index = 0;
paginationBar3.handleModePagination2(); // Fetch data for current mode
paginationBar3.updatePaginationUI2(); // Reflect UI changes
