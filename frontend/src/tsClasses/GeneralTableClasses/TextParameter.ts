import { Parameter } from './Parameter';

export class TextParameter extends Parameter {
  value: string;

  constructor(technicalName: string, displayName: string, value: string) {
    super(technicalName, displayName);
    this.value = value;
  }

  getDisplayValue(): string {
    return this.value;
  }

  renderEditField(onChange: (newVal: string) => void): HTMLElement {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = this.value;
    input.oninput = () => onChange(input.value);
    return input;
  }
}