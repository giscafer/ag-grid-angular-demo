import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";

@Component({
    selector: "my-highlighting",
    template: `
    <p>try mouse over the table</p>
    <ag-grid-angular
    #agGrid
    style="width: 100%; height: 100%;"
    id="myGrid"
    [rowData]="rowData"
    class="ag-theme-blue"
    [columnDefs]="columnDefs"
    [enableColResize]="true"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
    `,
    styles: [`
    :host::ng-deep .ag-row-hover {
        /* putting in !important so it overrides the theme's styling as it hovers the row also */
        background-color: #dfdfff !important;
    }

    :host::ng-deep .ag-column-hover {
        background-color: #dfffdf;
    }
    `]
})
export class HighlightingComponent {
    private gridApi;
    private gridColumnApi;
    private rowData;

    private columnDefs;

    constructor(private http: HttpClient) {
        this.columnDefs = [
            {
                headerName: "Participant",
                children: [
                    {
                        field: "athlete",
                        width: 150
                    },
                    {
                        field: "age",
                        width: 90
                    }
                ]
            },
            {
                headerName: "Details",
                children: [
                    {
                        field: "country",
                        width: 120
                    },
                    {
                        field: "year",
                        width: 90
                    },
                    {
                        field: "date",
                        width: 110
                    },
                    {
                        field: "sport",
                        width: 110
                    }
                ]
            },
            {
                headerName: "Medals",
                children: [
                    {
                        field: "gold",
                        width: 100
                    },
                    {
                        field: "silver",
                        width: 100
                    },
                    {
                        field: "bronze",
                        width: 100
                    },
                    {
                        field: "total",
                        width: 100
                    }
                ]
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
