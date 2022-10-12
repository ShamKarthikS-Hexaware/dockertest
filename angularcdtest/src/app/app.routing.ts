import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { AddHumanComponent } from "./human/add-human/add-human.component";
import { EditHumanComponent } from "./human/edit-human/edit-human.component";
import { ListHumanComponent } from "./human/list-human/list-human.component";

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: '',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
        { path: 'add-human', component: AddHumanComponent },
        { path: 'edit-human/:id', component: EditHumanComponent },
        { path: 'list-human', component: ListHumanComponent },
    ]
  }
];
