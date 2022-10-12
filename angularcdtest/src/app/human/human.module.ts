import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

import { AddHumanComponent } from "./add-human/add-human.component";
import { EditHumanComponent } from "./edit-human/edit-human.component";
import { ListHumanComponent } from "./list-human/list-human.component";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HumanRoutes } from "./human.routing";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(HumanRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [AddHumanComponent, EditHumanComponent, ListHumanComponent],
})
export class HumanModule {}
