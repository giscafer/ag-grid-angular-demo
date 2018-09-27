import { Component, ViewChild } from "@angular/core";

@Component({
    selector: "row-styles",
    template: `<div style="height: 100%; padding-top: 35px; box-sizing: border-box;">
    <ag-grid-angular
    #agGrid
    style="width: 100%; height: 100%;"
    id="myGrid"
    [rowData]="rowData"
    class="ag-theme-balham"
    [rowData]="rowData"
    [columnDefs]="columnDefs"
    [rowClassRules]="rowClassRules"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
</div>

<div style="position: absolute; top: 0px; left: 0px;">
    <button (click)="setDataValue()">rowNode.setDataValue</button>
    <button (click)="setData()">rowNode.setData</button>
    <button (click)="updateRowData()">api.updateRowData</button>
</div>`,
    styles: [`
        :host::ng-deep .ag-theme-balham .sick-days-warning {
            background-color: sandybrown !important;
        }
        :host::ng-deep .ag-theme-balham .sick-days-breach {
            background-color: lightcoral !important;
        }
    `]
})
export class RowStylesComponent {
    private gridApi;
    private gridColumnApi;
    private rowData: any[];

    private columnDefs;
    private rowClassRules;

    constructor() {
        this.rowData = [
            {
                employee: "Josh Finch",
                sickDays: 4
            },
            {
                employee: "Flavia Mccloskey",
                sickDays: 1
            },
            {
                employee: "Marine Creason",
                sickDays: 8
            },
            {
                employee: "Carey Livingstone",
                sickDays: 2
            },
            {
                employee: "Brande Giorgi",
                sickDays: 5
            },
            {
                employee: "Beatrice Kugler",
                sickDays: 3
            },
            {
                employee: "Elvia Macko",
                sickDays: 7
            },
            {
                employee: "Santiago Little",
                sickDays: 1
            },
            {
                employee: "Mary Clifton",
                sickDays: 2
            },
            {
                employee: "Norris Iniguez",
                sickDays: 1
            },
            {
                employee: "Shellie Umland",
                sickDays: 5
            },
            {
                employee: "Kristi Nawrocki",
                sickDays: 2
            },
            {
                employee: "Elliot Malo",
                sickDays: 3
            },
            {
                employee: "Paul Switzer",
                sickDays: 11
            },
            {
                employee: "Lilly Boaz",
                sickDays: 6
            },
            {
                employee: "Frank Kimura",
                sickDays: 1
            },
            {
                employee: "Alena Wages",
                sickDays: 5
            }
        ];
        this.columnDefs = [
            {
                headerName: "Employee",
                field: "employee"
            },
            {
                headerName: "Number Sick Days",
                field: "sickDays",
                editable: true
            }
        ];
        this.rowClassRules = {
            "sick-days-warning": function (params) {
                let numSickDays = params.data.sickDays;
                return numSickDays > 5 && numSickDays <= 7;
            },
            "sick-days-breach": "data.sickDays > 8"
        };
    }

    setDataValue() {
        this.gridApi.forEachNode(function (rowNode) {
            rowNode.setDataValue("sickDays", randomInt());
        });
    }

    setData() {
        this.gridApi.forEachNode(function (rowNode) {
            let newData = {
                employee: rowNode.data.employee,
                sickDays: randomInt()
            };
            rowNode.setData(newData);
        });
    }

    updateRowData() {
        let itemsToUpdate = [];
        this.gridApi.forEachNode(function (rowNode) {
            let data = rowNode.data;
            data.sickDays = randomInt();
            itemsToUpdate.push(data);
        });
        this.gridApi.updateRowData({ update: itemsToUpdate });
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    }
}

function randomInt() {
    return Math.floor(Math.random() * 10);
}
