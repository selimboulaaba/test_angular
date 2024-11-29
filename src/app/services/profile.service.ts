import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from '../models/Profile';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl = 'https://webserver.staging.4indata.fr/api/users/asidikidemo/'

  constructor(private http: HttpClient) { }

  getProfile(): Observable<Profile> {
    return this.http.get<Profile>(`${this.baseUrl}`);
  }

  updateProfile(profile: Profile): Observable<Profile> {
    return this.http.put<Profile>(`${this.baseUrl}`, profile);
  }
}
