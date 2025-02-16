if (toolPaginationShowItems3.getVisible()) {
    paginationBar1.pagination1.take1 = parseInt(toolPaginationShowItems3.getSelectedKey());
}

paginationBar1.pagination1.index = 0;
paginationBar1.handleModePagination4(); // Fetch data for current mode
paginationBar1.updatePaginationU4(); // Reflect UI changes
