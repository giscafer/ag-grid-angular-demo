import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RichGridComponent } from './rich-grid-example/rich-grid.component';

const routes: Routes = [
    { path: 'rich-grid', component: RichGridComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'rich-grid' }
];

export const appRouting = RouterModule.forRoot(routes);

@NgModule({
    imports: [
        RouterModule,
        appRouting,
    ],
    declarations: [
    ]
})
export class AppRoutingModule { }


