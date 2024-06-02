import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { octMarkGithub,octMail } from '@ng-icons/octicons';
import {iconoirInstagram} from '@ng-icons/iconoir'

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink,NgIconComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  viewProviders:[provideIcons({
    octMarkGithub,
    octMail,
    iconoirInstagram
  })]
})
export class FooterComponent {
      year = new Date().getFullYear()
}
