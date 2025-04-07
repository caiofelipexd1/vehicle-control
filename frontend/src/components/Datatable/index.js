import React from 'react';
import MUIDataTable from 'mui-datatables';
import theme from '../../theme';
import { ThemeProvider } from '@mui/material/styles';

export default function Datatable({ title, data, columns, options, onSelectRows }) {

  options = {
    textLabels: {
      body: {
        noMatch: "Desculpe, nenhum registro correspondente encontrado.",
        toolTip: "Ordernar",
        columnHeaderTooltip: column => `Ordenar por ${column.label}`
      },
      pagination: {
        next: "Próxima página",
        previous: "Página anterior",
        rowsPerPage: "Linhas por página:",
        displayRows: "do total de",
      },
      toolbar: {
        search: "Pesquisar",
        downloadCsv: "Download CSV",
        print: "Imprimir",
        viewColumns: "Ver colunas",
        filterTable: "Filtro",
      },
      filter: {
        all: "Todos",
        title: "Filtros",
        reset: "Resetar",
      },
      viewColumns: {
        title: "Exibir colunas",
        titleAria: "Mostrar/Ocultar colunas da tabela",
      },
      selectedRows: {
        text: "linha(s) selecionadas",
        delete: "Deletar",
        deleteAria: "Deletar linhas selecionadas",
      },
    },
    download: false,
    print: false,
    sort: false,
    filter: false,
    viewColumns: false,
    selectableRows: "none",
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 15, 20],
    onRowSelectionChange: (rowsSelectedData, allRows, rowsSelected) => {
      onSelectRows(rowsSelected);
    },
    ...options
  };


  return (
    <ThemeProvider theme={theme}>
      <MUIDataTable
        title={title}
        data={data}
        columns={columns}
        options={options}
      />
    </ThemeProvider>
  );
}