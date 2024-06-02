import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { octCalendar } from '@ng-icons/octicons';
import {  matWorkOutline} from '@ng-icons/material-icons/outline';
import { ActivatedRoute, Route, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Title } from '@angular/platform-browser';

import axios from 'axios';
import { environment } from '../../../environments/environment.development';
import { SinglePost } from '../../types/public';
import moment from 'moment';
import { LoaderComponent } from '../../components/loader/loader.component';
import { User } from '../../types/User';
import { Store } from '@ngrx/store';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-application',
  standalone: true,
  imports: [NgIconComponent,RouterLink,LoaderComponent,MatIconModule],
  templateUrl: './application.component.html',
  styleUrl: './application.component.css',
  viewProviders:[provideIcons({
    octCalendar,
    matWorkOutline
  })]
})
export class ApplicationComponent {
  slug!:string;
  loading:boolean=false;
  data!:SinglePost;
  user!:User;

  constructor( private store:Store<{user:{user:{user:User}}}> ,  private route:ActivatedRoute,private title:Title,private navigate:Router){
    
  }


  convertDate(date:string){
    const new_d= new Date(date);
    return moment(new_d).format('LL'); 
  }

  async fetchSinglePost(slug:string){
        try {
          this.loading = true;
              const response = await axios.get(environment.backend_uri+"/public/get-jobs/"+slug);
              const data = await response.data;

              // console.log(data);
              this.data = data.job;
              

              
        } catch (error:any) {
              console.log(error.message);
              
        }finally{
          this.loading = false
        }
  }

  navigateToLogin(){
    this.navigate.navigateByUrl("/login");
  }
 

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.route.params.subscribe((c)=>{
      this.slug = c['slug'];
      this.title.setTitle(`${this.slug.replaceAll('-',' ')}`)
    })

    this.store.select(c=>c.user.user).subscribe(c=>{
        this.user = c.user;
    })


    this.fetchSinglePost(this.slug);
  }

}
