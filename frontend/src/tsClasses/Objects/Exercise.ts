import { Parameter } from '../GeneralTableClasses/Parameter';

export class Exercise {
  parameters: Map<string, Parameter>;

  constructor(parameters: Parameter[]) {
    this.parameters = new Map();
    /*for (const p of parameters) {
      this.parameters.set(p.technicalName, p);
    }*/
  }

  getParameter(label: string): Parameter | undefined {
    return this.parameters.get(label);
  }

  getAllParameters(): Parameter[] {
    return Array.from(this.parameters.values());
  }
}