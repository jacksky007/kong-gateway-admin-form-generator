import { Form, Select } from 'antd'
import React, { FC } from 'react'
import { ArrayType } from '../interface'
import { getValidatorsFromSchema } from '../validator.ts'
import { FormFieldProps } from './interface'

interface FormFieldArrayProps extends FormFieldProps<ArrayType> {}

export const FormFieldArray: FC<FormFieldArrayProps> = ({ name, schema }) => {
  return (
    <Form.Item initialValue={schema.default || []} label={name} name={name} rules={getValidatorsFromSchema(schema)}>
      <Select mode="tags" notFoundContent={null} placeholder="you can input multiple values"></Select>
    </Form.Item>
  )
}
