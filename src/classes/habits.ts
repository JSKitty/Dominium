import { Couple } from "./users";

/**
 * The Habit class, encapsulating all of the data for any single habit or task for a submissive
 */
export class Habit {
    /**
     * @param name - Name of the habit
     * @param description - Description of the habit
     * @param couple - Couple that the habit belongs to
     * @param complete - Completion status of the habit
     */
    constructor(name: String, description: String, couple: Couple, complete: Boolean) {
        this.name = name;
        this.description = description;
        this.couple = couple;
        this.complete = complete;
    }

    /** Name of the habit */
    name: String;
    
    /** Description of the habit */
    description: String;

    /** Couple that the habit belongs to */
    couple: Couple;
    
    /** Completion status of the habit */
    complete: Boolean;
}