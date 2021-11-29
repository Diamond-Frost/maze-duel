import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { MazeComponent } from './maze/maze.component';

const routes: Routes = [
  {path: 'maze', component: MazeComponent, children: [
    {path: '**', component: MazeComponent}
  ]},
  {path: '', component: IndexComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
