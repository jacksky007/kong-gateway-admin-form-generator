import { logger } from '../../../utils/logger'
import { ArrayType, FieldType, MapType, SetType } from '../interface'
import { luaPatternToRegexp } from '../../../utils/lua-patten'

type validatorFn = (value: any, param: any) => true | string

/**
 * All validator functions return true if value matches rule,
 * or else return error message.
 */

// check whether a number value is in the given range
export const between: validatorFn = (value: number, [min, max]: [min: number, max: number]) => {
  if (value < min) return `The number cannot be less than ${min}.`
  if (value > max) return `The number cannot be more than ${max}.`
  return true
}

// check wheter array contains the given value
export const contains: validatorFn = (value: any[], target: any) => {
  return value.includes(target) || `This array should contains ${target}`
}

// check whether a number is greater than the given value
export const gt: validatorFn = (value: number, target: number) => {
  return value > target || `The number should be greater than ${target}.`
}

// check whether the string is a valid regex pattern
export const is_regex: validatorFn = (value: string) => {
  try {
    new RegExp(value)
    return true
  } catch (e) {
    return `This filed should ba a valid regex pattern.`
  }
}

// check whether the string matches the given length
export const len_eq: validatorFn = (value: string, target: number) => {
  return String(value).length === target || `This field should have ${target} characters exactly.`
}

// check whether the string is no longer than the given length
export const len_max: validatorFn = (value: string, target: number) => {
  return String(value).length <= target || `This field should have no more than ${target} characters.`
}

// check whether the string is no shorter than the given length
export const len_min: validatorFn = (value: string, target: number) => {
  return String(value).length >= target || `This field should have no less than ${target} characters.`
}

// check whether the string matches the give pattern
export const match: validatorFn = (value: string, pattern: string) => {
  return new RegExp(luaPatternToRegexp(pattern)).test(value) || `The filed should match pattern ${pattern}`
}

// check whether the string matches all the given patterns
export const match_all: validatorFn = (value: string, patterns: { err: string; pattern: string }[]) => {
  const patternMismatched = patterns.find(({ pattern }) => !new RegExp(luaPatternToRegexp(pattern)).test(value))
  return patternMismatched?.err || true
}

// check whether the string matches any one of the given patterns
export const match_any: validatorFn = (value: string, { err, patterns }: { err: string; patterns: string[] }) => {
  const patternMatched = patterns.find((pattern) => new RegExp(luaPatternToRegexp(pattern)).test(value))
  return patternMatched ? true : err
}

// check whether the string does not match any pattern in the given array
export const match_none: validatorFn = (value: string, patterns: { err: string; pattern: string }[]) => {
  const patternMatched = patterns.find(({ pattern }) => new RegExp(luaPatternToRegexp(pattern)).test(value))
  return patternMatched?.err || true
}

// check whether the input value is required
export const required: validatorFn = (value) => {
  return (value !== undefined && value !== null) || 'This field is required.'
}

// check whether the string has a prefix subpart with given value
export const starts_with: validatorFn = (value: string, target: string) => {
  return String(value).startsWith(target) || `This field should start with ${target}.`
}

const validatorsSupported = {
  between,
  contains,
  gt,
  len_eq,
  len_max,
  len_min,
  match,
  match_all,
  match_any,
  match_none,
  required,
  starts_with,
}

// map validator properties to custom validators used by antd form component
export const getValidatorsFromSchema = (schema: FieldType) => {
  const supportedValidators = Object.keys(validatorsSupported)
  const validators = Object.entries(schema)
    .filter(([key]) => supportedValidators.includes(key))
    .map(([key, target]) => ({
      validator: async (rule, value) => {
        const result = validatorsSupported[key](value, target)
        if (result === true) return
        throw new Error(result)
      },
    }))

  // validators for array and set types' elements property
  const elementsValidators = Object.entries((schema as ArrayType | SetType).elements || {})
    .filter(([key]) => supportedValidators.includes(key))
    .map(([key, target]) => ({
      validator: async (rule, values: string[]) => {
        for (const value of values) {
          const result = validatorsSupported[key](value, target)
          if (result === true) continue
          throw new Error(result)
        }
      },
    }))

  // TODO: validators for map type's keys and values are not implemented

  return [...validators, ...elementsValidators]
}
