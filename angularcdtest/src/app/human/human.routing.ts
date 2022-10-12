import { Routes } from "@angular/router";

import { AddHumanComponent } from "./add-human/add-human.component";
import { EditHumanComponent } from "./edit-human/edit-human.component";
import { ListHumanComponent } from "./list-human/list-human.component";

export const HumanRoutes: Routes = [
  { path: "add-human", component: AddHumanComponent },
  { path: "edit-human/:id", component: EditHumanComponent },
  { path: "list-human", component: ListHumanComponent },
];
