import { Parameter } from './Parameter';

export class DropdownParameter extends Parameter {
  value: string;
  options: string[];

  constructor(technicalName: string, displayName: string, value: string, options: string[]) {
    super(technicalName, displayName);
    this.value = value;
    this.options = options;
  }

  getDisplayValue(): string {
    return this.value;
  }

  renderEditField(onChange: (newVal: string) => void): HTMLElement {
    const select = document.createElement('select');
    this.options.forEach(option => {
      const opt = document.createElement('option');
      opt.value = option;
      opt.text = option;
      if (option === this.value) opt.selected = true;
      select.appendChild(opt);
    });
    select.onchange = () => onChange(select.value);
    return select;
  }
}
