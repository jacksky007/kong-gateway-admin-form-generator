import { Form, Switch } from 'antd'
import React, { FC } from 'react'
import { BooleanType } from '../interface'
import { getValidatorsFromSchema } from '../validator.ts'
import { FormFieldProps } from './interface'

interface FormFieldBooleanProps extends FormFieldProps<BooleanType> {}

export const FormFieldBoolean: FC<FormFieldBooleanProps> = ({ name, schema }) => {
  return (
    <Form.Item label={name} name={name} rules={getValidatorsFromSchema(schema)} valuePropName="checked">
      <Switch defaultChecked={!!schema.default} />
    </Form.Item>
  )
}
