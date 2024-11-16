import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from "./landing/landingpage.component"
import { AboutComponent } from "./about/about.component"
import { ImprintComponent} from "./imprint/imprint.component"

export const routes: Routes = [
    {path: "home", component: LandingComponent },
    {path: "about", component: AboutComponent },
    {path: "imprint", component: ImprintComponent },
    {path: "", redirectTo: "/home", pathMatch: "full" }
];

@NgModule({
    imports: [RouterModule. forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModuke { }
