import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ExpenseEditComponent } from 'src/app/modals/expense-edit/expense-edit.component';
import { Expense } from 'src/app/_models/expense';
import { ExpensesService } from 'src/app/_services/expenses.service';

@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.component.html',
  styleUrls: ['./expense-detail.component.css']
})
export class ExpenseDetailComponent implements OnInit {
  expense: Expense;
  bsModalRef :BsModalRef;

  constructor(private expenseService: ExpensesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadExpense();
  }

  ngOnDestroy() {
    this.expenseService.expense = this.expense;
  }

  loadExpense() {
    this.expenseService.getExpense(parseInt(this.route.snapshot.paramMap.get('id'))).subscribe(expense => {
      this.expense = expense;
      localStorage.setItem('currentExpense', JSON.stringify(this.expense));
    })
  }
}
