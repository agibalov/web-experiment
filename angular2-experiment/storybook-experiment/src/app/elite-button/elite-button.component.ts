import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-elite-button',
  templateUrl: './elite-button.component.html',
  styleUrls: ['./elite-button.component.scss']
})
export class EliteButtonComponent {
  @Input() text: String = 'default text';
  @Output() click: EventEmitter<any> = new EventEmitter<any>();
}
