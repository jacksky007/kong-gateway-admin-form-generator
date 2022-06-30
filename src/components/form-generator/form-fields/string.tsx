import { FC } from 'react'
import { Form, Input } from 'antd'

import { StringType } from '../interface'
import { getValidatorsFromSchema } from '../validator.ts'

interface FormFieldStringProps {
  name: string
  schema: StringType
}

export const FormFieldString: FC<FormFieldStringProps> = ({ name, schema }) => {
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
      <Input type="text"></Input>
    </Form.Item>
  )
}
