import { Habit } from "./habits";

/**
 * The Session class, encapsulating a device auth token and the user type
 */
export class Session {
    /**
     * @param token - Device-specific auth token
     * @param dom - Dominant if `true`, sub if `false`
     */
    constructor(token: string, dom: boolean) {
        this.token = token;
        this.dom = dom;
    }

    /** Device-specific auth token */
    token: string;

    /** Dominant if `true`, sub if `false` */
    dom: boolean;

    /** Generate a random auth token 
     * @param dom - Dominant if `true`, sub if `false`
    */
    static generate(dom: boolean) {
        return new Session(Math.round(Math.random() * 1000).toString(), dom);
    }
}

/**
 * The Couple account class, encapsulating their unique ID and anonymised device sessions
 */
export class Couple {
    /**
     * @param id - Unique account ID
     * @param accessKey - Unique private access key for the account owners, randomly generated if left undefined
     */
    constructor(id: number, accessKey: string = Math.round(Math.random() * 1000).toString()) {
        this.id = id;
        this.accessKey = accessKey;
    }
    
    /** Unique account ID */
    id: number;

    /** Unique private access key for the account owners */
    accessKey: string;

    /** Pin for the dominant */
    domPin: string = "1234";

    /** Account sessions */
    sessions: Array<Session> = [];

    /**
     * Add an account session
     * @param token - Device-specific auth token
     * @param dom - Dominant if `true`, sub if `false`
     */
    addSession(token: string, dom: boolean) {
        const session = new Session(token, dom);
        this.sessions.push(session);
        console.log('[account ' + this.id + '] The ' + (dom ? 'dom' : 'sub') + ' logged in with a new session, now ' + this.sessions.length + ' sessions');
        return session;
    }

    /**
     * Create an account session
     * @param dom - Dominant if `true`, sub if `false`
     */
    createSession(dom: boolean) {
        const session = Session.generate(dom);
        this.sessions.push(session);
        console.log('[account ' + this.id + '] The ' + (dom ? 'dom' : 'sub') + ' logged in with a new session, now ' + this.sessions.length + ' sessions');
        return session;
    }

    /**
     * 
     * @param token - Device-specific auth token
     */
    findSession(token: string) {
        return this.sessions.find(a => a.token === token);
    }

    /**
     * Remove a session from the account
     * @param token - Device-specific auth token
     */
    removeSession(token: string) {
        const index = this.sessions.findIndex(a => a.token === token);
        if (index === -1) return true;
        const session = this.sessions.splice(index, 1)[0];
        console.log('[account ' + this.id + '] The ' + (session.dom ? 'dom' : 'sub') + ' had a session removed, now ' + this.sessions.length + ' sessions');
        return true;
    }

    /** The name of the submissive's points */
    pointsName: string = "Stars";

    /** The submissive's points score */
    points: number = 0;

    /** All habits shared by this couple */
    habits: Array<Habit> = [];

    /**
     * Create a new habit task for this couple
     * @param name - Name of the habit task
     * @param description - Description of the habit task
     * @param points - Points reward for completing
     */
    createTask(name: string, description: string, points: number) {
        const task = new Habit(name, description, points, false);
        this.habits.push(task);
        console.log('[account ' + this.id + '] Created a new habit task, now ' + this.habits.length + ' tasks');
        return task;
    }

    /**
     * Remove a habit task for this couple
     * @param name - Name of the habit task
     */
     removeTask(name: string) {
        const index = this.habits.findIndex(a => a.name === name);
        if (index === -1) return true;
        this.habits.splice(index, 1)[0];
        console.log('[account ' + this.id + '] Removed a habit task, now ' + this.habits.length + ' tasks');
        return true;
    }

    /**
     * Find a habit task for this couple
     * @param name - Name of the habit task
     */
    findTask(name: string) {
        return this.habits.find(a => a.name === name);
    }
}