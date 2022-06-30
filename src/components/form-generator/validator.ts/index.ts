import { FieldType } from '../interface'

export const between = (value, [min, max]: [min: number, max: number]) => {
  if (value < min) return `The number cannot be less than ${min}.`
  if (value > max) return `The number cannot be more than ${max}.`
  return true
}

export const gt = (value, target) => {
  return value > target || `The number should be greater than ${target}.`
}

export const len_max = (value, target) => {
  return String(value).length <= target || `This field can be input ${target} characters at most.`
}

export const required = (value) => {
  return value !== undefined || value !== null || 'This field is required.'
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
        // console.log('validator in map', key, rule, value)
        const result = validators[key](value, target)
        if (result === true) return
        throw new Error(result)
      },
    }))
}
