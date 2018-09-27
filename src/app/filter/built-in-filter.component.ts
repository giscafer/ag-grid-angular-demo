import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";

@Component({
    selector: "my-app",
    template: `<ag-grid-angular
    #agGrid
    style="width: 100%; height: 100%;"
    id="myGrid"
    [rowData]="rowData"
    class="ag-theme-balham"
    [columnDefs]="columnDefs"
    [enableFilter]="true"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
`
})
export class BuiltInFilterComponent {
     gridApi;
     gridColumnApi;
     rowData: any[];

     columnDefs;

    constructor( private http: HttpClient) {
        this.columnDefs = [
            {
                headerName: "Athlete",
                field: "athlete",
                width: 150
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
            },
            {
                headerName: "Year",
                field: "year",
                width: 90
            },
            {
                headerName: "Date",
                field: "date",
                width: 145,
                filter: "agDateColumnFilter",
                filterParams: {
                    comparator: function (filterLocalDateAtMidnight, cellValue) {
                        let dateAsString = cellValue;
                        if (dateAsString == null) {
                            return -1;
                        }
                        let dateParts = dateAsString.split("/");
                        let cellDate = new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));
                        if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
                            return 0;
                        }
                        if (cellDate < filterLocalDateAtMidnight) {
                            return -1;
                        }
                        if (cellDate > filterLocalDateAtMidnight) {
                            return 1;
                        }
                    },
                    browserDatePicker: true
                }
            },
            {
                headerName: "Sport",
                field: "sport",
                width: 110
            },
            {
                headerName: "Gold",
                field: "gold",
                width: 100,
                filter: "agNumberColumnFilter"
            },
            {
                headerName: "Silver",
                field: "silver",
                width: 100,
                filter: "agNumberColumnFilter"
            },
            {
                headerName: "Bronze",
                field: "bronze",
                width: 100,
                filter: "agNumberColumnFilter"
            },
            {
                headerName: "Total",
                field: "total",
                width: 100,
                filter: "agNumberColumnFilter",
                suppressFilter: true
            }
        ];
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        this.http
            .get("https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinners.json")
            .subscribe((data: any[]) => {
                this.rowData = data;
            });
    }
}
