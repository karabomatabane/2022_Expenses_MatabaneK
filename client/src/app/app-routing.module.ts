import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { ExpenseDetailComponent } from './expenses/expense-detail/expense-detail.component';
import { ExpenseListComponent } from './expenses/expense-list/expense-list.component';
import { HomeComponent } from './home/home.component';
import { ExpenseEditComponent } from './modals/expense-edit/expense-edit.component';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';
import { ExpenseResolverResolver } from './_resolvers/expense-resolver.resolver';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'expenses', component: ExpenseListComponent},
      {path: 'expenses/:id', component: ExpenseDetailComponent, resolve: {expense: ExpenseResolverResolver}},
      {path: 'expense/edit', component: ExpenseEditComponent, canDeactivate: [PreventUnsavedChangesGuard]},
    ]
  },
  {path: 'contact', component: ContactComponent},
  {path: 'disclaimer', component: DisclaimerComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {path: '**', component: NotFoundComponent, pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
