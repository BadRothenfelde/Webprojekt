import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from "./landing/landingpage.component"
import { AboutComponent } from "./about/about.component"
import { ImprintComponent} from "./imprint/imprint.component"
import { MenuComponent } from './menu/menu.components';
import { AllergyComponent } from './allergy/allergy.component';
import { AdministrationComponent } from './administration/administration.component';
import { AdministrationModule } from './administration/administration.module';
import { MenuModule } from './menu/menu.module';
import { ReservationComponent } from './reservation/reservation.component';
import { GallerieComponent } from './gallerie/gallerie.component';


export const routes: Routes = [
    {path: "home", component: LandingComponent },
    {path: "about", component: AboutComponent },
    {path: "imprint", component: ImprintComponent },
    {path: "menu", component: MenuComponent},
    {path: "gallerie", component: GallerieComponent},
    {path: "allergy", component: AllergyComponent },
    {path: "reservation", component: ReservationComponent},
    {path: "administration", component: AdministrationComponent },
    {path: "", redirectTo: "/home", pathMatch: "full" }
];

@NgModule({
    imports: [AdministrationModule, MenuModule, RouterModule. forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
