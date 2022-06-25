import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {PaginationModule} from 'ngx-bootstrap/pagination'



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot()
  ],
  exports: [
    BsDropdownModule,
    ToastrModule,
    ModalModule,
    BsDatepickerModule,
    PaginationModule
  ]
})
export class SharedModule { }
