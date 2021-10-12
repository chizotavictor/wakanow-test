import { Injectable } from '@angular/core';
import { initializeApp } from '@firebase/app';
import { getDatabase, ref, set, get, child } from '@firebase/database';
import { environment } from 'src/environments/environment.prod';
import { Task } from 'src/models/task/task.mode';
import { User } from 'src/models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class FireserviceService {
  dbHandler: any;
  
  constructor() {
    initializeApp(environment.firebaseConfig);
    this.dbHandler = getDatabase();
  }

  saveUserData(user: User) {
    return set(ref(this.dbHandler, user.username), user);
  }

  saveUserTaskData(task: Task) {
    return set(ref(this.dbHandler, task.username), task);
  }

  getUserTaskData(username: string) {
    const dbRef = ref(this.dbHandler);
    return get(child(dbRef, username));
  }
}
