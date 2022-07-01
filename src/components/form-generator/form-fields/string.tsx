import { FC } from 'react'
import { Form, Input } from 'antd'

import { StringType } from '../interface'
import { getValidatorsFromSchema } from '../validator.ts'
import { FormFieldProps } from './interface'

interface FormFieldStringProps extends FormFieldProps<StringType> {}

export const FormFieldString: FC<FormFieldStringProps> = ({ name, schema }) => {
  return (
    <Form.Item label={name} name={name} rules={[...getValidatorsFromSchema(schema)]}>
      <Input type="text" />
    </Form.Item>
  )
}
