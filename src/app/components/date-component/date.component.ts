import { Component, OnDestroy } from "@angular/core";
import { IDateParams } from "ag-grid/main";
import { IDateAngularComp } from "ag-grid-angular/main";


@Component({
    selector: 'ag-full-width-grid',
    templateUrl: 'date.component.html',
    styleUrls: ['date.component.css'],
})
export class DateComponent implements OnDestroy {
    date: Date;
    params: IDateParams;
    public dd = '';
    public mm = '';
    public yyyy = '';

    ngOnDestroy() {
        console.log(`Destroying DateComponent`);
    }

    onResetDate() {
        this.dd = '';
        this.mm = '';
        this.yyyy = '';
        this.date = null;
        this.params.onDateChanged();
    }

    onDateChanged(on: string, newValue: string) {
        this.date = this.parseDate(
            on === 'dd' ? newValue : this.dd,
            on === 'mm' ? newValue : this.mm,
            on === 'yyyy' ? newValue : this.yyyy
        );
        this.params.onDateChanged();
    }

    getDate(): Date {
        return this.date;
    }

    setDate(date: Date): void {
        this.dd = date.getDate() + '';
        this.mm = (date.getMonth() + 1) + '';
        this.yyyy = date.getFullYear() + '';
        this.date = date;
        this.params.onDateChanged();
    }

    //*********************************************************************************
    //          INTERNAL LOGIC
    //*********************************************************************************

    parseDate(dd, mm, yyyy) {
        //If any of the three input date fields are empty, stop and return null
        if (dd.trim() === '' || mm.trim() === '' || yyyy.trim() === '') {
            return null;
        }

        let day = Number(dd);
        let month = Number(mm);
        let year = Number(yyyy);

        let date = new Date(year, month - 1, day);

        //If the date is not valid
        if (isNaN(date.getTime())) {
            return null;
        }

        //Given that new Date takes any garbage in, it is possible for the user to specify a new Date
        //like this (-1, 35, 1) and it will return a valid javascript date. In this example, it will
        //return Sat Dec 01    1 00:00:00 GMT+0000 (GMT) - Go figure...
        //To ensure that we are not letting non sensical dates to go through we check that the resultant
        //javascript date parts (month, year and day) match the given date fields provided as parameters.
        //If the javascript date parts don't match the provided fields, we assume that the input is non
        //sensical... ie: Day=-1 or month=14, if this is the case, we return null
        //This also protects us from non sensical dates like dd=31, mm=2 of any year
        if (date.getDate() !== day || date.getMonth() + 1 !== month || date.getFullYear() !== year) {
            return null;
        }

        return date;
    }
}
