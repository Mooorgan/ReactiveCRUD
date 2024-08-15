import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { KeyValue } from '@angular/common';
import { ValidationErrors } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-input-error',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './input-error-component.html',
  styleUrls: ['./input-error.component.scss'],
})
export class InputErrorComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  constructor(private cdr: ChangeDetectorRef) {}

  #errorNotifySubj = new BehaviorSubject<ValidationErrors | null>(null);
  #errorNotify$ = this.#errorNotifySubj.asObservable();
  @Input()
  errors: ValidationErrors | undefined | null = null;

  ngOnInit(): void {
    this.#errorNotify$
      .pipe(takeUntil(this.destroy$), filter(Boolean))
      .subscribe((error) => {
        //
        this.errors = error;
        this.cdr.markForCheck();
      });
  }

  sendErrorNotification(error: ValidationErrors) {
    //
    this.#errorNotifySubj.next(error);
  }

  trackByFn(index: number, item: KeyValue<string, any>) {
    return item.key;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
