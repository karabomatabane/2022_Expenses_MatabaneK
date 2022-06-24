import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  addForm: FormGroup;


  constructor(public bsModalRef: BsModalRef, private expenseService: ExpensesService, 
    private fb: FormBuilder, private toastr: ToastrService, public decimalPipe: DecimalPipe, private router: Router) { }

  ngOnInit(): void {
    this.initialiseForm();
  }

  initialiseForm() {
      this.addForm = this.fb.group({
      date: [new Date, Validators.required],
      description: ['', Validators.required],
      amount: [this.decimalPipe.transform(0, '1.2-5'), [Validators.required, Validators.min(1)]]
    })
  }

  addExpense() {
     this.expenseService.addExpense(this.addForm.value).subscribe(response => {
      this.toastr.success('New expense added successfully');
      this.bsModalRef.hide();
      window.location.reload();
     }, error => {
      console.log(error);
     })
  }
}
