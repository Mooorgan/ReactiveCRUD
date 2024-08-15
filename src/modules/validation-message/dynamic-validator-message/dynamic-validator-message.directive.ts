import {
  ComponentRef,
  Directive,
  ElementRef,
  Input,
  OnInit,
  Optional,
  Self,
  ViewContainerRef,
} from '@angular/core';
import {
  ControlContainer,
  FormGroupDirective,
  NgControl,
  NgForm,
  NgModel,
} from '@angular/forms';
import { EMPTY, Subscription, defer, fromEvent, iif, merge } from 'rxjs';
import { skip, startWith } from 'rxjs/operators';
import { ErrorStateMatcher } from './error-state-matcher.service';
import { InputErrorComponent } from '../input-error/input-error.component';

@Directive({
  selector: '[appDynamicValidatorMessage]',
})
export class DynamicValidatorMessageDirective implements OnInit {
  ngControl!: NgControl | ControlContainer;
  parentContainer!: ControlContainer;
  constructor(
    @Self() @Optional() private trueNgControl: NgControl,
    @Optional() private controlContainer: ControlContainer,
    // @Self() private controlContainer: ControlContainer,
    private elementRef: ElementRef,
    private vcr: ViewContainerRef,
    private errorStateMatcherService: ErrorStateMatcher,
  ) {}

  // ngControl = inject(NgControl, { self: true, optional: true }) || inject(ControlContainer, { self: true });
  // elementRef = inject(ElementRef);
  get form() {
    return this.parentContainer?.formDirective as
      | NgForm
      | FormGroupDirective
      | null;
  }

  @Input()
  errorStateMatcher = this.errorStateMatcherService;

  @Input()
  container = this.vcr;

  private componentRef: ComponentRef<InputErrorComponent> | null = null;
  private errorMessageTrigger!: Subscription;
  // private parentContainer = inject(ControlContainer, { optional: true });

  ngOnInit() {
    this.parentContainer = this.controlContainer;
    this.ngControl = this.trueNgControl || this.controlContainer;
    this.parentContainer = this.controlContainer;
    queueMicrotask(() => {
      if (!this.ngControl.control)
        throw Error(`No control model for ${this.ngControl.name} control...`);
      this.errorMessageTrigger = merge(
        this.ngControl.control.statusChanges,
        fromEvent(this.elementRef.nativeElement, 'blur'),

        iif(
          () => !!this.form,
          defer(() => this.form!.ngSubmit),
          defer(() => EMPTY),
        ),
      )
        .pipe(
          startWith(this.ngControl.control.status),
          skip(this.ngControl instanceof NgModel ? 1 : 0),
        )
        .subscribe(() => {
          if (
            this.errorStateMatcher.isErrorVisible(
              this.ngControl.control,
              this.form,
            )
          ) {
            if (!this.componentRef) {
              this.componentRef =
                this.container.createComponent(InputErrorComponent);
              this.componentRef.changeDetectorRef.markForCheck();
            }
            if (this.ngControl.errors) {
              this.componentRef.instance.sendErrorNotification(
                this.ngControl.errors,
              );
            }
            // this.componentRef.instance.errors = this.ngControl.errors;
          } else {
            this.componentRef?.destroy();
            this.componentRef = null;
          }
        });
    });
  }
  ngOnDestroy() {
    this.errorMessageTrigger.unsubscribe();
  }
}
