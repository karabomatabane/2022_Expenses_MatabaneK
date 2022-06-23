import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Expense } from 'src/app/_models/expense';
import { ExpensesService } from 'src/app/_services/expenses.service';

@Component({
  selector: 'app-expense-add',
  templateUrl: './expense-add.component.html',
  styleUrls: ['./expense-add.component.css']
})
export class ExpenseAddComponent implements OnInit {
  expense: Expense;
  addForm: FormGroup;


  constructor(public bsModalRef: BsModalRef, private expenseService: ExpensesService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initialiseForm();
  }

  initialiseForm() {
    this.addForm = new FormGroup({
      date: new FormControl(),
      description: new FormControl(),
      amount: new FormControl()
    })
  }

  addExpense() {
     this.expenseService.addExpense(this.addForm.value).subscribe(response => {
      this.toastr.success('New expense added successfully');
     }, error => {
      this.toastr.error('Something went wrong');
     })
     this.bsModalRef.hide();
     window.location.reload();
  }
}
