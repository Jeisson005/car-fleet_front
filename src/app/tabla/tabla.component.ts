import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface Column {
  id: string;
  name: string;
}

export interface Option {
  icon: string;
  btn: string;
  name: string;
}

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent {
  @Input() columns: Column[] = [];
  @Input() data: any[] = [];
  @Input() options: Option[] = [];

  @Output() optionClick = new EventEmitter<{ optionName: string, element: any }>();

  onOptionClick(option: Option, element: any): void {
    this.optionClick.emit({ optionName: option.name, element });
  }

}
