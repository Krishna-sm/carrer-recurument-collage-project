import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ApplicationComponent } from './pages/application/application.component';
import { ApplyComponent } from './pages/apply/apply.component';
import { CompanyProfileComponent } from './pages/company-profile/company-profile.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
    {
        path:'',
        title:'Home Page',
        component:HomePageComponent
    },
    {
        path:'login',
        title:'Login Page',
        component:LoginPageComponent
    },
    {
        path:'register',
        title:'Register Page',
        component:RegisterPageComponent
    },
    {
        path:'application/:slug',
        title:'Application',
        component:ApplicationComponent
    },
    {
        path:'application/:slug/apply',
        title:'Apply',
        component:ApplyComponent
    },
    {
        path:'company/:profile',
        title:'Company',
        component:CompanyProfileComponent
    },
    {
        path:'profile',
        title:'Profile',
        component:ProfileComponent
    },
    {
        path:'**',
        title:'Oops!',
        component:ErrorPageComponent
    }
];
