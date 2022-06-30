import React, { FC } from 'react'
import { Form, Select } from 'antd'
import { FieldType, StringType } from '../interface'

interface FormFieldSelectProps {
  name: string
  schema: FieldType
}

export const FormFieldSelect: FC<FormFieldSelectProps> = ({ name, schema }) => {
  const options = ((schema as StringType).one_of as string[]).map((value) => ({ label: value, value }))
  return (
    <Form.Item label={name} name={name}>
      <Select allowClear={!schema.required} defaultValue={schema.default} options={options}></Select>
    </Form.Item>
  )
}
