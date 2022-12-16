import { Habit } from "./habits";

/**
 * The Session class, encapsulating a device auth token and the user type
 */
export class Session {
    /**
     * @param token - Device-specific auth token
     * @param dom - Dominant if `true`, sub if `false`
     */
    constructor(token: String, dom: Boolean) {
        this.token = token;
        this.dom = dom;
    }

    /** Device-specific auth token */
    token: String;

    /** Dominant if `true`, sub if `false` */
    dom: Boolean;

    /** Generate a random auth token 
     * @param dom - Dominant if `true`, sub if `false`
    */
    static generate(dom: Boolean) {
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
    constructor(id: Number, accessKey: String = Math.round(Math.random() * 1000).toString()) {
        this.id = id;
        this.accessKey = accessKey;
    }
    
    /** Unique account ID */
    id: Number;

    /** Unique private access key for the account owners */
    accessKey: String;

    /** Pin for the dominant */
    domPin: String = "1234";

    /** Account sessions */
    sessions: Array<Session> = [];

    /**
     * Add an account session
     * @param token - Device-specific auth token
     * @param dom - Dominant if `true`, sub if `false`
     */
    addSession(token: String, dom: Boolean) {
        const session = new Session(token, dom);
        this.sessions.push(session);
        console.log('[account ' + this.id + '] The ' + (dom ? 'dom' : 'sub') + ' logged in with a new session, now ' + this.sessions.length + ' sessions');
        return session;
    }

    /**
     * Create an account session
     * @param dom - Dominant if `true`, sub if `false`
     */
    createSession(dom: Boolean) {
        const session = Session.generate(dom);
        this.sessions.push(session);
        console.log('[account ' + this.id + '] The ' + (dom ? 'dom' : 'sub') + ' logged in with a new session, now ' + this.sessions.length + ' sessions');
        return session;
    }

    /**
     * Remove a session from the account
     * @param token - Device-specific auth token
     */
    removeSession(token: String) {
        const index = this.sessions.findIndex(a => a.token === token);
        if (index === -1) return true;
        const session = this.sessions.splice(index, 1)[0];
        console.log('[account ' + this.id + '] The ' + (session.dom ? 'dom' : 'sub') + ' had a session removed, now ' + this.sessions.length + ' sessions');
        return true;
    }

    /** The name of the submissive's points */
    pointsName: String = "Points";

    /** The submissive's points score */
    points: Number = 0;

    /** All habits shared by this couple */
    habits: Array<Habit> = [];
}