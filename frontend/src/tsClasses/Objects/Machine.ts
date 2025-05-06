import { Entity } from '../GeneralTableClasses/Entity';
import { Parameter } from '../GeneralTableClasses/Parameter';
import { EquipmentNameParameter } from '../ConcreteTableParameters/EquipmentNameParameter';

export class Machine extends Entity {
  protected parameters: Parameter[];

  protected getCreateEndpoint(): string {
    return "http://localhost:5000/machines/";
  }
  protected getDeleteEndpoint(): string {
    return "http://localhost:5000/machines/";
  }
  

  constructor(parameters: Parameter[], id: number) {
    super();
    this.id = id;
    this.parameters = [
      new EquipmentNameParameter(0, "dummy", "dummy", "")
    ]
  }

  /*getParameter(label: string): Parameter | undefined {
    return this.parameters.get(label);
  }

  getAllParameters(): Parameter[] {
    return Array.from(this.parameters.values());
  }*/
}