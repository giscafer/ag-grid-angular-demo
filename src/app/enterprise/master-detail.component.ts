import { Component, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "ag-grid-enterprise";

@Component({
    selector: "master-detail",
    template: `<div style="height: 100%; padding-top: 35px; box-sizing: border-box;">
    <ag-grid-angular
    #agGrid
    style="width: 100%; height: 100%;"
    id="myGrid"
    [rowData]="rowData"
    class="ag-theme-balham"
    [columnDefs]="columnDefs"
    [enableColResize]="true"
    [masterDetail]="true"
    [detailCellRendererParams]="detailCellRendererParams"
    [detailRowHeight]="detailRowHeight"
    [defaultColDef]="defaultColDef"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
</div>

<div style="position: absolute; top: 0px; left: 0px;">
    <button (click)="startEditingInMasterRow()">Edit Master</button>
    <button (click)="stopEditingInMasterRows()">Stop Edit Master</button>
    <button (click)="startEditingInDetailRow()">Edit Detail</button>
    <button (click)="stopEditingInDetailRows()">Stop Edit Detail</button>
</div>`
})
export class MasterDetailComponent {
    private gridApi;
    private gridColumnApi;
    private rowData;

    private columnDefs;
    private detailCellRendererParams;
    private detailRowHeight;
    private defaultColDef;

    constructor(private http: HttpClient) {
        this.columnDefs = [
            {
                field: "name",
                cellRenderer: "agGroupCellRenderer"
            },
            { field: "account" },
            { field: "calls" },
            {
                field: "minutes",
                valueFormatter: "x.toLocaleString() + 'm'"
            }
        ];
        this.detailCellRendererParams = {
            detailGridOptions: {
                columnDefs: [
                    { field: "callId" },
                    { field: "direction" },
                    { field: "number" },
                    {
                        field: "duration",
                        valueFormatter: "x.toLocaleString() + 's'"
                    },
                    { field: "switchCode" }
                ],
                enableColResize: true,
                defaultColDef: { editable: true },
                onFirstDataRendered(params) {
                    params.api.sizeColumnsToFit();
                }
            },
            getDetailRowData: function (params) {
                params.successCallback(params.data.callRecords);
            }
        };
        this.detailRowHeight = 340;
        this.defaultColDef = { editable: true };
    }

    startEditingInMasterRow() {
        this.gridApi.forEachDetailGridInfo(function (detailGridApi) {
            detailGridApi.api.stopEditing();
        });
        this.gridApi.startEditingCell({
            rowIndex: 0,
            colKey: "calls"
        });
    }

    stopEditingInMasterRows() {
        this.gridApi.stopEditing();
    }

    startEditingInDetailRow() {
        this.gridApi.stopEditing();
        let detailGrid = this.gridApi.getDetailGridInfo("detail_1");
        detailGrid.api.startEditingCell({
            rowIndex: 0,
            colKey: "number"
        });
    }

    stopEditingInDetailRows() {
        this.gridApi.forEachDetailGridInfo(function (detailGridApi) {
            detailGridApi.api.stopEditing();
        });
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        this.http
            .get(
                "https://raw.githubusercontent.com/ag-grid/ag-grid-docs/latest/src/javascript-grid-master-detail/cell-editing/data/data.json"
            )
            .subscribe(data => {
                this.rowData = data;
            });

        setTimeout(function () {
            let rowCount = 0;
            params.api.forEachNode(function (node) {
                node.setExpanded(rowCount++ === 1);
            });
        }, 500);
    }
}
