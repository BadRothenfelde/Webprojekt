import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from "./landing/landingpage.component"
import { AboutComponent } from "./about/about.component"
import { ImprintComponent} from "./imprint/imprint.component"
import { MenuComponent } from './menu/menu.components';
import { AllergyComponent } from './allergy/allergy.component';
import { AdministrationComponent } from './administration/administration.component';

export const routes: Routes = [
    {path: "home", component: LandingComponent },
    {path: "about", component: AboutComponent },
    {path: "imprint", component: ImprintComponent },
    {path: "menu", component: MenuComponent},
    {path: "allergy", component: AllergyComponent },
    {path: "administration", component: AdministrationComponent },
    {path: "", redirectTo: "/home", pathMatch: "full" }
];

@NgModule({
    imports: [RouterModule. forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModuke { }
