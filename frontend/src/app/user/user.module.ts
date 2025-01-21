import { NgModule } from '@angular/core';
import { UserComponent } from './user.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserComponent],
  exports: [UserComponent],
  imports: [CommonModule, FormsModule] 
})
export class UserModule {}