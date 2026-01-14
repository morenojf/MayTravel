import { test, expect } from '@jest/globals';
import { sum } from "../src/components/users/service/user_service.mjs"

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

// como se escribe un test? 

// test('nombre de lo que hace la funcion a testear', () => {
// 	// igualamos el result a una variable 
// 	// hacemos uso de expect y to be. 
// 	const result = sum(2, 3)
// 	expect(result).toBe(5)
// })