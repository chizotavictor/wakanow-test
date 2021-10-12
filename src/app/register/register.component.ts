import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FireserviceService } from '../fireservice.service';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private route: Router, private fireService: FireserviceService, private loaderService: LoaderService) {
  }
  
  ngOnInit(): void {
  }
  
  postCreateUser(form: NgForm) {
    if(!form.value.username) { return; }
    this.loaderService.isLoading.next(true);
    this.fireService.saveUserData(form.value)
      .then(() => {
        this.loaderService.isLoading.next(false);
        this.saveActiveUser(form.value);
        this.route.navigate(['/home']);
      })
      .catch((e) => {this.loaderService.isLoading.next(false), console.log(e)});
  }

  saveActiveUser(data: any) {
    localStorage.setItem('username', JSON.stringify(data.username));
  }
}
