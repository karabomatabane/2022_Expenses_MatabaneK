import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Expense } from '../_models/expense';
import { PaginatedResult } from '../_models/pagination';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  baseUrl = environment.apiUrl;
  public expense: Expense;
  paginatedResult: PaginatedResult<Expense[]> = new PaginatedResult<Expense[]>();

  constructor(private http: HttpClient) { }

  getExpenses(pageNumber: number, pageSize: number, filter: boolean) {
    let params = getPaginationHeaders(pageNumber, pageSize);

    params = params.append('filter', filter);

    return getPaginatedResult<Partial<Expense[]>>(this.baseUrl + 'expenses', params, this.http);
  }

  getExpense(id: number) {
    return this.http.get<Expense>(this.baseUrl + 'expenses/' + id)
  }

  updateExpense(id, expense: Expense) {
    console.log(expense);
    return this.http.put(this.baseUrl + 'expenses/' + id, expense);
  }

  addExpense(expense: Expense) {
    return this.http.post<Expense>(this.baseUrl + 'expenses/', expense);
  }

  deleteExpense(id: number) {
    return this.http.delete<Expense>(this.baseUrl + 'expenses/' + id);
  }
}
