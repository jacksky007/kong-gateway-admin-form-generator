import React, { FC } from 'react'
import { Form, FormInstance } from 'antd'

import { FormFieldNumber } from './form-fields/number'
import { FormFieldSelect } from './form-fields/select'
import { FormFieldString } from './form-fields/string'
import { FieldSchema } from './interface'

export interface FormGeneratorProps {
  children: JSX.Element
  form: FormInstance
  schema: {
    fields: FieldSchema[]
  }
}

export const FormGenerator: FC<FormGeneratorProps> = ({ children, form, schema }) => {
  const FormFields = {
    number: FormFieldNumber,
    string: FormFieldString,
  }

  return (
    <Form form={form} layout="vertical">
      {schema.fields.map((field) => {
        let FormField
        const [[fieldName, fieldSchema]] = Object.entries(field)
        if (fieldSchema.hasOwnProperty('one_of')) {
          FormField = FormFieldSelect
        } else {
          FormField = FormFields[fieldSchema.type]
        }
        // now we just ignore unsupported types
        if (!FormField) return <></>
        return <FormField key={fieldName} name={fieldName} schema={fieldSchema} />
      })}
      {children}
    </Form>
  )
}
