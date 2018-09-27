import { Component, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "ag-grid-enterprise";

@Component({
    selector: "my-app",
    template: `<div>
    <span class="button-group">
        <button (click)="irelandAndUk()">Ireland &amp; UK</button>
        <button (click)="endingStan()">Countries Ending 'stan'</button>
        <button (click)="setCountryModel()">Set Model ['Algeria','Argentina']</button>
        <button (click)="printCountryModel()">Print Country Model</button>
        <button (click)="clearCountryFilter()">Clear Country</button>
        <button (click)="destroyCountryFilter()">Destroy Country</button>
    </span>
    <br />
    <span class="button-group">
        <button (click)="ageBelow25()">Age Below 25</button>
        <button (click)="ageAbove30()">Age Above 30</button>
        <button (click)="ageBelow25OrAbove30()">Age Below 25 or Above 30</button>
        <button (click)="ageBetween25And30()">Age Between 25 and 30</button>
        <button (click)="clearAgeFilter()">Clear Age Filter</button>
    </span>
    <br />
    <span class="button-group">
        <button (click)="after2010()">Date after 01/01/2010</button>
        <button (click)="before2012()">Date before 01/01/2012</button>
        <button (click)="dateCombined()">Date combined</button>
        <button (click)="clearDateFilter()">Clear Date Filter</button>
    </span>
    <br />
    <span class="button-group">
        <button (click)="sportStartsWithS()">Sport starts with S</button>
        <button (click)="sportEndsWithG()">Sport ends with G</button>
        <button (click)="sportsCombined()">Sport starts with S and ends with G</button>
    </span>

</div>
<ag-grid-angular
    #agGrid
    style="width: 100%; height: 400px;"
    id="myGrid"
    [rowData]="rowData"
    class="ag-theme-balham"
    [columnDefs]="columnDefs"
    [enableFilter]="true"
    [enableSorting]="true"
    (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
`
})
export class FilterApiComponent {
    private gridApi;
    private gridColumnApi;
    private rowData: any[];

    private columnDefs;

    constructor(private http: HttpClient) {
        this.columnDefs = [
            {
                headerName: "Athlete",
                field: "athlete",
                width: 150,
                filter: "agSetColumnFilter"
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
                    }
                }
            },
            {
                headerName: "Sport",
                field: "sport",
                width: 110,
                filter: "agTextColumnFilter"
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

    irelandAndUk() {
        let countryFilterComponent = this.gridApi.getFilterInstance("country");
        countryFilterComponent.selectNothing();
        countryFilterComponent.selectValue("Ireland");
        countryFilterComponent.selectValue("Great Britain");
        this.gridApi.onFilterChanged();
    }

    clearCountryFilter() {
        let countryFilterComponent = this.gridApi.getFilterInstance("country");
        countryFilterComponent.selectEverything();
        this.gridApi.onFilterChanged();
    }

    destroyCountryFilter() {
        this.gridApi.destroyFilter("country");
    }

    endingStan() {
        let countryFilterComponent = this.gridApi.getFilterInstance("country");
        countryFilterComponent.selectNothing();
        for (let i = 0; i < countryFilterComponent.getUniqueValueCount(); i++) {
            let value = countryFilterComponent.getUniqueValue(i);
            let valueEndsWithStan = value.indexOf("stan") === value.length - 4;
            if (valueEndsWithStan) {
                countryFilterComponent.selectValue(value);
            }
        }
        this.gridApi.onFilterChanged();
    }

    setCountryModel() {
        let countryFilterComponent = this.gridApi.getFilterInstance("country");
        let model = ["Algeria", "Argentina"];
        countryFilterComponent.setModel(model);
        this.gridApi.onFilterChanged();
    }

    printCountryModel() {
        let countryFilterComponent = this.gridApi.getFilterInstance("country");
        let model = countryFilterComponent.getModel();
        if (model) {
            console.log("Country model is: [" + model.values.join(",") + "]");
        } else {
            console.log("Country model filter is not active");
        }
    }

    sportStartsWithS() {
        let sportsFilterComponent = this.gridApi.getFilterInstance("sport");
        sportsFilterComponent.setModel({
            type: "startsWith",
            filter: "s"
        });
        this.gridApi.onFilterChanged();
    }

    sportEndsWithG() {
        let sportsFilterComponent = this.gridApi.getFilterInstance("sport");
        sportsFilterComponent.setModel({
            type: "endsWith",
            filter: "g"
        });
        this.gridApi.onFilterChanged();
    }

    sportsCombined() {
        let sportsFilterComponent = this.gridApi.getFilterInstance("sport");
        sportsFilterComponent.setModel({
            condition2: {
                type: "endsWith",
                filter: "g"
            },
            condition1: {
                type: "startsWith",
                filter: "s"
            },
            operator: "AND"
        });
        this.gridApi.onFilterChanged();
    }

    ageBelow25() {
        let ageFilterComponent = this.gridApi.getFilterInstance("age");
        ageFilterComponent.setModel({
            type: "lessThan",
            filter: 25,
            filterTo: null
        });
        this.gridApi.onFilterChanged();
    }

    ageAbove30() {
        let ageFilterComponent = this.gridApi.getFilterInstance("age");
        ageFilterComponent.setModel({
            type: "greaterThan",
            filter: 30,
            filterTo: null
        });
        this.gridApi.onFilterChanged();
    }

    ageBelow25OrAbove30() {
        let ageFilterComponent = this.gridApi.getFilterInstance("age");
        ageFilterComponent.setModel({
            condition1: {
                type: "greaterThan",
                filter: 30,
                filterTo: null
            },
            operator: "OR",
            condition2: {
                type: "lessThan",
                filter: 25,
                filterTo: null
            }
        });
        this.gridApi.onFilterChanged();
    }

    ageBetween25And30() {
        let ageFilterComponent = this.gridApi.getFilterInstance("age");
        ageFilterComponent.setModel({
            type: "inRange",
            filter: 25,
            filterTo: 30
        });
        this.gridApi.onFilterChanged();
    }

    clearAgeFilter() {
        let ageFilterComponent = this.gridApi.getFilterInstance("age");
        ageFilterComponent.setModel(null);
        this.gridApi.onFilterChanged();
    }

    after2010() {
        let dateFilterComponent = this.gridApi.getFilterInstance("date");
        dateFilterComponent.setModel({
            type: "greaterThan",
            dateFrom: "2010-01-01",
            dateTo: null
        });
        this.gridApi.onFilterChanged();
    }

    before2012() {
        let dateFilterComponent = this.gridApi.getFilterInstance("date");
        dateFilterComponent.setModel({
            type: "lessThan",
            dateFrom: "2012-01-01",
            dateTo: null
        });
        this.gridApi.onFilterChanged();
    }

    dateCombined() {
        let dateFilterComponent = this.gridApi.getFilterInstance("date");
        dateFilterComponent.setModel({
            condition1: {
                type: "lessThan",
                dateFrom: "2012-01-01",
                dateTo: null
            },
            condition2: {
                type: "greaterThan",
                dateFrom: "2010-01-01",
                dateTo: null
            },
            operator: "OR"
        });
        this.gridApi.onFilterChanged();
    }

    clearDateFilter() {
        let dateFilterComponent = this.gridApi.getFilterInstance("date");
        dateFilterComponent.setModel(null);
        this.gridApi.onFilterChanged();
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
