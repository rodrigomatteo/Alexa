import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Alexa';
  status = '';
  connected = false;

  constructor(
    private commonService: CommonService
  ) { }

  ngOnInit(){
    //this.commonService.testWebApiConnection().subscribe(res => this.movies = res);
    this.commonService.testWebApiConnection()
    .pipe(catchError(this.handleError))
    .subscribe(
      (res: any) => {
        console.log('Connection was ok, server is online');
        this.status = 'Connection was ok, server is online';
        this.connected = true;
      },
      err => {this.status = err;}
    )
;
  }

  private handleError(error: HttpErrorResponse) {
    //console.error(`Backend returned message ${error.message} `);
    // return an observable with a user-facing error message
    return throwError(` The server is NOT online: ${error.message} `);
  };

}
