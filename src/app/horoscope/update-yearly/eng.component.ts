import { Component, OnInit } from '@angular/core';
import { HoroscopeService } from '../services/horoscope.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-yearly-eng',
  templateUrl: './eng.component.html',
  styleUrls: ['./eng.component.css']
})
export class EngYearlyComponent implements OnInit {
  baseUrl = environment.baseUrl;
  loader: boolean = false;
  selected_date!: Date;
  allYearly: any;
  currentUser!:string;
  myLanguage!:string;
  myHoroscope!:string;
  isHoroscopeSelected!:boolean;
  currentYearEnglish!: Date
  currentYearNepali!:Date;

  constructor(
    private _horoscope: HoroscopeService,
    public _router: Router
  ) {
    let token = this._horoscope.getToken();
    this.currentUser = this._horoscope.getUserByToken(token);
  }

  ngOnInit(): void {
    this.getDaily('Yearly');
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
        this.isHoroscopeSelected = x.isHoroscopeSelected;
        this.allYearly = x.yearlyHoroscopes;
        this.selected_date = x.currentDate;
        this.myHoroscope = x.myHoroscope;
        this.myLanguage = x.selectedLanguageCode;
        this.currentYearEnglish = x.yearlyEnglishHoroscopes[0].horoscopeYearEnglish;
        this.currentYearNepali = x.yearlyNepaliHoroscopes[0].horoscopeYearNepali;
        this.loader = false;
        if(this.myLanguage === 'en'){
          this.allYearly = x.yearlyEnglishHoroscopes;
        }else{
          this.allYearly = x.yearlyNepaliHoroscopes;
        }
        console.log(this.allYearly);
      },
      error:(e:any) => {
        console.log(e);
        this.loader = false;
      },
      complete:() => { },
    });    
  }
}