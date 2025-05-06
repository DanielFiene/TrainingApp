import { ParameterType } from "./ParameterTypeEnum";

export abstract class Parameter {
    id: number;
    //technicalName: string;
    displayName: string;
    value: string;
    data: any;
    type: ParameterType;
    multiselect: boolean;
  
    constructor(id: number, /*technicalName: string,*/ displayName: string, value: string, data: any, type: ParameterType, multiselect: boolean) {
      this.id = id;//ID of the entity they're associated with - NO independent ID!
      //this.technicalName = technicalName;//technical name without any special characters (other than underscore), spaces or capital letters - e.g. "push_up"
      this.displayName = displayName;//readably formated default display name - e.g. "Push Up"
      this.value = value;//can contain data (or path to resources) which don't work well with technicalName or DisplayName - e.g. path to an image. Leave empty if not required.
      this.data = data;//can contain arbitrary data, like an array of strings. Leave empty if not required.
      this.type = type;//defines the display characteristics
      this.multiselect = multiselect;//
    }
  
    /**
    * Sets the internal value of this parameter (e.g., from a UI input).
    */
    public setValue(newValue: string): void {
      this.value = newValue;
    }

    /**
    * Gets the current value of this parameter.
    */
    public getValue(): string {
      return this.value;
    }

    /**
    * Fetches the value of this parameter from the backend as a Parameter.
    * Must be implemented in each concrete parameter class.
    */
    public abstract loadFromDatabase(/*parameterId: number*/): Promise<Parameter>;

    /**
     * Fetches all values of this parameter from the backend and returns them as an array.
     * Must be implemented in each concrete parameter class.
     */
    public abstract bulkLoadFromDatabase(): Promise<Parameter[]>;

    /**
    * Writes the current value of this parameter to the backend.
    * Must be implemented in each concrete parameter class.
    */
    public abstract writeToDatabase(/*objectId: number*/): Promise<void>;
  
    // Optional: validation, etc.
    //validate?(): boolean;

    /**
     * Returns the name of the parameter type (e.g. "Muscle" when the display name of the parameter can be "Biceps" or "Triceps" etc.). Can therefore be defined statically for each derived class.
     * Must be implemented in each concrete parameter class.
     * Todo: Implement translations
     */
    public abstract myName(/*lanuage: languageEnum*/): string;
  }