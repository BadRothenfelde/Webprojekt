import { NgModule } from '@angular/core';
import { AdministrationComponent } from './administration.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AdministrationComponent],
  exports: [AdministrationComponent],
  imports: [CommonModule] 
})
export class AdministrationModule {}