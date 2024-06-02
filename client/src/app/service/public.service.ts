import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import axios from 'axios';
import { Post } from '../types/public';
import { environment } from '../../environments/environment.development';
import { setJobs } from '../ngrx/actions/user.actions';
import { all_public_post } from '../ngrx/actions/public.actions';
@Injectable({
  providedIn: 'root'
})
export class PublicService {

  constructor(private store:Store<{public:{jobs:Post[]}}> ) {

   }



   async fetchAllJobs(){
      const response = await axios.get(environment.backend_uri+"/public/get-all-jobs",{
        headers:{
          'Accept':'application/json'
        }
      })

      const data = await response.data.job;

      // console.log(data);

        this.store.dispatch(all_public_post({jobs:data}));
      
   }

   async getUserProfile(id:string){
          const response = await axios.get(`${environment.backend_uri}/public/company-profile/${id}`,{
            headers:{
              'Accept':'application/json'
            }
          })
          const data = await response.data;

          return data;
   }


}
