if (toolPaginationShowItems1.getVisible()) {
    paginationBar2.pagination2.take = parseInt(toolPaginationShowItems1.getSelectedKey());
}

paginationBar2.pagination2.index = 0;
paginationBar2.handleModePagination2(); // Fetch data for current mode
paginationBar2.updatePaginationUI2(); // Reflect UI changes
