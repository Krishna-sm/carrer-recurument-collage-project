import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { JobServiceService } from '../../service/job-service.service';
import { MessageService } from 'primeng/api';
import { Job } from '../../types/User';
import { environment } from '../../../environments/environment.development';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-company-old-jobs',
  standalone: true,
  imports: [RouterLink,MatIconModule],
  templateUrl: './company-old-jobs.component.html',
  styleUrl: './company-old-jobs.component.css'
})
export class CompanyOldJobsComponent {
  constructor(private JobService:JobServiceService,private messageService:MessageService,private Store:Store<{jobs:{jobs:Job[]}}>){}
  all_jobs!:Job[];

  async fetchData(){
    try {



     await this.JobService.FetchAllData();
    // console.log(data);
    // this.all_jobs =data;
    
    } catch (error:any) {
  this.messageService.add({detail:error.message,data:'Error',closable:true,severity:'error'})
      
    }
  }
  backend_uri=environment.backend_uri_image
    ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      this.Store.select(c=>c.jobs).subscribe(c=>{
        console.log(c);
        
          this.all_jobs = c.jobs;
      })
      this.fetchData();
    }

   async deleteJob(id:number){
    try {
      const data= await this.JobService.DeleteJob(id);
      this.fetchData();
    // console.log(data);
    // this.all_jobs =data;
  this.messageService.add({detail:data,data:'Success',closable:true,severity:'success'})

    
    } catch (error:any) {
  this.messageService.add({detail:error.message,data:'Error',closable:true,severity:'error'})
      
    }
    }

    arr= new Array(10).fill({name:'dad'})
}
