import React, { FC } from 'react'
import { Form, Select } from 'antd'
import { FieldType, StringType } from '../interface'
import { FormFieldProps } from './interface'

interface FormFieldSelectProps extends FormFieldProps<FieldType> {}

export const FormFieldSelect: FC<FormFieldSelectProps> = ({ name, schema }) => {
  const options = ((schema as StringType).one_of as string[]).map((value) => ({ label: value, value }))
  return (
    <Form.Item label={name} name={name} initialValue={schema.default}>
      <Select allowClear={!schema.required} options={options} placeholder="choose a value listed"></Select>
    </Form.Item>
  )
}
