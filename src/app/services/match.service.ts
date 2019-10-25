import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private http: HttpClient) { }

  getMatchDay(competitionId: number, matchDay: number) {
    return this.http.get(environment.apiUrl + 'matches');
  }
}
