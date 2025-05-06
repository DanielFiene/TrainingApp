import { Parameter } from "./Parameter";

export abstract class Entity {
  public id: number | null = null;
  protected abstract parameters: Parameter[];

  // These abstract methods must be implemented in subclasses
  //protected abstract getSingleEndpoint(): string;
  protected abstract getCreateEndpoint(): string;
  protected abstract getDeleteEndpoint(): string;

  /**
   * Loads the object data from the backend by delegating to each parameter.
   */
  /*public async loadFromDatabase(id: number): Promise<void> {
    this.id = id;
    for (const parameter of this.parameters) {
      await parameter.loadColumnFromDatabase(id);
    }
  }*/

  /**
   * Creates a new object in the backend and populates it using updateDatabase.
   */
  public async createAndInitializeInDatabase(): Promise<void> {
    try {
      const response = await fetch(this.getCreateEndpoint(), {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error(`Failed to create object: ${response.statusText}`);
      }

      const data = await response.json();
      this.id = data.id;

      // After creating the empty object, populate it
      await this.updateDatabase();
    } catch (error) {
      console.error("Error creating and initializing object:", error);
      throw error;
    }
  }

  /**
   * Updates all parameters of the object by delegating to each parameter.
   */
  public async updateDatabase(): Promise<void> {
    if (this.id === null) {
      throw new Error("Cannot update object with null ID.");
    }

    for (const parameter of this.parameters) {
      await parameter.writeToDatabase();
    }
  }

  /**
   * Deletes this object from the backend.
   */
  public async deleteFromDatabase(): Promise<void> {
    if (this.id === null) {
      throw new Error("Cannot delete object with null ID.");
    }

    const url = `${this.getDeleteEndpoint()}/${this.id}`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete object: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error deleting object:", error);
      throw error;
    }
  }
}
