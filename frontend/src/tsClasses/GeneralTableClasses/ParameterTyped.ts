import { Parameter } from "./Parameter";
import { ParameterType } from "./ParameterTypeEnum";


export abstract class ParameterTyped<T extends Parameter> extends Parameter {

/*constructor(id: number, /*technicalName: string,*//* displayName: string, value: string, data: any, type: ParameterType)
{
    super(id, /*technicalName,*//* displayName, value, data, type);
}*/

    //public abstract loadFromDatabase(/*parameterId: number*/): T;

    //public abstract bulkLoadFromDatabase(): T[];
  }