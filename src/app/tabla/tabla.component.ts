import { Component, EventEmitter, Input, Output, Pipe } from '@angular/core';

export interface Column {
  id: string;
  name: string;
  pipe?: string;
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

  shouldShowOption(option: Option, element: any): boolean {
    if (element.excludedOptions && Array.isArray(element.excludedOptions))
      return !element.excludedOptions.includes(option.name);
    return true;
  }

  isValidDatePipe(row: any, column: any): boolean {
    return row[column.id] instanceof Date && column.pipe;
  }

}
