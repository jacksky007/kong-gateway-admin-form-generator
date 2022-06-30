import { FC } from 'react'
import { Form, Input } from 'antd'
import { NumberType } from '../interface'
import { getValidatorsFromSchema } from '../validator.ts'

interface FormFieldNumberProps {
  name: string
  schema: NumberType
}

export const FormFieldNumber: FC<FormFieldNumberProps> = ({ name, schema }) => {
  return (
    <Form.Item
      label={name}
      name={name}
      rules={[
        {
          validator: async (rule, value) => {
            console.log('validator:', ' rule', rule, 'value', value)
            return
          },
        },
        ...getValidatorsFromSchema(schema),
      ]}
    >
      <Input type="number" defaultValue={schema.default as number}></Input>
    </Form.Item>
  )
}
