import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicValidatorMessageDirective } from './dynamic-validator-message/dynamic-validator-message.directive';
import { InputErrorComponent } from './input-error/input-error.component';
import { ErrorMessagePipe } from './error-message/error-message.pipe';



@NgModule({
  declarations: [
    DynamicValidatorMessageDirective,
    InputErrorComponent,
    ErrorMessagePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DynamicValidatorMessageDirective,
    InputErrorComponent,
    ErrorMessagePipe
  ]
})
export class ValidationMessageModule { }
