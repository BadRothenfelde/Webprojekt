import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from "./landing/landingpage.component"
import { AboutComponent } from "./about/about.component"
import { ImprintComponent} from "./imprint/imprint.component"
import { MenuComponent } from './menu/menu.components';
import { AllergyComponent } from './allergy/allergy.component';
import { ReservationComponent } from './reservation/reservation.component';
import { GallerieComponent } from './gallerie/gallerie.component';


export const routes: Routes = [
    {path: "home", component: LandingComponent },
    {path: "about", component: AboutComponent },
    {path: "imprint", component: ImprintComponent },
    {path: "menu", component: MenuComponent},
    {path: "reservation", component: ReservationComponent },
    {path: "gallerie", component: GallerieComponent},
    {path: "allergy", component: AllergyComponent},
    {path: "", redirectTo: "/home", pathMatch: "full" },
];

@NgModule({
    imports: [RouterModule. forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModuke { }
