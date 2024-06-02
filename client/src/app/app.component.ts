import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import axios from 'axios';
import { environment } from '../environments/environment.development';
import { filter } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from './types/User';
import { setUser } from './ngrx/actions/user.actions';
import { PublicService } from './service/public.service';
import { LoaderComponent } from './components/loader/loader.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,FooterComponent,ToastModule,LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[MessageService]
})
export class AppComponent implements OnInit {
  constructor(private route:Router,private store:Store<{user:{user:User}}>){}
  title = 'My App';
     user!:User;
    isLoading = true;
    
    
    async fetchUser(token:string){
      

      try {
        this.isLoading = true
        const response = await axios.get(environment.backend_uri+"/auth/profile",{
          headers:{
            'Accept':'application/json',
            'Authorization':'Bearer '+token
          }
        })
        
  
        const data = await response.data;
        this.store.dispatch(setUser({user:data}));
        console.log(data);
      } catch (error) {
            localStorage.removeItem("token");
            this.route.navigateByUrl("/login");
          }finally{
            this.isLoading = false
          }
          
          
        }
        
        private  checkAndFetchUserData(): void {
          const token = localStorage.getItem("token") || '';
          
        
          if (token) {
            
            if(!this.user){

              this.fetchUser(token);
            }else{
              console.log(this.user);
              
              console.log("already in redux");
              
            }
      } else {
        this.isLoading = false;
      }
    }

    ngOnInit(): void {
      this.store.select((c)=>c.user).subscribe((c)=>{
        this.user = c.user
     })
      this.checkAndFetchUserData();
  
      // Subscribe to router events to listen for URL changes
      // console.log(event)
      this.route.events.pipe(
        filter(event => event instanceof NavigationEnd)
        
      ).subscribe(() => {
        this.checkAndFetchUserData();
      });
    }
  
  // ngOnInit(): void {

  //         const token = localStorage.getItem("token") || '';

  //         if(token){
  //           // const response 
  //        this.fetchUser(token);
        
  //         }else{
  //           this.isLoading = false
  //         }

  // }


}
