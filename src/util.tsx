/**
 * Check if variable or set of variables are set.
 *
 * @param {*} vars pass multiple value by comma
 */
export const isSet = (...vars: any[]) =>
  vars.filter((item) => 'undefined' !== typeof item && false !== item && null !== item).length ===
  vars.length;
