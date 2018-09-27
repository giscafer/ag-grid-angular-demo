import { Component, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
    selector: "pinned-column",
    template: `
  <h3>字段设置pinned:true 即可</h3>
  <ag-grid-angular
    #agGrid
    style="width: 800px; height: 100%;"
    id="myGrid"
    [rowData]="rowData"
    class="ag-theme-balham"
    [columnDefs]="columnDefs"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
`
})
export class PinnedColumnComponent {
    private gridApi;
    private gridColumnApi;
    private rowData;

    private columnDefs;

    constructor(private http: HttpClient) {
        this.columnDefs = [
            {
                headerName: "Athlete",
                field: "athlete",
                width: 150,
                pinned: true
            },
            {
                headerName: "Age",
                field: "age",
                width: 90,
                pinned: true
            },
            {
                headerName: "Country",
                field: "country",
                width: 120
            },
            {
                headerName: "Year",
                field: "year",
                width: 90
            },
            {
                headerName: "Date",
                field: "date",
                width: 110
            },
            {
                headerName: "Sport",
                field: "sport",
                width: 110
            },
            {
                headerName: "Gold",
                field: "gold",
                width: 100
            },
            {
                headerName: "Silver",
                field: "silver",
                width: 100
            },
            {
                headerName: "Bronze",
                field: "bronze",
                width: 100
            },
            {
                headerName: "Total",
                field: "total",
                width: 100
            }
        ];
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        this.http
            .get("https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinners.json")
            .subscribe(data => {
                this.rowData = data;
            });
    }
}
