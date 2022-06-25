import { DatePipe } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
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
  editForm: FormGroup;
  formattedDate: string;
  
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any){
    if(this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private expenseService: ExpensesService, private toastr: ToastrService, private route: ActivatedRoute,
    private fb: FormBuilder, public datePipe: DatePipe) { 
  }

  ngOnInit(): void {
    this.loadExpense();
  }


  initialiseForm() {
    this.editForm = this.fb.group({
    date: [this.formattedDate, Validators.required],
    description: [this.expense.description, Validators.required],
    amount: [this.expense.amount, [Validators.required, Validators.min(1)]]
    
  })
  console.log("date: " + this.formattedDate)
}

  loadExpense() {
    let currentExpenseId = JSON.parse(localStorage.getItem('currentExpense'))?.id;
    this.expenseService.getExpense(currentExpenseId).subscribe(expense => {
      this.expense = expense;
      this.formattedDate = this.datePipe.transform((this.expense.date), 'dd-MMM-yyyy');
      this.initialiseForm();
    })
  }
  
  updateExpense() {
    this.expenseService.updateExpense(this.expense.id, this.editForm.value).subscribe(() => {
      this.toastr.success('Expense updated successfully');
      this.loadExpense();
      this.editForm.reset(this.expense)
    })    
  }
}
