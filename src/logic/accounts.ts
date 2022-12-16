import { Couple, Session } from "../classes/users";

/** All user accounts for the app */
export const accounts: Array<Couple> = [];

/**
 * Generate an anonymous user account with a unique access key
 */
export function generateAccount(pin: String) {
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
export function getAccount(accessKey: String) {
    return accounts.find(a => a.accessKey === accessKey);
}