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
  allMonthly: any;
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
    this.getMonthly('Monthly');
  }
 
  getMonthly(freq:string) {
    this.loader = true;
    let data = {
      username: this.currentUser,
      frequency: freq,
    }
    this._horoscope.getHoroscope(data).subscribe({
      next:(x:any) => {
        console.log(x);
        this.selected_date = x.currentDate;
        this.myHoroscope = x.myHoroscope;
        this.myLanguage = x.selectedLanguageCode;
        if(this.myLanguage === 'en'){
          this.allMonthly = x.monthlyEnglishHoroscopes;
        }else{
          this.allMonthly = x.monthlyNepaliHoroscopes;
        }
        
        this.loader = false;
        console.log(this.allMonthly);
      },
      error:(e:any) => {
        console.log(e);
        this.loader = false;
      },
      complete:() => { },
    });
    
  }

}
