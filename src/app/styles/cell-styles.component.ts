import { Component, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
    selector: "my-app",
    template: `<ag-grid-angular
    #agGrid
    style="width: 100%; height: 100%;"
    id="myGrid"
    [rowData]="rowData"
    class="ag-theme-blue"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>`
})
export class CellStylesComponent {
    private gridApi;
    private gridColumnApi;
    private rowData: any[];

    private columnDefs;
    private defaultColDef;

    constructor(private http: HttpClient) {
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
                valueParser: numberParser,
                cellClassRules: {
                    "rag-green": "x < 20",
                    "rag-amber": "x >= 20 && x < 25",
                    "rag-red": "x >= 25"
                }
            },
            {
                headerName: "Country",
                field: "country",
                width: 120
            },
            {
                headerName: "Year",
                field: "year",
                valueParser: numberParser,
                cellClassRules: {
                    "rag-green-outer": function (params) {
                        return params.value === 2008;
                    },
                    "rag-amber-outer": function (params) {
                        return params.value === 2004;
                    },
                    "rag-red-outer": function (params) {
                        return params.value === 2000;
                    }
                },
                cellRenderer: function (params) {
                    return '<span class="rag-element">' + params.value + "</span>";
                }
            },
            {
                headerName: "Date",
                field: "date",
                cellClass: "rag-amber"
            },
            {
                headerName: "Sport",
                field: "sport",
                cellClass: function (params) {
                    return params.value === "Swimming" ? "rag-green" : "rag-amber";
                }
            },
            {
                headerName: "Gold",
                field: "gold",
                valueParser: numberParser,
                cellStyle: { backgroundColor: "#aaffaa" }
            },
            {
                headerName: "Silver",
                field: "silver",
                valueParser: numberParser,
                cellStyle: function (params) {
                    let color = numberToColor(params.value);
                    return { backgroundColor: color };
                }
            },
            {
                headerName: "Bronze",
                field: "bronze",
                valueParser: numberParser,
                cellStyle: function (params) {
                    let color = numberToColor(params.value);
                    return { "background-color": color };
                }
            },
            {
                headerName: "Total",
                field: "total"
            }
        ];
        this.defaultColDef = {
            editable: true,
            width: 100
        };
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        this.http
            .get(
                "https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinnersSmall.json"
            )
            .subscribe((data: any[]) => {
                this.rowData = data;
            });
    }
}

function numberToColor(val) {
    if (val === 0) {
        return "#ffaaaa";
    } else if (val === 1) {
        return "#aaaaff";
    } else {
        return "#aaffaa";
    }
}
function numberParser(params) {
    let newValue = params.newValue;
    let valueAsNumber;
    if (newValue === null || newValue === undefined || newValue === "") {
        valueAsNumber = null;
    } else {
        valueAsNumber = parseFloat(params.newValue);
    }
    return valueAsNumber;
}
