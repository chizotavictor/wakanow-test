import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FireserviceService } from 'src/app/fireservice.service';
import { LoaderService } from 'src/app/loader.service';

@Component({
  selector: 'add-task',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {

  currentUsername: string;

  constructor(private fireService: FireserviceService, private loaderService: LoaderService) { 
    this.currentUsername = this.getUsername();
  }

  ngOnInit(): void {
  }

  submitTask(form: NgForm) {
    if(!form.value.username) { return; }
    this.loaderService.isLoading.next(true);
    this.fireService.saveUserData(form.value)
      .then(() => {
        this.loaderService.isLoading.next(false);
        form.resetForm(), this.currentUsername = this.getUsername();
      })
      .catch((e) => {this.loaderService.isLoading.next(false), console.log(e)});
  }

  getUsername() {
    let username = localStorage.getItem("username") || "";
    if(!username) { this.currentUsername = "Guest!"}
    return JSON.parse(username);
  }
}
