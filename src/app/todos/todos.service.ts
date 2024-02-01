import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Todo } from './todos.component';

@Injectable({
    providedIn: 'root'
})
export class TodosService {
    todos: Todo[] = [
        {id: '1', text: 'Stored Todo 1'},
        {id: '2', text: 'Stored Todo 2'},
        {id: '3', text: 'Stored Todo 3'},
    ];

    constructor() {
    }

    getTodos(): Observable<Todo[]> {
        return of(this.todos);
    }

    create(text: string): void {
        const newTodo = {
            id: this.generateUniqueId(),
            text: text
        }
        this.todos.push(newTodo);
    }

    update(id: string, updatedText: string): void {
        const result = this.todos.find(todo => todo.id === id);
        if (result) {
            result.text = updatedText
        }
    }

    delete(todo: Todo): void {
       const index = this.todos.indexOf(todo);
        if (index !== -1) {
            this.todos.splice(index, 1);
        }
    }

    generateUniqueId(): string {
        const timestamp = Date.now().toString(36);
        const randomString = Math.random().toString(36).substring(2, 15);
        return `${timestamp}-${randomString}`;
    }
}
