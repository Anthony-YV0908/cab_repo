if (toolPaginationShowItems2.getVisible()) {
    paginationBar2.pagination2.take = parseInt(toolPaginationShowItems2.getSelectedKey());
}

paginationBar2.pagination2.index = 0;
paginationBar2.run2(true); 
paginationBar2.handlePagination2();