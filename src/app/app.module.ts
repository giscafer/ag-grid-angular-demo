import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
// ag-grid
import { AgGridModule } from "ag-grid-angular/main";
// zorro
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
// application
import { AppComponent } from "./app.component";
// rich grid
import { RichGridComponent } from "./rich-grid-example/rich-grid.component";
import { DateComponent } from "./components/date-component/date.component";
import { HeaderComponent } from "./components/header-component/header.component";
import { HeaderGroupComponent } from "./components/header-group-component/header-group.component";
import { AppRoutingModule } from "./app.routing";

/** 配置 angular i18n **/
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
registerLocaleData(zh);


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        // custom component
        /*   AgGridModule.withComponents(
              [
                  DateComponent,
                  HeaderComponent,
                  HeaderGroupComponent
              ]
          ), */
        AgGridModule.withComponents([]),
        AppRoutingModule,
        /** 导入 ng-zorro-antd 模块 **/
        NgZorroAntdModule,
        RouterModule
    ],
    declarations: [
        AppComponent,
        DateComponent,
        HeaderComponent,
        HeaderGroupComponent
    ],
    providers: [{ provide: NZ_I18N, useValue: zh_CN }],
    bootstrap: [AppComponent]
})
export class AppModule {
}
