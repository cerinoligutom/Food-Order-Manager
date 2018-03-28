import { NgModule } from '@angular/core';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';

@NgModule({
  imports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ],
  exports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ],
  providers: [ApolloModule]
})
export class GraphQlModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink
  ) {
    const http = httpLink.create({
      uri: 'http://graphql-dev.fom.zeferinix.com/'
      // uri: 'http://192.168.1.22:3000/'
    });

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const auth = setContext(request => {
      console.log('request:', request);
      // get the authentication token from local storage if it exists
      const token = localStorage.getItem('token');
      // return the headers to the context so httpLink can read them
      // in this example we assume headers property exists
      // and it is an instance of HttpHeaders
      if (!token) {
        return {};
      } else {
        return {
          headers: headers.append('Authorization', `Bearer ${token}`)
        };
      }
    });

    apollo.create({
      link: auth.concat(http),
      cache: new InMemoryCache()
    });
  }
}
