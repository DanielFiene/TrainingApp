import { ParameterType } from "./ParameterTypeEnum";

export abstract class Parameter {
    technicalName: string;
    displayName: string;
    value: string;
    data: any;
    type: ParameterType;
  
    constructor(technicalName: string, displayName: string, value: string, data: any, type: ParameterType) {
      this.technicalName = technicalName;
      this.displayName = displayName;
      this.value = value;
      this.data = data;
      this.type = type;
    }
  
    // Required for rendering
    abstract getDisplayValue(): string;
  
    // Optional: editable field rendering behavior - move to UI class!
    //abstract renderEditField(onChange: (newVal: any) => void): HTMLElement;

    //Required for committing changes to the database
    abstract writeToDatabase(dbData: string): void;
  
    // Optional: validation, etc.
    validate?(): boolean;
  }  