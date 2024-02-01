import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../todos.component';

@Component({
    selector: 'app-todo-item',
    templateUrl: './todo-item.component.html',
    styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent {
    @Input() todo: Todo | undefined;
    @Input() editing = false;

    @Output() editClicked: EventEmitter<Todo> = new EventEmitter<Todo>();
    @Output() removeClicked: EventEmitter<Todo> = new EventEmitter<Todo>();
    @Output() saveClicked: EventEmitter<Todo> = new EventEmitter<Todo>();
    @Output() editCancelled: EventEmitter<void> = new EventEmitter<void>();

    public editModelValue: string = '';

    onEditClicked(todo?: Todo): void {
        if (todo) {
            this.editModelValue = todo.text;
            this.editClicked.emit(todo);
            this.editing = true;
        }
    }

    onSaveClicked(todo?: Todo): void {
        if (todo) {
            todo.text = this.editModelValue;
            this.saveClicked.emit(todo);
            this.editing = false;
        }
    }

    onRemoveClicked(todo?: Todo): void {
         if (todo) {
            this.removeClicked.emit(todo);
            this.editing = false;
        }
    }

    onEditCancelled(): void {
        this.editClicked.emit();
        this.editing = false;
    }
}
