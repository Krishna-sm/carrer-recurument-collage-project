import { Component, HostListener } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon'
import { Store } from '@ngrx/store';
import { User } from '../../types/User';
import { removeUser } from '../../ngrx/actions/user.actions';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule,RouterLink,MatIconModule, MatMenuModule,ToastModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {


  user:User|null=null;

  constructor(private store:Store<{user:{user:{user:User}}}>,private messageService: MessageService,private router:Router){}
    ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
          this.store.select((c)=>c.user.user).subscribe((c)=>{
              if(c){

                this.user = c.user;
              }

          })

          
    }


    logoutHandler(){
          try {
            this.store.dispatch(removeUser());
            // console.log("success,",this.user);
            this.user =null;
            localStorage.removeItem("token");
            this.messageService.add({closable:true,data:'success',detail:'Logout Success',severity:'success'})
                // this.router.navigateByUrl("/")
          } catch (error:any) {
            this.messageService.add({closable:true,data:'Error',severity:'error',detail:error.message||'something went wrong'})
            
          }

    }

  headerWhite =false;
      @HostListener('window:scroll',[])
      onWindowScroll(){
        const threshold = 20; // Change the threshold value based on your needs
    const isScrolled = window.scrollY > threshold;
    this.headerWhite = isScrolled;
      }

}
