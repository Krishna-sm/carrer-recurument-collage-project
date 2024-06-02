import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import axios from 'axios';
import { environment } from '../../../environments/environment.development';
import { SinglePost } from '../../types/public';
import { LoaderComponent } from '../../components/loader/loader.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-apply',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,LoaderComponent],
  templateUrl: './apply.component.html',
  styleUrl: './apply.component.css'
})
export class ApplyComponent {
  slug!:string;
  loading:boolean =false;
  data!:SinglePost;
  constructor( private route:ActivatedRoute,private title:Title,private messageService:MessageService){
    
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

      application_form = new FormGroup({
        name:new FormControl<string>('',[Validators.required]),
        email:new FormControl<string>('',[Validators.required,Validators.email]),
        resume:new FormControl<any>(null,[Validators.required]),
        bio:new FormControl<string>('',[Validators.required]),
  });

  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.application_form.patchValue({
        resume: file
      });
      this.application_form.get('resume')?.updateValueAndValidity();
    }
  }


async submitForm(){

  this.loading = true;
    try {
      
  const { bio,email,name,resume }  = this.application_form.value

          if(!bio || !email || !name || !resume){
            return
          }

      const formdata = new FormData();

      formdata.append("name",name);
      formdata.append("bio",bio);
      formdata.append("email",email);
      formdata.append("resume",resume);
      formdata.append("job_id",this.data.id);



  const response = await axios.post(environment.backend_uri+"/public/apply-job",formdata,{
    headers:{
      'Accept':'application/json',
          'Authorization':'Bearer '+localStorage.getItem("token"),
    }
  });
  const data = await response.data;
    this.messageService.add({
      summary:'success',
      closable:true,
      severity:'success',
      detail:data.msg
    })
  
  
  this.application_form.reset()
    } 

  catch (error:any) {
    this.messageService.add({detail:error.message||'Something Went Wrong',closable:true,severity:'error'})
    
  }finally{
    this.loading = false
  }
  
}

    ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
          this.route.params.subscribe((c)=>{
            this.slug= c['slug']
          })

          this.fetchSinglePost(this.slug)
    }
}
