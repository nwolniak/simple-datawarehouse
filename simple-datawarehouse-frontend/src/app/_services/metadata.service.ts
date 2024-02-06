import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "@environments/environment";
import {Observable} from "rxjs";
import {Metadata} from "@app/_models";

@Injectable({
  providedIn: 'root'
})
export class MetadataService {

  constructor(private http: HttpClient) {
  }

  getMetadata(): Observable<Metadata> {
    return this.http.get<Metadata>(`${environment.metadataUrl}`)
  }

}
