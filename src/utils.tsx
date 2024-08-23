/**
 * Generate a unique id to avoid ID collisions.
 */
let generateUniqueIdCounter = 0;
export const generateUniqueId = (prefix: string) => {
  generateUniqueIdCounter += 1;
  return `${prefix}-${generateUniqueIdCounter}`;
};
