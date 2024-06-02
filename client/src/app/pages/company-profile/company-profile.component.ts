import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { v5 } from 'uuid';
import { MainLayoutComponent } from '../../layouts/main-layout/main-layout.component';
import { Store } from '@ngrx/store';
import { User } from '../../types/User';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { PublicService } from '../../service/public.service';
import { CompanyProfile, Post } from '../../types/public';
import { LoaderComponent } from '../../components/loader/loader.component';
import { environment } from '../../../environments/environment.development';
@Component({
  selector: 'app-company-profile',
  standalone: true,
  imports: [RouterLink,MatIconModule,MainLayoutComponent,ToastModule,LoaderComponent],
  templateUrl: './company-profile.component.html',
  styleUrl: './company-profile.component.css',
  providers:[MessageService]
})
export class CompanyProfileComponent implements OnInit {
      profile!:CompanyProfile;
      posts:Post[]=[]; 
      // slug!:string; 
      user!:User;
      loading=true;
      arr = new Array(9).fill({id:new Date().getTime(),slug:v5.DNS})
      backend_uri = environment.backend_uri_image
    
  constructor(private titleService:Title,private route:ActivatedRoute,private store:Store<{user:{user:{user:User}}}>,private messageService:MessageService,private publicService:PublicService){
  
  }


  follow(){
        this.messageService.add({detail:'Comapany Followed',summary:'Success',severity:'success',closable:true})
  }

  
     async fetchUserProfile(id:string){
            try {
                              const data = await this.publicService.getUserProfile(id);
                              this.profile =data.user;
                              this.posts =data.jobs;
              this.titleService.setTitle(`Company | ${this.profile.name}`);


                              console.log({data});
                              
            } catch (error:any) {
                        this.messageService.add({summary:error.message,data:'Error','severity':'error'});
            }finally{
                  this.loading =false
            }
      }

  

        ngOnInit(): void {



            
              
              this.store.select((c)=>c.user.user).subscribe((c)=>{
                      // console.log(c);
                    
                        this.user = c.user;
                    })
                  //   this.openDialogs()



                    this.route.params.subscribe((c)=>{
                        //   this.slug = c['profile'];
                          this.fetchUserProfile(c['profile']);
              this.titleService.setTitle(`Company | ${c['profile']}`);
          })
          //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
          //Add 'implements OnInit' to the class.
          
        }
}   


