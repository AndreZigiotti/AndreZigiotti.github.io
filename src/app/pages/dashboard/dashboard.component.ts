import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { StorageService } from '../../shared/services/storage/storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  todo = []
  done = []

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    let tasks = this.storageService.getItem('tasks')
    if(tasks) {
      const {todo, done} = JSON.parse(tasks)
      this.todo = todo
      this.done = done
    }
  }

  createTask() {
    this.todo.push(`Task ${this.todo.length + this.done.length + 1}`)
    this.saveTasks()
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }

    this.saveTasks()
  }

  saveTasks() {
    this.storageService.setItem('tasks', JSON.stringify({todo: this.todo, done: this.done}))
  }
}
