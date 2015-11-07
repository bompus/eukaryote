var TypeValidator = require('../../src/type-validator');

describe('TypeValidator', function() {

	it('isDefined', function() {
		expect(TypeValidator.isDefined(null)).toBe(false);
		expect(TypeValidator.isDefined(undefined)).toBe(false);
		expect(TypeValidator.isDefined(true)).toBe(true);
		expect(TypeValidator.isDefined(false)).toBe(true);
		expect(TypeValidator.isDefined(1)).toBe(true);
		expect(TypeValidator.isDefined(1.5)).toBe(true);
		expect(TypeValidator.isDefined('asdf')).toBe(true);
		expect(TypeValidator.isDefined([])).toBe(true);
	});

	it('isBoolean', function() {
		expect(TypeValidator.isBoolean(null)).toBe(false);
		expect(TypeValidator.isBoolean(undefined)).toBe(false);
		expect(TypeValidator.isBoolean(true)).toBe(true);
		expect(TypeValidator.isBoolean(false)).toBe(true);
		expect(TypeValidator.isBoolean(1)).toBe(false);
		expect(TypeValidator.isBoolean(1.5)).toBe(false);
		expect(TypeValidator.isBoolean('asdf')).toBe(false);
		expect(TypeValidator.isBoolean([])).toBe(false);
	});

	it('isString', function() {
		expect(TypeValidator.isString(null)).toBe(false);
		expect(TypeValidator.isString(undefined)).toBe(false);
		expect(TypeValidator.isString(true)).toBe(false);
		expect(TypeValidator.isString(false)).toBe(false);
		expect(TypeValidator.isString(1)).toBe(false);
		expect(TypeValidator.isString(1.5)).toBe(false);
		expect(TypeValidator.isString('asdf')).toBe(true);
		expect(TypeValidator.isString([])).toBe(false);
	});

	it('isNumber', function() {
		expect(TypeValidator.isNumber(null)).toBe(false);
		expect(TypeValidator.isNumber(undefined)).toBe(false);
		expect(TypeValidator.isNumber(true)).toBe(false);
		expect(TypeValidator.isNumber(false)).toBe(false);
		expect(TypeValidator.isNumber(1)).toBe(true);
		expect(TypeValidator.isNumber(1.5)).toBe(true);
		expect(TypeValidator.isNumber('asdf')).toBe(false);
		expect(TypeValidator.isNumber([])).toBe(false);
	});

	it('isInteger', function() {
		expect(TypeValidator.isInteger(null)).toBe(false);
		expect(TypeValidator.isInteger(undefined)).toBe(false);
		expect(TypeValidator.isInteger(true)).toBe(false);
		expect(TypeValidator.isInteger(false)).toBe(false);
		expect(TypeValidator.isInteger(1)).toBe(true);
		expect(TypeValidator.isInteger(1.5)).toBe(false);
		expect(TypeValidator.isInteger('asdf')).toBe(false);
		expect(TypeValidator.isInteger([])).toBe(false);
	});

	it('isArray', function() {
		expect(TypeValidator.isArray(null)).toBe(false);
		expect(TypeValidator.isArray(undefined)).toBe(false);
		expect(TypeValidator.isArray(true)).toBe(false);
		expect(TypeValidator.isArray(false)).toBe(false);
		expect(TypeValidator.isArray(1)).toBe(false);
		expect(TypeValidator.isArray(1.5)).toBe(false);
		expect(TypeValidator.isArray('asdf')).toBe(false);
		expect(TypeValidator.isArray([])).toBe(true);
	});

});
