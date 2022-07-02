import { Button, Form, Input, Space } from 'antd'

import React, { FC } from 'react'
import { MapType } from '../interface'
import { FormFieldArray } from './array'
import { FormFieldProps } from './interface'

interface FormFieldMapProps extends FormFieldProps<MapType> {}

export const FormFieldMap: FC<FormFieldMapProps> = ({ name, schema }) => {
  return (
    <Form.List name={name}>
      {(fields, { add, remove }, { errors }) => (
        <>
          <label htmlFor={name}>{name}</label>
          {fields.map(({ key, name, ...restField }) => (
            <Space key={key} style={{ display: 'flex', alignItems: 'flex-start' }}>
              <Form.Item {...restField} name={[name, 'name']}>
                <Input placeholder="enter header name" />
              </Form.Item>
              {/*  no we just support basic filed type for map values */}
              <Form.Item {...restField} name={[name, 'value']}>
                <Input placeholder="enter header value" />
              </Form.Item>
              <Button onClick={() => remove(name)} size="middle">
                remove
              </Button>
            </Space>
          ))}
          <Form.Item>
            <Button onClick={() => add()} size="middle">
              Add header
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  )
}
