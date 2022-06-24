import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private expenseService: ExpensesService, private route: ActivatedRoute, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.loadExpense();
  }

  loadExpense() {
    this.expenseService.getExpense(parseInt(this.route.snapshot.paramMap.get('id'))).subscribe(expense => {
      this.expense = expense;
      localStorage.setItem('currentExpense', JSON.stringify(this.expense));
    })
  }

  deleteExpense() {
    if (confirm("Are you sure you want to delete this expense?")) {
      this.expenseService.deleteExpense(parseInt(this.route.snapshot.paramMap.get('id'))).subscribe(response => {
        this.router.navigateByUrl('/expenses');
        this.toastr.success('Expense deleted successfully');
        //window.location.reload();
       }, error => {
        console.log(error);
       })
    }    
  }
}
