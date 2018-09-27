import { Component } from "@angular/core";

@Component({
    selector: 'my-app',
    templateUrl: 'app.component.html',
    styles: [
        `
        .bg-white{
            background:#fff;
        }
        .doc {
            position:relative;
            padding: 30px 20px 40px 40px!important;
            min-height: 700px;
         }
        `]
})
export class AppComponent {

}


