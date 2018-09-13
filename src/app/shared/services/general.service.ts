import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class GeneralService {

    readonly rootUrl = 'http://localhost:8080';

    constructor(private http: HttpClient){
    }

    async get(requestMapping: string): Promise<any> {
        // define headers to allow access
        let httpHeaders = new HttpHeaders()
            .set("Access-Control-Allow-Origin", "*");
        // declare request response in await function (for asynchronous)
        let requestResponse = await this.http
            // GET request HTTP with complete URL
            .get<any>(this.rootUrl + requestMapping, {
                // use headers defined above
                headers: httpHeaders,
                // define response format in JSON
                responseType: 'json',
                // enable to use credentials/certificates
                withCredentials: true
            // transform to promise to be able asynchronous
            }).toPromise()
        // return request response
        console.log(requestResponse);
        return requestResponse;
    }

}