import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from '../../types/User';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent implements OnInit, OnDestroy {
    // user:User|null=null;
    private userSubscription!: Subscription;
    loading:boolean = true;
    constructor(private route:Router,private store:Store<{user:{user:{user:User}}}>){}

    ngOnInit(): void {


      this.userSubscription = this.store.select((c)=>c.user.user).subscribe((c)=>{
        if(!c?.user){
          this.route.navigateByUrl("/");
          
        }else{
          this.loading = false
        }
      })

      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      
    }
    ngOnDestroy(): void {
      if (this.userSubscription) {
        this.userSubscription.unsubscribe();
      }
    }
  

}
