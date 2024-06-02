import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment.development';
import { Job } from '../types/User';
import { Store } from '@ngrx/store';
import { setJobs } from '../ngrx/actions/user.actions';
@Injectable({
  providedIn: 'root'
})
export class JobServiceService {

  constructor(private Store:Store<{jobs:{jobs:Job[]}}>) { 


  }

  async FetchAllData(){
      const response = await axios.get(environment.backend_uri+"/jobs/get",{
        headers:{
          'Accept':'application/json',
          'Authorization':'Bearer '+localStorage.getItem("token"),
        }
      });
      const data =await  response.data.jobs;
      console.log("fetch data----> ",data);
      
      this.Store.dispatch(setJobs({jobs:data}));
      // return data;
  }

  async DeleteJob(id:any){
    const response = await axios.delete(environment.backend_uri+"/jobs/delete/"+id,{
      headers:{
        'Accept':'application/json',
        'Authorization':'Bearer '+localStorage.getItem("token"),
      }
    });
    const data = response.data.msg;
    // await this.FetchAllData();
    return data;
  }
}
