import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RichGridComponent } from './rich-grid-example/rich-grid.component';
import { BuiltInFilterComponent } from './filter/built-in-filter.component';
import { AgGridModule } from 'ag-grid-angular';
import { FilterApiComponent } from './filter/filter-api.component';
import { FloatingFilterComponent } from './filter/filter-floating.component';
import { CellStylesComponent } from './styles/cell-styles.component';
import { RowStylesComponent } from './styles/row-styles.component';
import { TreeDataComponent } from './enterprise/tree-data.component';
import { MasterDetailComponent } from './enterprise/master-detail.component';
import { ColumnGroupComponent } from './basic/column-group.component';
import { CommonModule } from '@angular/common';
import { RTLComplexComponent } from './basic/rtl-complex.component';
import { CellRenderingComponent } from './styles/cell-rendering.component';
import { PinnedColumnComponent } from './basic/pinned-column.components';
import { HighlightingComponent } from './styles/highlighting.component';

const routes: Routes = [
    { path: 'pinned-column', component: PinnedColumnComponent },
    { path: 'column-group', component: ColumnGroupComponent },
    { path: 'rtl-complex', component: RTLComplexComponent },
    { path: 'filter-floating', component: FloatingFilterComponent },
    { path: 'filter-builtin', component: BuiltInFilterComponent },
    { path: 'filter-api', component: FilterApiComponent },

    { path: 'cell-styles', component: CellStylesComponent },
    { path: 'row-styles', component: RowStylesComponent },
    { path: 'cell-rendering', component: CellRenderingComponent },
    { path: 'highlight', component: HighlightingComponent },
    // enterprise
    { path: 'tree-data', component: TreeDataComponent },
    { path: 'master-detail', component: MasterDetailComponent },
    { path: 'rich-grid', component: RichGridComponent },

    { path: '**', pathMatch: 'full', redirectTo: 'rich-grid' }
];

export const appRouting = RouterModule.forRoot(routes);

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        appRouting,
        AgGridModule.withComponents([]),
    ],
    declarations: [
        ColumnGroupComponent,
        BuiltInFilterComponent,
        FloatingFilterComponent,
        FilterApiComponent,
        CellStylesComponent,
        RowStylesComponent,
        TreeDataComponent,
        MasterDetailComponent,
        RichGridComponent,
        RTLComplexComponent,
        CellRenderingComponent,
        PinnedColumnComponent,
        HighlightingComponent,
    ]
})
export class AppRoutingModule { }


