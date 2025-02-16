if (toolPaginationShowItems2.getVisible()) {
    paginationBar2.pagination2.take = parseInt(toolPaginationShowItems2.getSelectedKey());
}

paginationBar2.pagination2.index = 0;
paginationBar2.handleModePagination3(); // Fetch data for current mode
paginationBar2.updatePaginationUI3(); // Reflect UI changes
