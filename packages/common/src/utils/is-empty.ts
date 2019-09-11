/**
 * Checks if given value is empty (=== '', === null, === undefined).
 * @param value
 */
export const isEmpty = value => value === '' || value === undefined || value === null;

/**
 * Checks if given value is not empty (!== '', !== null, !== undefined).
 * @param value
 */
export const isNotEmpty = value => value !== '' && value !== undefined && value !== null;
