import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd';

declare let WebSocket: any;
@Component({
    selector: 'binding-websocket',
    template: `
    <div>
        <h3>Data Binding to Websocket</h3>
        <p>WebSocket service use wss://kendoui-ws-demo.herokuapp.com</p>
        <p>Test: <a href="javascript:;" (click)="openNewTab()">点击打开新的页面</a>，操作新增记录，删除记录，看 WebSocket 效果 </p>
        <button nz-button nzType="default" (click)="create()">Add Item</button>
        <button nz-button nzType="default" (click)="onRemoveSelected()">Remove Selected</button>
        <ag-grid-angular
        #agGrid
        style="width: 100%; height: 600px;"
        id="myGrid"
        rowSelection='multiple'
        [rowData]="rowData"
        class="ag-theme-balham"
        [columnDefs]="columnDefs"
        [floatingFilter]="true"
        [enableFilter]="true"
        [enableSorting]="true"
        (gridReady)="onGridReady($event)"
        [pagination]="true"
        ></ag-grid-angular>
    </div>
    `
})
export class Binding2WebsocketComponent implements OnInit, OnDestroy {

    rowData: any[];

    columnDefs;

    gridApi;

    ws: WebSocket;

    host = "wss://kendoui-ws-demo.herokuapp.com/";

    constructor(private http: HttpClient, private msg: NzMessageService) {
        this.columnDefs = [
            {
                headerName: "UnitPrice",
                field: "UnitPrice",
                width: 150,
                filter: "agTextColumnFilter",
                suppressMenu: true,
                headerCheckboxSelection: true,
                // headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: "ProductName",
                field: "ProductName",
                width: 200,
                filter: "agNumberColumnFilter",
                suppressMenu: true
            },
            {
                headerName: "CreatedAt",
                field: "CreatedAt",
                width: 220
            },
        ];
    }


    ngOnInit() {
        if (typeof WebSocket === "undefined") {
            this.msg.error('Your Broswer not support for WebScoket');
            return;
        }
        this.ws = new (<any>window).WebSocket(this.host);
        this.ws.onopen = (ev) => {
            console.log(ev);
            let request = { type: "read" };

            this.send(request, result => {
                console.log(result);
                this.rowData = result.data;
            });
        }
    }


    clearDateFilter() {
        let dateFilterComponent = this.gridApi.getFilterInstance("date");
        dateFilterComponent.setModel(null);
        this.gridApi.onFilterChanged();
    }

    onGridReady(params) {
        this.gridApi = params.api;
        console.log(params)
    }


    create() {
        let request = {
            type: "create", data: [{
                UnitPrice: 0,
                ProductName: '',
            }]
        };
        this.ws.send(JSON.stringify(request));
    }

    onRemoveSelected() {
        let selectedData = this.gridApi.getSelectedRows();
        if (selectedData.length === 0) {
            return this.msg.warning('请选择记录！');
        }
        let request = {
            type: "update", data: selectedData
        };
        this.ws.send(JSON.stringify(request));
    }

    removeRow(items) {

        let prodIds = items.map(item => item.ProductID);
        let removeRows = [];
        for (let row of this.rowData) {
            if (prodIds.includes(row.ProductID)) {
                removeRows.push(row);
            }
        }
        let res = this.gridApi.updateRowData({ remove: removeRows });
        this.printResult(res);
    }

    addRow(newItem) {
        this.rowData.unshift(newItem);
        let res = this.gridApi.updateRowData({ add: [newItem], addIndex: 0 });
        this.printResult(res);
    }


    send(request, callback) {
        if (this.ws.readyState != 1) {
            alert("Socket was closed. Please reload the page.");
            return;
        }

        //Assign unique id to the request. Will use that to distinguish the response.
        request.id = `${Math.random().toString(16).substr(2)}${Math.random().toString(16).substr(2)}`;

        // assign it to a variable
        const lisenerHandler = e => {
            let result = JSON.parse(e.data);

            //Check if the response is for the current request
            if (result.id == request.id) {
                //Stop listening
                // this.ws.removeEventListener("message", lisenerHandler);

                //Invoke the callback with the result
                callback(result);
            } else {
                if (result.type === 'push-create' || result.type === 'create') {
                    if (result.type === 'push-create') {
                        this.msg.info('监听到 新增 记录');
                    }
                    this.addRow(result.data[0]);
                } else if (result.type === 'push-update' || result.type === 'update') {
                    if (result.type === 'push-update') {
                        this.msg.info('监听到 删除 记录');
                    }
                    this.removeRow(result.data);
                }
            }
        }
        //Listen to the "message" event to get server response
        this.ws.removeEventListener("message", lisenerHandler);
        this.ws.addEventListener("message", lisenerHandler);

        //Send the data to the server
        this.ws.send(JSON.stringify(request));
    }

    printResult(res) {
        console.log("---------------------------------------");
        if (res.add) {
            res.add.forEach(function (rowNode) {
                console.log("Added Row Node", rowNode);
            });
        }
        if (res.remove) {
            res.remove.forEach(function (rowNode) {
                console.log("Removed Row Node", rowNode);
            });
        }
        if (res.update) {
            res.update.forEach(function (rowNode) {
                console.log("Updated Row Node", rowNode);
            });
        }
    }

    openNewTab() {
        let url = `${location.protocol}//${location.host}/#/banding-socket`;
        window.open(url);
    }

    ngOnDestroy(): void {
        this.ws.close();
    }
}
