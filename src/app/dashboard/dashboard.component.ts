import { Component, Input, OnInit } from '@angular/core';
import { FireserviceService } from '../fireservice.service';
import { LoaderService } from '../loader.service';
// import { AngularFireStore } from '@angular/fire/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentUsername: string;
  task: any;

  constructor(private fireService: FireserviceService, private loader: LoaderService) { 
    this.currentUsername = this.getUsername();
  }

  ngOnInit(): void {
    this.loader.isLoading.next(true);
    this.fireService.getUserTaskData(this.getUsername())
      .then((data) => {
        this.loader.isLoading.next(false);
        if(data.exists()) {
          this.task = data.val();
          console.log(data.val())
        } else {
          console.log("No data available.")
        }
      })
      .catch(() => this.loader.isLoading.next(false))
  }

  getUsername() {
    let username = localStorage.getItem("username") || "";
    if(!username) { this.currentUsername = "Guest!"}
    return JSON.parse(username);
  }


}
