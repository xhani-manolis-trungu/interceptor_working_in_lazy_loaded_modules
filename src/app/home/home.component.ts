import { HttpClient } from '@angular/common/http';
import { Injector } from '@angular/core';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user$;

  constructor(private injector: Injector) {}

  ngOnInit() {
    const http = this.injector.get(HttpClient);
    this.user$ = http.get('https://jsonplaceholder.typicode.com/users/1');
  }
}
