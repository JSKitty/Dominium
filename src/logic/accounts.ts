import { Couple, Session } from "../classes/users";

/** All user accounts for the app */
export const accounts: Array<Couple> = [];

/** A pair of an Account and the active Session associated with it */
class AccountSessionPair {
    constructor(account: Couple, session: Session) {
        this.account = account;
        this.session = session;
    }

    account: Couple;
    session: Session;
}

/**
 * 
 * @param token - Device-specific auth token
 */
export function getAccountBySession(token: string) {
    for (const account of accounts) {
        for (const session of account.sessions) {
            if (session.token === token) return new AccountSessionPair(account, session);
        }
    }
    return undefined;
}

/**
 * Generate an anonymous user account with a unique access key
 */
export function generateAccount(pin: string) {
    // Generate a new account
    const account = new Couple(accounts.length);

    // Set the dominant pin
    account.domPin = pin;
    
    // Push to DB
    accounts.push(account);

    return account;
}

/**
 * Get a couple's account via their access key
 * @param accessKey - Unique private access key for the account owners
 */
export function getAccount(accessKey: string) {
    return accounts.find(a => a.accessKey === accessKey);
}