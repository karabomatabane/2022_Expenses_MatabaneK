import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ExpenseAddComponent } from 'src/app/modals/expense-add/expense-add.component';
import { Expense } from 'src/app/_models/expense';
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

  constructor(private expenseService: ExpensesService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.loadExpenses();
  }

  loadExpenses() {
    this.expenseService.getExpenses().subscribe(expenses => {
      this.expenses = expenses;
    })
  };

  openAddModal() {
    const config = {
      class: 'modal-dialog-centered modal-lg'
    }
    this.bsModalRef = this.modalService.show(ExpenseAddComponent, config);
  }
}
