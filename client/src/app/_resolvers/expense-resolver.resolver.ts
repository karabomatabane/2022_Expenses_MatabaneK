import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Expense } from '../_models/expense';
import { ExpensesService } from '../_services/expenses.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseResolverResolver implements Resolve<Expense> {
  constructor(private expenseService: ExpensesService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Expense> {
    return this.expenseService.getExpense(parseInt(route.paramMap.get('id')));
  }
}
