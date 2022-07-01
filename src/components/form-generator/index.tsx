import React, { forwardRef, Fragment, useEffect } from 'react'
import { Form, FormInstance } from 'antd'

import { FormFieldNumber } from './form-fields/number'
import { FormFieldSelect } from './form-fields/select'
import { FormFieldString } from './form-fields/string'
import { FieldSchema, FieldType } from './interface'
import { FormFieldArray } from './form-fields/array'
import { logger } from '../../utils/logger'
import { FormFieldInter } from './form-fields/integer'
import { FormFieldBoolean } from './form-fields/boolean'

export interface FormGeneratorProps {
  children: JSX.Element
  // form: FormInstance
  ref: React.RefObject<this>
  schema: {
    fields: FieldSchema[]
  }
}

function renderFormField(field: FieldSchema) {
  const [[fieldName, fieldSchema]] = Object.entries(field)
  // render as a select component while it has 'one_of' property
  if (fieldSchema.hasOwnProperty('one_of')) {
    logger.log('render form field with one_of', fieldName)
    // return <p>fieldNam:{fieldName}</p>
    // return null
    return <FormFieldSelect key={fieldName} name={fieldName} schema={fieldSchema}></FormFieldSelect>
  }
  const FormFields = {
    array: FormFieldArray,
    boolean: FormFieldBoolean,
    integer: FormFieldInter,
    number: FormFieldNumber,
    string: FormFieldString,
  }
  const FormField = FormFields[fieldSchema.type]

  // now we ignore unsupported types and output a warning message in console
  if (!FormField) {
    logger.warn(`the type ${fieldSchema.type} is not support in current version`)
    return null
  }
  logger.log('render form field else', fieldName)

  return <FormField key={fieldName} name={fieldName} schema={fieldSchema} />
}

export const FormGenerator = forwardRef<FormInstance, FormGeneratorProps>(({ children, schema }, ref) => {
  const [form] = Form.useForm()

  return (
    <Form form={form} layout="vertical" ref={ref}>
      {schema.fields.map(renderFormField)}
      {children}
    </Form>
  )
})
