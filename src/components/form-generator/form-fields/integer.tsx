import { FC } from 'react'
import { Form, InputNumber } from 'antd'
import { IntegerType } from '../interface'
import { getValidatorsFromSchema } from '../validator.ts'
import { FormFieldProps } from './interface'

interface FormFieldIntegerProps extends FormFieldProps<IntegerType> {}

export const FormFieldInter: FC<FormFieldIntegerProps> = ({ name, schema }) => {
  const [min, max] = schema.between || []
  return (
    <Form.Item
      initialValue={schema.default as number}
      label={name}
      name={name}
      rules={[
        {
          // check whether input value is en integer
          validator: async (rule, value) => {
            if (Math.round(value) !== value) {
              throw new Error('This field should be an integer')
            }
          },
        },
        ...getValidatorsFromSchema(schema),
      ]}
    >
      <InputNumber {...{ max, min }} style={{ width: '100%' }} />
    </Form.Item>
  )
}
