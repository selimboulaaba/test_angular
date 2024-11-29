import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enfant } from '../models/Enfant';

@Injectable({
  providedIn: 'root'
})
export class EnfantsService {
  private url_children = 'https://webserver.staging.4indata.fr/api/users/asidikidemo/childs/'
  private url_child = "https://webserver.staging.4indata.fr/api/childs/"

  constructor(private http: HttpClient) { }

  getEnfants(): Observable<Enfant[]> {
    return this.http.get<Enfant[]>(`${this.url_children}`);
  }

  getEnfant(id: number): Observable<Enfant> {
    return this.http.get<Enfant>(`${this.url_child+id}`);
  }

  updateEnfant(profile: any): Observable<Enfant> {
    console.log(profile)
    const formData = new FormData();
    formData.append('parent', profile.id.toString());
    formData.append('first_name', profile.first_name);
    formData.append('last_name', profile.last_name);
    formData.append('birthday', profile.birthday);
    formData.append('gender', profile.gender);

    return this.http.put<Enfant>(`${this.url_child+profile.id}/`, formData);
  }

}
