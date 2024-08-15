import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { ButtonsModule } from '../buttons/buttons.module';

@NgModule({
  declarations: [NavigationComponent],
  imports: [CommonModule, ButtonsModule],
  exports: [NavigationComponent],
})
export class NavigationBarModule {}
