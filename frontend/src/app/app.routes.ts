import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from "./landing/landingpage.component";
import { AboutComponent } from "./about/about.component";
import { ImprintComponent } from "./imprint/imprint.component";
import { MenuComponent } from './menu/menu.components';
import { AllergyComponent } from './allergy/allergy.component';
import { SitzplanComponent } from './reservation/sitzplan.component';
import { CommonModule } from '@angular/common';   
import { FormsModule } from '@angular/forms';     
import { HttpClientModule } from '@angular/common/http';
import { SitzplanModul } from './reservation/sitzplan.component';

// Neue Route hinzugefügt
export const routes: Routes = [
    { path: "home", component: LandingComponent },
    { path: "about", component: AboutComponent },
    { path: "imprint", component: ImprintComponent },
    { path: "menu", component: MenuComponent },
    { path: "reservation", component: SitzplanComponent },
    { path: "allergy", component: AllergyComponent },
    { path: "", redirectTo: "/home", pathMatch: "full" }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes), 
        CommonModule,   
        HttpClientModule,             
        FormsModule,  
        SitzplanModul              
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
