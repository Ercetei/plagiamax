import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';

@Injectable()
export class BaseService {

    public readonly rootUrl = 'http://localhost:8080';
    public noAuthHeaders = new HttpHeaders().set('No-Auth', 'True');
    public allowAccessHeaders = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
    public textHeaders = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    constructor(public http: HttpClient) {

    }

    async get(requestMapping: string): Promise<any> {
        // // define headers to allow access
        // let httpHeaders = new HttpHeaders()
        //     .set("Access-Control-Allow-Origin", "*");
        // declare request response in await function (for asynchronous)
        let requestResponse = await this.http
            // GET request HTTP with complete URL
            .get<any>(this.rootUrl + requestMapping, {
                // use headers defined above
                // headers: httpHeaders,
                // define response format in JSON
                responseType: 'json',
                // enable to use credentials/certificates
                withCredentials: true
            // transform to promise to be able asynchronous
            }).toPromise()
        // return request response
        return requestResponse;
    }

    async patch(requestMapping: string, object: any): Promise<any> {
        // // define headers to allow access
        // let httpHeaders = new HttpHeaders()
        //     .set("Access-Control-Allow-Origin", "*");
        // declare request response in await function (for asynchronous)
        let requestResponse = await this.http
            // GET request HTTP with complete URL
            .patch<any>(this.rootUrl + requestMapping, object, {
                // use headers defined above
                // headers: httpHeaders,
                // define response format in JSON
                responseType: 'json',
                // enable to use credentials/certificates
                withCredentials: true
            // transform to promise to be able asynchronous
            }).toPromise()
        // return request response
        return requestResponse;
    }

}
