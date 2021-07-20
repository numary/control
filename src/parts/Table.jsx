import * as React from 'react';
import styled from 'styled-components';
import {useTable} from 'react-table';

const TableWrapper = styled.table`
  width: 100%;
  /* word-break: break-word; */
  border-collapse: collapse;
  font-size: 13px;

  td, th {
    padding: 14px;
    text-align: center;

    &.left {
      text-align: left;
    }
  }

  /* thead th {
    padding: 14px;
  } */

  tbody tr {
    border-bottom: solid 0.5px rgba(16, 0, 70, 0.05);

    &:nth-child(even) {
      /* background-color: rgba(0, 0, 0, 0.02); */
    }

    &[group="odd"] {
      /* background-color: rgba(0, 0, 0, 0.02); */
    }

    /* &[level="0"] {
      border-left: solid 3px black;
    }

    &[level="1"] {
      border-left: solid 3px lightgrey;
      background-color: rgba(0, 0, 0, 0.02);
    } */
  }

  thead tr {
    border-bottom: solid 1px rgba(0, 0, 0, 0.05);
    /* color: white; */
    /* background: #F5F5F5; */
    border-radius: 4px;

    th {
      line-height: 30px;
      /* padding-bottom: 30px; */
      font-weight: 500;
      opacity: 0.65;

      /* &:first-child {
        border-radius: var(--theme-radius) 0 0 0;
      }

      &:last-child {
        border-radius: 0 var(--theme-radius) 0 0;
      } */
    }
  }

  tbody tr:last-child {
    border-bottom: none;
  }

  tbody tr {
    /* font-family: 'Courier New', Courier, monospace; */
  }
`;

function Table({
  columns,
  data,
  empty,
  getRowProps = () => ({}),
  getCellProps = () => ({}),
}) {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable({
      columns,
      data,
    });
  
    return (
      <TableWrapper {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()} {...getRowProps(row)}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps([
                    {
                      className: cell.column.className,
                    },
                    getCellProps(cell),
                  ])}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
          {rows.length === 0 && (
            <tr>
              <td colSpan={headerGroups[0].headers.length}>
                {empty ? empty : (
                  <span>No data</span>
                )}
              </td>
            </tr>
          )}
        </tbody>
      </TableWrapper>
    )
  }

  export default Table;