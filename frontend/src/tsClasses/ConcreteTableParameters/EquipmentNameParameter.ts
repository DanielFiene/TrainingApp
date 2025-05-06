import { Parameter } from '../GeneralTableClasses/Parameter';
import { ParameterType } from '../GeneralTableClasses/ParameterTypeEnum';

export class EquipmentNameParameter extends Parameter {

  constructor(id: number, /*technicalName: string,*/ displayName: string, value: string, data: any) {
    super(id, displayName, value, data, ParameterType.Text, false);
  }

  public myName(): string {
    return "Equipment";
  }
  public loadFromDatabase(/*parameterId: number*/): Promise<EquipmentNameParameter> {
    throw new Error('Method not implemented.');
  }

  public async bulkLoadFromDatabase(): Promise<EquipmentNameParameter[]> {
    const response = await fetch("http://localhost:5000/machines/");
    const data: { id: number; name: string }[] = await response.json(); // [{ id: 1, name: 'Leg Press' }, ...]

    return data.map(item => new EquipmentNameParameter(item.id, item.name, "", ""));
  }

  async writeToDatabase(/*objectId: number*/): Promise<void> {
    try {
      await fetch(`http://localhost:5000/machines/${this.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.value
        })
      });
    } catch (err) {
      console.error(`Failed to update machine ${this.id}}:`, err);
      throw err;
    }
  }

  /*public static async loadColumnFromDatabase(): Promise<Map<number, string>> {
    const response = await fetch("http://localhost:5000/machines/");
    const data = await response.json(); // [{ id: 1, name: 'Leg Press' }, ...]

    const map = new Map<number, string>();
    data.forEach((entry: { id: number, name: string }) => {
      map.set(entry.id, entry.name);
    });

    return map;
  }*/
}
