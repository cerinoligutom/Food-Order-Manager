import { NgModule } from "@angular/core";
import { ApolloModule, Apollo } from 'apollo-angular';
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        ApolloModule,
        HttpLinkModule
    ],
    exports: [
        BrowserModule,
        HttpClientModule,
        ApolloModule,
        HttpLinkModule
    ],
    providers: [ApolloModule]
})

export class GraphQlModule {
    constructor (
        apollo: Apollo,
        httpLink: HttpLink
    ){
        apollo.create({
            link: httpLink.create({ uri: 'http://192.168.1.34:3000/api'}),
            cache: new InMemoryCache()
        })
    }
}
