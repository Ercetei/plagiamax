import { HttpClient } from "@angular/common/http";

export class BaseService {

    protected readonly rootUrl = 'http://localhost:1234';
    protected http: HttpClient;

    constructor(){

    }
}