import { FC } from 'react'
import { Form, Input } from 'antd'
import { IntegerType } from '../interface'
import { getValidatorsFromSchema } from '../validator.ts'
import { FormFieldProps } from './interface'

interface FormFieldIntegerProps extends FormFieldProps<IntegerType> {}

export const FormFieldInter: FC<FormFieldIntegerProps> = ({ name, schema }) => {
  return (
    <Form.Item
      initialValue={schema.default as number}
      label={name}
      name={name}
      rules={[
        {
          validator: async (rule, value) => {
            if (Math.round(value) !== value) {
              throw new Error('This field should be an integer')
            }
          },
        },
        ...getValidatorsFromSchema(schema),
      ]}
    >
      <Input type="number" />
    </Form.Item>
  )
}
