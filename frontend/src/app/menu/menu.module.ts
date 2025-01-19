import { NgModule } from '@angular/core';
import { MenuComponent } from './menu.components';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [MenuComponent],
  exports: [MenuComponent],
  imports: [CommonModule] 
})
export class MenuModule {}