import { Couple } from "./users";

/**
 * The Habit class, encapsulating all of the data for any single habit or task for a submissive
 */
export class Habit {
    /**
     * @param name - Name of the habit
     * @param description - Description of the habit
     * @param points - The points reward for completing
     * @param complete - Completion status of the habit
     */
    constructor(name: string, description: string, points: number, complete: boolean) {
        this.name = name;
        this.description = description;
        this.points = points;
        this.complete = complete;
    }

    /** Name of the habit */
    name: string;
    
    /** Description of the habit */
    description: string;

    points: number;
    
    /** Completion status of the habit */
    complete: boolean;
}