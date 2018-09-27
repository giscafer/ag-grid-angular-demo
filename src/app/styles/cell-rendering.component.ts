import { Component, ViewChild } from "@angular/core";

@Component({
    selector: "cell-rendering",
    template: `
<div style="height: 100%; padding-top: 40px; box-sizing: border-box;">
    <ag-grid-angular
    #agGrid
    style="width: 100%; height: 100%;"
    id="myGrid"
    [rowData]="rowData"
    class="ag-theme-balham"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowData]="rowData"
    [enableColResize]="true"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
</div>
<div style="position: absolute; padding-top: 4px; top: 0px; left: 0px;">
    <button (click)="onUpdateSomeValues()">Update Some D &amp; E Values</button>
</div>`
})
export class CellRenderingComponent {
     gridApi;
     gridColumnApi;

     columnDefs;
     defaultColDef;
     rowData;

    constructor() {
        this.columnDefs = [
            {
                headerName: "Editable A",
                field: "a",
                editable: true,
                valueParser: numberValueParser
            },
            {
                headerName: "Editable B",
                field: "b",
                editable: true,
                valueParser: numberValueParser
            },
            {
                headerName: "Editable C",
                field: "c",
                editable: true,
                valueParser: numberValueParser
            },
            {
                headerName: "API D",
                field: "d",
                valueParser: numberValueParser,
                cellRenderer: "agAnimateShowChangeCellRenderer"
            },
            {
                headerName: "API E",
                field: "e",
                valueParser: numberValueParser,
                cellRenderer: "agAnimateShowChangeCellRenderer"
            },
            {
                headerName: "Total",
                valueGetter: "data.a + data.b + data.c + data.d + data.e",
                volatile: true,
                cellRenderer: "agAnimateShowChangeCellRenderer"
            },
            {
                headerName: "Average",
                valueGetter: "(data.a + data.b + data.c + data.d + data.e) / 5",
                volatile: true,
                cellRenderer: "agAnimateSlideCellRenderer"
            }
        ];
        this.defaultColDef = {
            valueFormatter: function (params) {
                return formatNumber(params.value);
            },
            cellClass: "align-right"
        };
        this.rowData = createRowData();
    }

    onUpdateSomeValues() {
        let rowCount = this.gridApi.getDisplayedRowCount();
        for (let i = 0; i < 10; i++) {
            let row = Math.floor(Math.random() * rowCount);
            let rowNode = this.gridApi.getDisplayedRowAtIndex(row);
            rowNode.setDataValue("d", Math.floor(Math.random() * 10000));
            rowNode.setDataValue("e", Math.floor(Math.random() * 10000));
        }
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        params.api.sizeColumnsToFit();
    }
}

function createRowData() {
    let rowData = [];
    for (let i = 0; i < 20; i++) {
        rowData.push({
            a: Math.floor(((i + 323) * 25435) % 10000),
            b: Math.floor(((i + 323) * 23221) % 10000),
            c: Math.floor(((i + 323) * 468276) % 10000),
            d: 0,
            e: 0
        });
    }
    return rowData;
}
function numberValueParser(params) {
    return Number(params.newValue);
}
function formatNumber(number) {
    return Math.floor(number)
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
