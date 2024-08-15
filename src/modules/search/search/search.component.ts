import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchComponent),
      multi: true,
    },
  ],
})
export class SearchComponent implements OnInit, ControlValueAccessor {
  @Input()
  placeholderString = 'Search Customer or phone number';

  @ViewChild('search', { static: true })
  search!: ElementRef<HTMLInputElement>;

  onChange: (value: string) => void = (value: string) => {};
  onTouched: () => void = () => {};
  disabled = false;
  constructor() {}

  writeValue(value: string): void {
    this.search.nativeElement.value = value;
  }
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnInit(): void {}
}
