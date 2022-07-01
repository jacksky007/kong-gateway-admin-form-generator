import { FC } from 'react'
import { Form, Input } from 'antd'
import { NumberType } from '../interface'
import { getValidatorsFromSchema } from '../validator.ts'
import { FormFieldProps } from './interface'

interface FormFieldNumberProps extends FormFieldProps<NumberType> {}

export const FormFieldNumber: FC<FormFieldNumberProps> = ({ name, schema }) => {
  return (
    <Form.Item
      initialValue={schema.default as number}
      label={name}
      name={name}
      rules={[...getValidatorsFromSchema(schema)]}
    >
      <Input placeholder="input a number" type="number" />
    </Form.Item>
  )
}
