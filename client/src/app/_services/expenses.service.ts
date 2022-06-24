import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Expense } from '../_models/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  baseUrl = environment.apiUrl;
  public expense: Expense;

  constructor(private http: HttpClient) { }

  getExpenses() {
    return this.http.get<Expense[]>(this.baseUrl + 'expenses')
  }

  getExpense(id: number) {
    return this.http.get<Expense>(this.baseUrl + 'expenses/' + id)
  }

  updateExpense(id, expense: Expense) {
    return this.http.put(this.baseUrl + 'expenses/' + id, expense);
  }

  addExpense(expense: Expense) {
    console.log(expense)
    return this.http.post<Expense>(this.baseUrl + 'expenses/', expense);
  }

  deleteExpense(id: number)
  {
    return this.http.delete<Expense>(this.baseUrl + 'expenses/' + id);
  }
}
