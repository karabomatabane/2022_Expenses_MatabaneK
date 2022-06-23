import { Component, EventEmitter, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Expense } from 'src/app/_models/expense';
import { User } from 'src/app/_models/user';
import { ExpensesService } from 'src/app/_services/expenses.service';

@Component({
  selector: 'app-expense-edit',
  templateUrl: './expense-edit.component.html',
  styleUrls: ['./expense-edit.component.css']
})
export class ExpenseEditComponent implements OnInit {
  expense: Expense;
  id: number;
  @ViewChild('editForm') editForm: NgForm;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any){
    if(this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private expenseService: ExpensesService, private toastr: ToastrService, private route: ActivatedRoute) { 
  }

  ngOnInit(): void {
    this.loadExpense();
  }

  loadExpense() {
    let currentExpenseId = JSON.parse(localStorage.getItem('currentExpense'))?.id;
    this.expenseService.getExpense(currentExpenseId).subscribe(expense => {
      this.expense = expense;
    })
  }
  
  updateExpense() {
    this.expenseService.updateExpense(this.expense.id, this.expense).subscribe(() => {
      this.toastr.success('Expense updated successfully');
      console.log(this.expense)
      this.editForm.reset(this.expense)
    })    
  }
}
