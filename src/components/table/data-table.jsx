import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

// import { items } from 'src/_mock/product';

import Card from '@mui/material/Card';

import Scrollbar from 'src/components/scrollbar';

import TableRow from './table-row';
import TableHead from './table-head';
import TableNoData from './table-no-data';
import TableToolbar from './table-toolbar';
import TableEmptyRows from './table-empty-rows';
import { emptyRows, applyFilter, getComparator } from './utils';

// ----------------------------------------------------------------------

export const DataTable = ({
  headers,
  items,
  onApprove,
  onEdit,
  onDelete,
  markRow,
  searchParameter,
}) => {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [itemsForTable, setItemsForTable] = useState([]);

  useEffect(() => {
    const labels = [...headers.map((header) => header.id), 'id'];
    const newItems = items.map((item) =>
      Object.fromEntries(Object.entries(item).filter(([key]) => labels.includes(key)))
    );
    setItemsForTable(newItems);
  }, [headers, items]);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = itemsForTable.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    searchParameter,
    inputData: itemsForTable,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Card>
      <TableToolbar
        numSelected={selected.length}
        filterName={filterName}
        onFilterName={handleFilterByName}
      />

      <Scrollbar>
        <TableContainer sx={{ overflow: 'unset' }}>
          <Table sx={{ minWidth: 800 }}>
            <TableHead
              order={order}
              orderBy={orderBy}
              rowCount={itemsForTable.length}
              numSelected={selected.length}
              onRequestSort={handleSort}
              onSelectAllClick={handleSelectAllClick}
              headLabel={headers}
              markRow={markRow}
            />
            <TableBody>
              {dataFiltered
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, idx) => (
                  <TableRow
                    key={idx}
                    headLabel={headers}
                    row={row}
                    selected={selected.indexOf(row.name) !== -1}
                    handleClick={(event) => handleClick(event, row.name)}
                    handleApprove={onApprove}
                    handleEdit={onEdit}
                    handleDelete={onDelete}
                    markRow={markRow}
                  />
                ))}

              <TableEmptyRows
                height={77}
                emptyRows={emptyRows(page, rowsPerPage, itemsForTable.length)}
              />

              {notFound && <TableNoData query={filterName} />}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <TablePagination
        page={page}
        component="div"
        count={itemsForTable.length}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
};

DataTable.propTypes = {
  headers: PropTypes.array,
  items: PropTypes.array,
  onApprove: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  markRow: PropTypes.bool,
  searchParameter: PropTypes.string,
};
