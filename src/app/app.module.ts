/** 配置 angular i18n **/
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import zh from '@angular/common/locales/zh';
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
// ag-grid
import { AgGridModule } from "ag-grid-angular/main";
// zorro
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
// apollo & graphql
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
// application
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routing";
import { DateComponent } from "./components/date-component/date.component";
import { HeaderComponent } from "./components/header-component/header.component";
import { HeaderGroupComponent } from "./components/header-group-component/header-group.component";

registerLocaleData(zh);


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        HttpLinkModule,
        ApolloModule,
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
    constructor(apollo: Apollo, httpLink: HttpLink) {
        apollo.create({
            // By default, this client will send queries to the
            // `/graphql` endpoint on the same host
            link: httpLink.create({ uri: 'https://www.graphqlhub.com/graphql' }),
            cache: new InMemoryCache(),
        });
    }
}
