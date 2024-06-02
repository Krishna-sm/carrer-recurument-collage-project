import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon'
import {MatInputModule} from '@angular/material/input'
import {MatFormFieldModule} from '@angular/material/form-field'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService  } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import axios from 'axios';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterLink,MatFormFieldModule, MatInputModule, MatIconModule,ReactiveFormsModule,ToastModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  loading = false
  constructor(private messageService: MessageService,private route:Router){}
      loginForm = new FormGroup({
        email:new FormControl('',[Validators.email,Validators.required]),
        password:new FormControl('',[Validators.required,Validators.minLength(5)]),
      })

    
  async submitForm(){
    try {
          this.loading = true
        const response = await axios.post(environment.backend_uri+"/auth/login",this.loginForm.value,{
          'headers':{
            'Accept':'application/json'
          }
        })

        const data = await response.data;
        if(!data){
           this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Some Error Occoured',closable:true });
           return
        }


            localStorage.setItem("token",data.token);
       
    this.loginForm.reset()
   await this.messageService.add({ severity: 'success', summary: 'Success', detail: data.msg,closable:true });
   
    this.route.navigateByUrl('/');
    } catch (error:any) {
      
    this.loginForm.reset()
    await this.messageService.add({ severity: 'error', summary: 'Error', detail: error.response.data.error || error.error || 'something went wrong',closable:true });
    }finally{
      this.loading = false
    }
  }

}