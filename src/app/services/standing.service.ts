import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StandingService {

  constructor(private http: HttpClient) { }

  getStanding(competitionId: number, matchDay: number) {
    return this.http.get(environment.apiUrl + 'standings');
  }
}
