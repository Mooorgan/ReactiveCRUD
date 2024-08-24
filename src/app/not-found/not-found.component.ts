import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product/product.service';
import { SubjectDestroyService } from '../services/subject-destroy/subject-destroy.service';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  providers: [SubjectDestroyService],
})
export class NotFoundComponent implements OnInit {
  constructor(
    private products: ProductService,
    private destroy$: SubjectDestroyService
  ) {}
  ngOnInit(): void {}
}
