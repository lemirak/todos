import { Component, OnInit } from '@angular/core';
import { TodosService } from './todos.service';
import { EMPTY, Observable } from 'rxjs';

export interface Todo {
    id: string;
    text: string;
}

@Component({
    selector: 'app-todos',
    templateUrl: './todos.component.html',
    styleUrl: './todos.component.scss'
})
export class TodosComponent implements OnInit {
    public todos$: Observable<Todo[]> = EMPTY;
    public currentTextValue = '';
    public currentTodoEdit: Todo | undefined;

    constructor(private todosService: TodosService) {
    }

    ngOnInit(): void {
        this.todos$ = this.todosService.getTodos();
    }

    public addTodo(text: string): void {
        this.todosService.create(text);
    }

    public removeTodo(todo: Todo): void {
        this.todosService.delete(todo);
    }

    public saveCurrentTodo(todo: Todo): void {
        this.todosService.update(todo.id, todo.text);
        this.stopEdit();
    }

    public stopEdit(): void {
        this.currentTodoEdit = undefined;
    }

    public editTodo(todo: Todo): void {
        this.currentTodoEdit = todo;
    }
}
