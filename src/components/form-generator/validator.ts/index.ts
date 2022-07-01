import { FieldType } from '../interface'

// check whether a number value is in the given range
export const between = (value: number, [min, max]: [min: number, max: number]) => {
  if (value < min) return `The number cannot be less than ${min}.`
  if (value > max) return `The number cannot be more than ${max}.`
  return true
}

// check whether a number is greater than the given value
export const gt = (value: number, target: number) => {
  return value > target || `The number should be greater than ${target}.`
}

// check whether the string matches the given length
export const len_eq = (value: string, target: number) => {
  return String(value).length === target || `This field should have ${target} characters exactly.`
}

// check whether the string is no longer than the given length
export const len_max = (value: string, target: number) => {
  return String(value).length <= target || `This field should have no more than ${target} characters.`
}

// check whether the string is no shorter than the given length
export const len_min = (value: string, target: number) => {
  return String(value).length >= target || `This field should have no less than ${target} characters.`
}

// check whether the string does not match any pattern in the given array
export const match_none = (value: string, target: { err: string; pattern: string }[]) => {
  const errorResult = target.find(({ pattern }) => new RegExp(pattern).test(value))
  return errorResult?.err || true
}

// check whether the input value is required
export const required = (value) => {
  return value !== undefined || value !== null || 'This field is required.'
}

// check whether the string has a prefix subpart with given value
export const starts_with = (value: string, target: string) => {
  return String(value).startsWith(target) || `Theis field should start with ${target}.`
}

const validators = {
  between,
  gt,
  len_max,
  required,
}

// map validator properties to custom validators used by
export const getValidatorsFromSchema = (schema: FieldType) => {
  const supportedValidators = Object.keys(validators)
  return Object.entries(schema)
    .filter(([key]) => supportedValidators.includes(key))
    .map(([key, target]) => ({
      validator: async (rule, value) => {
        const result = validators[key](value, target)
        if (result === true) return
        throw new Error(result)
      },
    }))
}
