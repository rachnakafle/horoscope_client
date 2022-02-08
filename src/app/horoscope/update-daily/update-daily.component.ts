import { Component, OnInit } from '@angular/core';
import { HoroscopeService } from '../services/horoscope.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-daily',
  templateUrl: './update-daily.component.html',
  styleUrls: ['./update-daily.component.css'],
})
export class UpdateDailyComponent implements OnInit {
  baseUrl = environment.baseUrl;
  loader: boolean = false;
  selected_date!: Date;
  alldaily: any;
  currentUser!: string;
  myLanguage!: string;
  myHoroscope!: string;
  languageCode: any;
  horoscopeId!: number;
  language: any;
  horoscope: any;

  editHorosForm = new FormGroup({
    horoscopeId: new FormControl(''),
    languageCode: new FormControl(''),
  });

  navTabs = [
    {
      text: 'Daily',
      path: '/horoscope',
    },
    {
      text: 'Weekly',
      path: '/horoscope/update-weekly',
    },
    {
      text: 'Monthly',
      path: '/horoscope/update-monthly',
    },
    {
      text: 'Yearly',
      path: '/horoscope/update-yearly',
    },
  ];

  constructor(private _horoscope: HoroscopeService, public _router: Router) {
    let token = this._horoscope.getToken();
    this.currentUser = this._horoscope.getUserByToken(token);
  }

  ngOnInit(): void {
    this.getDaily('Daily');
    this.onSubmit();
  }

  //To get User's Selected Horoscope
  onSelectHoroscope(e: any) {
    this.myHoroscope = e.target.value;
    console.log(this.myHoroscope);
    this.getDaily(this.myHoroscope);
  }

  // To get User's selected language
  onSelectLanguage(e: any): void {
    this.myLanguage = e.target.value;
    console.log(this.myLanguage);
    this.getDaily(this.myLanguage);
  }

  getDaily(freq: string) {
    this.loader = true;
    let data = {
      username: this.currentUser,
      frequency: freq,
    };
    // console.log(data);

    this._horoscope.getHoroscope(data).subscribe({
      next: (x: any) => {
        // console.log(x);
        this.alldaily = x.dailyHoroscopes;
        this.selected_date = x.currentDate;
        this.myHoroscope = x.myHoroscope;
        this.myLanguage = x.selectedLanguageCode;
        this.loader = false;
        // console.log(this.alldaily);
      },
      error: (e: any) => {
        // console.log(e);
        this.loader = false;
      },
      complete: () => {},
    });
  }

  onSubmit() {
    let submitdata = {
      username: this.currentUser,
      languageCode: this.languageCode,
      horoscopeId: this.horoscopeId,
    };
    console.log(submitdata);

    this._horoscope.updateHoroscope(submitdata).subscribe({
      next: (x: any) => {
        this.language = x.languageCode;
        this.horoscope = x.horoscopeId;
      },
      error: (e: any) => {
        console.log('Error:' + e);
      },
      complete: () => {},
    });
  }
}
