import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SubjectDestroyService } from '../services/subject-destroy/subject-destroy.service';
import { takeUntil, takeWhile, tap } from 'rxjs';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss'],
  providers: [SubjectDestroyService],
})
export class ProductSearchComponent implements OnInit {
  @Output()
  searchWords = new EventEmitter<string>();

  constructor(private destroy$: SubjectDestroyService) {}
  ngOnInit(): void {
    this.search.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        tap((word) => {
          this.searchWords.emit(word);
        })
      )
      .subscribe();
  }
  protected search = new FormControl<string>('', { nonNullable: true });
}
