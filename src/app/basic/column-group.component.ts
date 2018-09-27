import { Component, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
    selector: "column-group",
    template: `<ag-grid-angular
    #agGrid
    style="width: 100%; height: 100%;"
    id="myGrid"
    [rowData]="rowData"
    class="ag-theme-balham"
    [columnDefs]="columnDefs"
    [debug]="true"
    [enableSorting]="true"
    [enableFilter]="true"
    [enableColResize]="true"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
`
})
export class ColumnGroupComponent {
    private gridApi;
    private gridColumnApi;
    private rowData;

    private columnDefs;

    constructor(private http: HttpClient) {
        this.columnDefs = [
            {
                headerName: "Athlete Details",
                children: [
                    {
                        headerName: "Athlete",
                        field: "athlete",
                        width: 150,
                        filter: "agTextColumnFilter"
                    },
                    {
                        headerName: "Age",
                        field: "age",
                        width: 90,
                        filter: "agNumberColumnFilter"
                    },
                    {
                        headerName: "Country",
                        field: "country",
                        width: 120
                    }
                ]
            },
            {
                headerName: "Sports Results",
                children: [
                    {
                        headerName: "Sport",
                        field: "sport",
                        width: 110
                    },
                    {
                        headerName: "Total",
                        columnGroupShow: "closed",
                        field: "total",
                        width: 100,
                        filter: "agNumberColumnFilter"
                    },
                    {
                        headerName: "Gold",
                        columnGroupShow: "open",
                        field: "gold",
                        width: 100,
                        filter: "agNumberColumnFilter"
                    },
                    {
                        headerName: "Silver",
                        columnGroupShow: "open",
                        field: "silver",
                        width: 100,
                        filter: "agNumberColumnFilter"
                    },
                    {
                        headerName: "Bronze",
                        columnGroupShow: "open",
                        field: "bronze",
                        width: 100,
                        filter: "agNumberColumnFilter"
                    }
                ]
            }
        ];
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        this.http
            .get(
                "https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinnersSmall.json"
            )
            .subscribe(data => {
                this.rowData = data;
            });
    }
}
