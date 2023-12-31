import { useState } from 'react';
import PropTypes from 'prop-types';

import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import Iconify from 'src/components/iconify';

import Label from '../label';

// ----------------------------------------------------------------------

export default function GenericTableRow({
  selected,
  handleClick,
  row,
  headLabel,
  handleApprove,
  handleEdit,
  handleDelete,
  markRow,
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        {markRow && (
          <TableCell padding="checkbox">
            <Checkbox disableRipple checked={selected} onChange={handleClick} />
          </TableCell>
        )}
        {Object.keys(row).map(
          (value, idx) =>
            value !== 'id' &&
            (value === 'status' ? (
              <TableCell key={idx} align={headLabel[idx - 1].align || 'left'}>
                <Label color={(row[value] === 'Pendiente' && 'warning') || 'success'}>{row[value]}</Label>
              </TableCell>
            ) : (
              <TableCell key={idx} align={headLabel[idx - 1].align || 'left'}>
                {row[value]}
              </TableCell>
            ))
        )}

        {(handleApprove || handleEdit || handleDelete) && (
          <TableCell align="right">
            <IconButton onClick={handleOpenMenu}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          </TableCell>
        )}
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        {handleApprove && (
          <MenuItem
            onClick={() => {
              handleApprove(row);
              handleCloseMenu();
            }}
            sx={{ color: 'green' }}
          >
            <Iconify icon="el:ok-circle" sx={{ mr: 2 }} />
            Aprobar
          </MenuItem>
        )}

        {handleEdit && (
          <MenuItem
            onClick={() => {
              handleEdit(row);
              handleCloseMenu();
            }}
          >
            <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
            Editar
          </MenuItem>
        )}

        {handleDelete && (
          <MenuItem
            onClick={() => {
              handleDelete(row);
              handleCloseMenu();
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
            Eliminar
          </MenuItem>
        )}
      </Popover>
    </>
  );
}

TableRow.propTypes = {
  headLabel: PropTypes.array,
  row: PropTypes.object,
  handleClick: PropTypes.func,
  selected: PropTypes.any,
  handleApprove: PropTypes.func,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
  markRow: PropTypes.bool,
};
