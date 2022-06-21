import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Expenses';
  expenses: any;
  users: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getExpenses();
  }

  getExpenses() {
    this.http.get('https://localhost:5001/api/expenses').subscribe(response => {
      this.expenses = response;
    }, error => {
      console.log(error);
    }); 
  }
}
