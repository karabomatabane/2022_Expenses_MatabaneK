import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ExpenseAddComponent } from 'src/app/modals/expense-add/expense-add.component';
import { Expense } from 'src/app/_models/expense';
import { Pagination } from 'src/app/_models/pagination';
import { ExpensesService } from 'src/app/_services/expenses.service';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {
  expenses: Expense[];
  expense: Expense;
  bsModalRef: BsModalRef;
  pagination: Pagination;
  pageNumber = 1;
  pageSize = 10;
  filter = false;
  total = 0;
  totalfilter = false;

  constructor(private expenseService: ExpensesService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.loadExpenses();
  }

  loadExpenses() {
    this.expenseService.getExpenses(this.pageNumber, this.pageSize, this.filter).subscribe(response => {
      this.expenses = response.result;
      this.pagination = response.pagination;
      this.totalfilter = this.filter;
      this.total = 0;
      this.expenses.forEach(expense => {
        this.total += expense.amount;
        console.log(expense.amount);
      });
    })
  };

  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.loadExpenses();
  }

  openAddModal() {
    const config = {
      class: 'modal-dialog-centered modal-lg'
    }
    this.bsModalRef = this.modalService.show(ExpenseAddComponent, config);
  }
}
