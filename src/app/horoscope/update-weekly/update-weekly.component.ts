import { Component, OnInit } from '@angular/core';
import { HoroscopeService } from '../services/horoscope.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-weekly',
  templateUrl: './update-weekly.component.html',
  styleUrls: ['./update-weekly.component.css'],
})
export class UpdateWeeklyComponent implements OnInit {
  
  baseUrl = environment.baseUrl;
  loader: boolean = false;
  selected_date!: Date;
  allWeekly: any;
  currentUser!:string;
  myLanguage!:string;
  myHoroscope!:string;

  constructor(
    private _horoscope: HoroscopeService,
    public _router: Router
  ) {
    let token = this._horoscope.getToken();
    this.currentUser = this._horoscope.getUserByToken(token);
  }

  ngOnInit(): void {
    this.getDaily('Weekly');
  }
 
  getDaily(freq:string) {
    this.loader = true;
    let data = {
      username: this.currentUser,
      frequency: freq,
    }
    this._horoscope.getHoroscope(data).subscribe({
      next:(x:any) => {
        console.log(x);
        this.allWeekly = x.weeklyHoroscopes;
        this.selected_date = x.currentDate;
        this.myHoroscope = x.myHoroscope;
        this.myLanguage = x.selectedLanguageCode;
        this.loader = false;
        console.log(this.allWeekly);
      },
      error:(e:any) => {
        console.log(e);
        this.loader = false;
      },
      complete:() => { },
    });
    
  }

  
}