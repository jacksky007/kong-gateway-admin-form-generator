import { Form, Select } from 'antd'
import React, { FC } from 'react'
import { logger } from '../../../utils/logger'
import { SetType } from '../interface'
import { getValidatorsFromSchema } from '../validator.ts'
import { FormFieldProps } from './interface'

interface FormFieldSetProps extends FormFieldProps<SetType> {}

export const FormFieldSet: FC<FormFieldSetProps> = ({ name, schema }) => {
  // set type field is partially supported in this version
  const supportedTypes = ['string']
  if (!supportedTypes.includes(schema.elements.type)) {
    logger.warn(`set field which elements type is ${schema.elements.type} is not supprted in current version`)
    return null
  }

  const options = (schema.elements.one_of || []).map((value) => ({ label: value, value }))
  return (
    <Form.Item initialValue={schema.default || []} label={name} name={name} rules={getValidatorsFromSchema(schema)}>
      <Select mode="tags" notFoundContent={null} options={options} placeholder="you can input multiple values"></Select>
    </Form.Item>
  )
}
