import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Draggable} from "@app/_models";

@Injectable({
  providedIn: 'root'
})
export class DragDropService {

  private draggedItemSubject = new BehaviorSubject<Draggable | null>(null);
  draggedItem$ = this.draggedItemSubject.asObservable();

  selfDropEventHappened: boolean = false;
  wasDroppedSuccessfully: boolean = false;

  startDragging(item: Draggable) {
    this.draggedItemSubject.next(item);
  }

  getDraggedItem(): Draggable | null {
    return this.draggedItemSubject.value;
  }

  clear() {
    this.selfDropEventHappened = false;
    this.wasDroppedSuccessfully = false;
    this.draggedItemSubject.next(null);
  }

  setSelfDropEventHappened() {
    this.selfDropEventHappened = true;
  }

  setWasDroppedSuccessfully() {
    this.wasDroppedSuccessfully = true;
  }
}
