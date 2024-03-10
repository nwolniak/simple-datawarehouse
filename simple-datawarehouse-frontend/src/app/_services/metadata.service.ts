import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "@environments/environment";
import {Observable} from "rxjs";
import {ConnectionParameters, Metadata} from "@app/_models";

@Injectable({
  providedIn: 'root'
})
export class MetadataService {

  constructor(private http: HttpClient) {
  }

  connectToDatabase(connectionParameters: ConnectionParameters): Observable<any> {
    return this.http.post(`${environment.dbConnectionUrl}`, connectionParameters);
  }

  getMetadata(): Observable<Metadata> {
    return this.http.get<Metadata>(`${environment.metadataUrl}`);
  }

}
