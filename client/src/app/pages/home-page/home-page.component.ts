import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { v5  } from 'uuid';
import { Post } from '../../types/public';
import { PublicService } from '../../service/public.service';
import { environment } from '../../../environments/environment.development';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ RouterLink,LoaderComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  constructor(private store:Store<{public:{jobs:Post[]}}>,private publicService:PublicService ){
  }
 
    arr!:Post[];
    loading:boolean = true;
    image_path = environment.backend_uri_image

    ngOnInit(): void {
      
      this.publicService.fetchAllJobs();
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      this.store.select((c)=>c.public).subscribe(c=>{
        console.log(c.jobs);
        this.loading = false
        this.arr = c.jobs;
      })
    }
    

}
