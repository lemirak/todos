import { Component } from '@angular/core';

interface Todo {
    id: string;
    text: string;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'todos';
    public todos: Todo[] = [];
    public currentTextValue = '';
    public currentTodoEdit: Todo | undefined;

    public addTodo(text: string): void {
        const newTodo = {
            id: this.generateUniqueId(),
            text: text
        }
        this.todos.push(newTodo);
    }

    public removeTodo(todo: Todo): void {
        const index = this.todos.indexOf(todo);
        if (index !== -1) {
            this.todos.splice(index, 1);
        }
    }

    public saveCurrentTodo(todo: Todo): void {
        todo.text = this.currentTodoEdit?.text as string;
        this.stopEdit();
    }

    public stopEdit(): void {
        this.currentTodoEdit = undefined;
    }

    public editTodo(todo: Todo): void {
        this.currentTodoEdit = todo;
    }

    private generateUniqueId(): string {
        const timestamp = Date.now().toString(36);
        const randomString = Math.random().toString(36).substring(2, 15);
        return `${timestamp}-${randomString}`;
    }


}
