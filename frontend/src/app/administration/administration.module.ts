import { NgModule } from '@angular/core';
import { AdministrationComponent } from './administration.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdministrationComponent],
  exports: [AdministrationComponent],
  imports: [CommonModule, FormsModule] 
})
export class AdministrationModule {}