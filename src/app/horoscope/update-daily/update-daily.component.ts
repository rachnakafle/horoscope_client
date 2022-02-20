import { Component, OnInit } from '@angular/core';
import { HoroscopeService } from '../services/horoscope.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import 'jquery';

@Component({
  selector: 'app-update-daily',
  templateUrl: './update-daily.component.html',
  styleUrls: ['./update-daily.component.css'],
})
export class UpdateDailyComponent implements OnInit {
  baseUrl = environment.baseUrl;
  loader: boolean = false;
  selected_date!: Date;
  isHoroscopeSelected!: boolean;
  currentEnglishDate!: Date;
  currentNepaliDate!:Date;
  alldaily: any;
  currentUser!: string;
  myLanguage!: string;
  myHoroscope!: string;
  languageCode: any;
  allHoros: any; //displays every horoscope in select  
  userName: any;
  horoscopeId: any;
  
  editHorosForm = new FormGroup({
    selectedHoroscope: new FormControl(''),
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
    this.getAllHoros();
  }

  // For UpdateDaily
  getDaily(freq: string) {
    this.loader = true;
    let data = {
      username: this.currentUser,
      frequency: freq,
    };
    // console.log(data);
    this._horoscope.getHoroscope(data).subscribe({
      next: (x: any) => {
        console.log(x);
        this.isHoroscopeSelected = x.isHoroscopeSelected;       
        this.alldaily = x.dailyHoroscopes;
        this.selected_date = x.currentDate;
        this.myHoroscope = x.myHoroscope;
        this.myLanguage = x.selectedLanguageCode;
        this.horoscopeId = x.selectedHoroscopeId;
        this.currentEnglishDate = x.currentNepaliDateDetails.english_long_date;
        this.currentNepaliDate = x.currentNepaliDateDetails.nepali_long_date;
        this.loader = false;
        console.log(this.currentNepaliDate);
        console.log(this.currentEnglishDate);        
        console.log(this.horoscopeId);
        console.log(this.myLanguage);
        // To bind with settings's form
        this.editHorosForm.setValue({
          selectedHoroscope: this.horoscopeId,
          languageCode: this.myLanguage,
        });
      },
      error: (e: any) => {
        console.log(e);
      },
      complete: () => {},
    });
  }

  // To get User's HoroscopeList
  getAllHoros() {
    let temp: any;
    this._horoscope.getAllHorosList().subscribe({
      next: (x: any) => {
        temp = x;
      },
      error(e: any) {
        console.log('Error:' + e);
      },
      complete: () => {
        this.allHoros = temp;
      },
    });
  }

  onSubmit() {
    let data = {
      userName: this.currentUser,
      horoscopeId: this.editHorosForm.value.selectedHoroscope,
      languageCode: this.editHorosForm.value.languageCode,
    };
    console.log(data);
    this._horoscope.updateHoroscope(data).subscribe({
      next: (x: any) => {
        console.log(x);
      },
      error: (e: any) => {
        console.log('Error:' + e);
      },
      complete: () => {
        console.log(data);
        (<any>$('.modal')).modal('hide');
      },
    });
  }
}