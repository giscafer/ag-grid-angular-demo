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
                padding: 30px 20px 40px 40px!important;
         }
        `]
})
export class AppComponent {
    data = [{
        id: 'rich-grid',
        title: 'Rich Grid',
    },
    {
        id: 'schema',
        title: 'Schema',
    }];
}

