import { Component } from '@angular/core';
import { MainLayoutComponent } from '../../layouts/main-layout/main-layout.component';
import { Store } from '@ngrx/store';
import { Job, User } from '../../types/User';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../../environments/environment.development';
import axios from 'axios';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from '@angular/cdk/dialog';
import { CompanyOldJobsComponent } from '../../components/company-old-jobs/company-old-jobs.component';
import { JobServiceService } from '../../service/job-service.service';
import { LoaderComponent } from '../../components/loader/loader.component';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MainLayoutComponent,MatIconModule,DialogModule,CompanyOldJobsComponent,LoaderComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
    constructor(private store:Store<{user:{user:{user:User}}}>,private dialog:MatDialog,   private JobService:JobServiceService){}
    loading:boolean=true;
    openDialogs(){
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        width: '1000px',
        // closeOnNavigation:true,
        maxWidth:'1000px',
        position:{top:'20px'}
        // position:MatDialogConfig<{postion:'top'}>
        // data: {name: this.name, animal: this.animal}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        // console.log('The dialog was closed');
        // this.animal = result;
      });
  
    }
    user!:User;
    data!:Job[];

    fetchAllData(){

    }

    ngOnInit(): void {

          
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
          //Add 'implements OnInit' to the class.
          this.store.select(c=>c.user.user).subscribe(c=>{
            this.user = c.user
          })
          this.loading= false
    }

    
  }








  @Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: 'dialog-model.component.html',
    styleUrl:'dialog.component.css',
    imports:[MatIconModule,ReactiveFormsModule,MatDatepickerModule,ToastModule,MatDialogModule],
    standalone:true,
    viewProviders:[provideNativeDateAdapter(),MessageService]
  })
  export class DialogOverviewExampleDialog {
  
        loading!:boolean;
    
    constructor(
      private messageService: MessageService,
      public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
      private JobService:JobServiceService
      // @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {}
  
    jobForm = new FormGroup({
      job_title: new FormControl('',[Validators.required]),
      job_short: new FormControl('',[Validators.required]),
      job_desc: new FormControl('',[Validators.required]),
      job_skills: new FormControl('',[Validators.required]),
      job_poster: new FormControl(null,[Validators.required]),
      job_extend_date: new FormControl(new Date(),[Validators.required]),
    })
    image:string= 'https://images.unsplash.com/photo-1715966966827-25a227141ee9';
  
    onFileSelect(event: any) {
      const file = event.target.files[0];
      if (file) {
        this.jobForm.patchValue({
          job_poster: file
        });
        this.image = URL.createObjectURL(file);
        
        this.jobForm.get('job_poster')?.updateValueAndValidity();
      }
    }
  
  
  async onSubmitHandler(){
        try {
          this.loading = true
          console.log(this.jobForm.value);
          const {job_desc,job_extend_date,job_poster,job_short,job_skills,job_title}= this.jobForm.value;
              if(!job_desc ||!job_extend_date ||!job_poster || !job_short ||!job_skills || !job_title   ){
                
                return 
              }
  
              const date = new Date(job_extend_date);

const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

          const formData = new FormData()
  
          formData.append("title",job_title);
          // formData.append("job_skills",job_skills);
          formData.append("short_desc",job_short);
          formData.append("image",job_poster);
          formData.append("extend_date",formattedDate);
          formData.append("desc",job_desc);
          formData.append("skills",job_skills);
          
  
              const response = await axios.post(environment.backend_uri+"/jobs/add",formData,{
                headers:{
                  'Accept':'application/json',
                  'Authorization':'Bearer '+localStorage.getItem("token"),
                  // 'Content-Type':'multipart/form-data'
                }
              });
              const data = await response.data;
              this.JobService.FetchAllData();
              console.log(data);
              
  
  
          this.messageService.add({detail:data.msg,data:'Successful',closable:true,severity:'success'})
          // this.image= 'https://images.unsplash.com/photo-1715966966827-25a227141ee9';
        
           setTimeout(()=>{
            this.dialogRef.close();
           },2000)
          
        } catch (error:any) {
          this.messageService.add({detail:error.message||'Something Went Wrong',closable:true,severity:'error'})
          
        }finally{
          this.loading = false
        }
    
  }
    // closeDialogs(){
    //   this.dialog.closeAll();
    // }
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }