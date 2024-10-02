/* eslint-disable no-nested-ternary */
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  styled,
  tableCellClasses
} from '@mui/material';
import { useEffect, useState } from 'react';
import useDataStore from '../../store/useDataStore';
import Helper from '../../utils/Helper';
import useConfigStore from '../../store/useConfigStore';
import SymbolName from './SymbolName';
import TradeLinks from '../symbol-detail/TradeLinks';

const headCells = [
  {
    id: 'rank',
    numeric: true,
    disablePadding: true,
    label: '#',
    minWidth: 30
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
    minWidth: 120
  },
  {
    id: 'price',
    numeric: true,
    disablePadding: false,
    label: 'Price'
  },
  {
    id: 'volume',
    numeric: true,
    disablePadding: false,
    label: '24h Volume'
  },
  {
    id: 'hour',
    numeric: true,
    disablePadding: false,
    label: 'Hour'
  },
  {
    id: 'day',
    numeric: true,
    disablePadding: false,
    label: 'Day'
  },
  {
    id: 'week',
    numeric: true,
    disablePadding: false,
    label: 'Week'
  },
  {
    id: 'month',
    numeric: true,
    disablePadding: false,
    label: 'Month'
  },
  {
    id: 'year',
    numeric: true,
    disablePadding: false,
    label: 'Year'
  },
  {
    id: 'links',
    numeric: false,
    disablePadding: false,
    label: 'Link',
    minWidth: '100px',
    center: true,
    preventSort: true
  }
];
const StyledHeadCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    cursor: 'pointer',
    backgroundColor: '#3d3d3d',
    color: theme.palette.common.white,
    borderBottom: 0,
    padding: 5,
    transition: 'background 0.4s',
    ':has(.Mui-active)': {
      background: '#07d'
    }
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  },
  ':hover': {
    background: '#545454',
    '& .MuiTableSortLabel-icon': {
      opacity: 1
    }
  }
}));

const StyledSortLabel = styled(TableSortLabel)(({ theme }) => ({
  textWrap: 'nowrap',
  color: 'inherit',
  '&.Mui-active': { color: 'white' },
  '& .MuiTableSortLabel-icon': { color: 'white !important' },
  ':hover, :focus': {
    color: 'white'
  }
}));

const StyledCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.common.white,
  padding: '5px 5px',
  textWrap: 'nowrap',
  borderBottom: 0,
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));
const ListView = () => {
  const rows = useDataStore((state) => state.currencies);
  const  currency  = useConfigStore((state) => state.currency);
  console.log("curreuncy in list view",currency)
  const colorScheme = useConfigStore((state) => state.colorScheme);
  const [sort, setSort] = useState();
  const [sortDirection, setSortDirection] = useState('desc');
  const [sortedRows, setSortedRows] = useState(rows);

  useEffect(() => {
    const sorted = [...rows];
    if (sort) {
      if (sort === 'rank') {
        sorted.sort((a, b) => (sortDirection === 'asc' ? a.rank - b.rank : b.rank - a.rank));
      } else if (sort === 'name') {
        sorted.sort((a, b) => (sortDirection === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));
      } else if (sort === 'price') {
        sorted.sort((a, b) => (sortDirection === 'asc' ? a.price - b.price : b.price - a.price));
      } else if (sort === 'volume') {
        sorted.sort((a, b) => (sortDirection === 'asc' ? a.volume - b.volume : b.volume - a.volume));
      } else if (sort === 'hour') {
        sorted.sort((a, b) => (sortDirection === 'asc' ? a.performance.hour - b.performance.hour : b.performance.hour - a.performance.hour));
      } else if (sort === 'day') {
        sorted.sort((a, b) => (sortDirection === 'asc' ? a.performance.day - b.performance.day : b.performance.day - a.performance.day));
      } else if (sort === 'week') {
        sorted.sort((a, b) => (sortDirection === 'asc' ? a.performance.week - b.performance.week : b.performance.week - a.performance.week));
      } else if (sort === 'month') {
        sorted.sort((a, b) => (sortDirection === 'asc' ? a.performance.month - b.performance.month : b.performance.month - a.performance.month));
      } else if (sort === 'year') {
        sorted.sort((a, b) => (sortDirection === 'asc' ? a.performance.year - b.performance.year : b.performance.year - a.performance.year));
      }
    }
    setSortedRows(sorted);
  }, [sort, sortDirection]);

  const updateSort = (id) => {
    if (sort === id) {
      if (sortDirection === 'desc') {
        setSortDirection('asc');
      } else {
        setSortDirection('desc');
        setSort();
      }
    } else {
      setSort(id);
      setSortDirection('desc');
    }
  };

  return (
    <Box sx={{ flexGrow: 1, width: '100%' }}>
      <Paper sx={{ width: '100%', overflow: 'hidden', background: 'transparent', boxShadow: 'none' }}>
        <TableContainer sx={{ maxHeight: 'calc(100vh - 70px)', marginTop: '2px' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {headCells.map((headCell) => (
                  <StyledHeadCell
                    key={headCell.id}
                    align={headCell.numeric ? 'right' : headCell.center ? 'center' : 'left'}
                    sx={{ minWidth: headCell.minWidth }}
                    onClick={() => {
                      if (headCell.preventSort) return;
                      updateSort(headCell.id);
                    }}
                    sortDirection={false}>
                    <StyledSortLabel
                      disabled={headCell.preventSort}
                      hideSortIcon={headCell.preventSort}
                      active={headCell.id === sort}
                      direction={headCell.id === sort ? sortDirection : 'desc'}
                      sx={{ flexDirection: headCell.numeric ? '' : 'row-reverse' }}>
                      {headCell.label}
                    </StyledSortLabel>
                  </StyledHeadCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedRows.map((row) => {
                
               
                return (
                  <TableRow key={row.id} sx={{ transition: 'background .4s', ':hover': { background: '#ffffff14' } }}>
                    <StyledCell align="right">{row.rank}</StyledCell>
                    <StyledCell>
                      <SymbolName symbol={row} />
                    </StyledCell>
                    <StyledCell align="right">{Helper.formatPrice(row.price, currency)}</StyledCell>
                    <StyledCell align="right">{Helper.formatPrice(row.volume, currency)}</StyledCell>
                    <StyledCell align="right" sx={{ background: Helper.getSecondaryColor(row.performance.hour, colorScheme) }}>
                      {Helper.formatPercentage(row.performance.hour, true)}
                    </StyledCell>
                    <StyledCell align="right" sx={{ background: Helper.getSecondaryColor(row.performance.day, colorScheme) }}>
                      {Helper.formatPercentage(row.performance.day, true)}
                    </StyledCell>
                    <StyledCell align="right" sx={{ background: Helper.getSecondaryColor(row.performance.week, colorScheme) }}>
                      {Helper.formatPercentage(row.performance.week, true)}
                    </StyledCell>
                    <StyledCell align="right" sx={{ background: Helper.getSecondaryColor(row.performance.month, colorScheme) }}>
                      {Helper.formatPercentage(row.performance.month, true)}
                    </StyledCell>
                    <StyledCell align="right" sx={{ background: Helper.getSecondaryColor(row.performance.year, colorScheme) }}>
                      {Helper.formatPercentage(row.performance.year, true)}
                    </StyledCell>
                    <StyledCell align="center">
                      <TradeLinks symbol={row} mb={0} />
                    </StyledCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default ListView;