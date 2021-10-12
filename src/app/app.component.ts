import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/models/user/user.model';
import { FireserviceService } from './fireservice.service';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'wakanow';
}
