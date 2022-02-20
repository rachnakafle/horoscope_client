import { Component, OnInit } from '@angular/core';
import { HoroscopeService } from '../services/horoscope.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'monthly-eng',
  templateUrl: './eng.component.html',
  styleUrls: ['./eng.component.css'],
})
export class EngMonthlyComponent implements OnInit {
  baseUrl = environment.baseUrl;
  loader: boolean = false;
  selected_date!: Date;
  currentEnglishDate!: Date;
  currentNepaliDate!: Date;
  allMonthly: any;
  currentUser!: string;
  myLanguage!: string;
  myHoroscope!: any;
  isHoroscopeSelected!: boolean;

  constructor(private _horoscope: HoroscopeService, public _router: Router) {
    let token = this._horoscope.getToken();
    this.currentUser = this._horoscope.getUserByToken(token);
  }

  ngOnInit(): void {
    this.getMonthly('Monthly');
  }

  getMonthly(freq: string) {
    let mytestMonthly: any;
    this.loader = true;
    let data = {
      username: this.currentUser,
      frequency: freq,
    };
    this._horoscope.getHoroscope(data).subscribe({
      next: (x: any) => {
        console.log(x);
        this.isHoroscopeSelected = x.isHoroscopeSelected;
        this.selected_date = x.currentDate;

        //if horoscope is selected
        mytestMonthly = x.myHoroscope;
        this.myHoroscope = false;
        if(mytestMonthly !==null){
          this.myHoroscope = mytestMonthly.myMonthlyNepaliHoroscope;
        }

        this.myLanguage = x.selectedLanguageCode;
        //  this.currentEnglishDate = x.currentNepaliDateDetails.english_month_name;
        //  this.currentNepaliDate = x.monthlyNepaliHoroscopes[0].horoscopeMonthNameNepali;
        if (this.myLanguage === 'en') {
          this.allMonthly = x.monthlyEnglishHoroscopes;
          this.currentEnglishDate =
            x.currentNepaliDateDetails.english_month_name;
        } else {
          this.allMonthly = x.monthlyNepaliHoroscopes;
          this.currentNepaliDate = x.currentNepaliDateDetails.nepali_month_name;
        }

        this.loader = false;
        console.log(this.allMonthly);
      },
      error: (e: any) => {
        console.log(e);
        this.loader = false;
      },
      complete: () => {},
    });
  }
}
