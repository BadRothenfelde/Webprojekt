import { NgModule } from '@angular/core';
import { MenuComponent } from './menu.components';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MenuComponent],
  exports: [MenuComponent],
  imports: [CommonModule, FormsModule] 
})
export class MenuModule {}