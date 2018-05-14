import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomeComponent } from './home/home.component';
import { PlayerComponent } from './player/player.component';
import { MobileComponent } from './mobile/mobile.component';



const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'visualize',
    component: PlayerComponent
  },
    {
      path: 'mobile',
      component: MobileComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
