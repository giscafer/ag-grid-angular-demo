import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GraphQLService, HackerNewsItem } from './graphql.service';

@Component({
    selector: 'binding-graphql',
    template: `
    <div>
        <h3>Data Binding to GraphQL Service</h3>
        <p>graphql service use https://github.com/clayallsopp/graphqlhub</p>
        <ag-grid-angular
        #agGrid
        style="width: 100%; height: 600px;"
        id="myGrid"
        [(rowData)]="rowData"
        class="ag-theme-balham"
        [columnDefs]="columnDefs"
        [floatingFilter]="true"
        [enableFilter]="true"
        [enableSorting]="true"
        (gridReady)="onGridReady($event)"
        [pagination]="true"
        ></ag-grid-angular>
    </div>
    `,
    viewProviders: [GraphQLService]
})
export class Binding2GraphqlComponent implements OnInit {

    rowData: HackerNewsItem[];

    columnDefs;

    gridApi;

    constructor(
        private http: HttpClient,
        private graphqlSrv: GraphQLService,
    ) {
        this.columnDefs = [
            {
                headerName: "ID",
                field: "id",
                width: 150,
                filter: "agTextColumnFilter",
                suppressMenu: true,
                headerCheckboxSelection: true,
                // headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: "Type",
                field: "type",
                width: 90,
                filter: "agTextColumnFilter",
                suppressMenu: true
            },
            {
                headerName: "Title",
                field: "title",
                width: 280,
                filter: "agTextColumnFilter",
                suppressMenu: true
            },
            {
                headerName: "Score",
                field: "score",
                width: 90,
                filter: "agNumberColumnFilter",
                suppressMenu: true
            },
            {
                headerName: "Date",
                field: "timeISO",
                width: 165,
                filter: "agDateColumnFilter",
                filterParams: {
                    comparator: function (filterLocalDateAtMidnight, cellValue) {
                        let dateAsString = cellValue;
                        if (dateAsString == null) return -1;
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
                },
                suppressMenu: true
            },
            {
                headerName: "Url",
                field: "url",
                width: 400,
                suppressMenu: true,
                filter: "agTextColumnFilter"
            }
        ];
    }


    ngOnInit() {

    }


    clearDateFilter() {
        let dateFilterComponent = this.gridApi.getFilterInstance("date");
        dateFilterComponent.setModel(null);
        this.gridApi.onFilterChanged();
    }

    onGridReady(params) {
        this.gridApi = params.api;

        /*  this.http
             .get("https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinners.json")
             .subscribe((data: any[]) => {
                 this.rowData = data;
             }); */

        this.graphqlSrv.qryTopStories().subscribe(data => {
            this.rowData = data;
        })
    }
}
