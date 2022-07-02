import React, { forwardRef, Fragment, useEffect } from 'react'
import { Form, FormInstance } from 'antd'

import { FormFieldArray } from './form-fields/array'
import { FormFieldBoolean } from './form-fields/boolean'
import { FormFieldInter } from './form-fields/integer'
import { FormFieldMap } from './form-fields/map'
import { FormFieldNumber } from './form-fields/number'
import { FormFieldSelect } from './form-fields/select'
import { FormFieldSet } from './form-fields/set'
import { FormFieldString } from './form-fields/string'

import { FieldSchema, FieldType } from './interface'
import { logger } from '../../utils/logger'

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

  // these properties should be set by server nor admin user
  const propertiesSetByServer = ['auto']
  const propertySetByServer = propertiesSetByServer.find((propertyName) => fieldSchema.hasOwnProperty(propertyName))
  if (propertySetByServer) {
    logger.log(
      `the field '${fieldName}' is ignored since it has ${propertySetByServer} property which will be set by server`,
    )
    return null
  }

  // render as a select component while it has 'one_of' property
  if (fieldSchema.hasOwnProperty('one_of')) {
    return <FormFieldSelect key={fieldName} name={fieldName} schema={fieldSchema}></FormFieldSelect>
  }

  const FormFields = {
    array: FormFieldArray,
    boolean: FormFieldBoolean,
    integer: FormFieldInter,
    map: FormFieldMap,
    number: FormFieldNumber,
    set: FormFieldSet,
    string: FormFieldString,
  }
  const FormField = FormFields[fieldSchema.type]

  // now we ignore unsupported field types and output a warning message in console
  if (!FormField) {
    logger.warn(
      `field '${fieldName}' is ignored because the type '${fieldSchema.type}' is not supported in current version`,
    )
    return null
  }

  return <FormField key={fieldName} name={fieldName} schema={fieldSchema} />
}

export const FormGenerator = forwardRef<FormInstance, FormGeneratorProps>(({ children, schema }, ref) => {
  const [form] = Form.useForm()

  return (
    <Form form={form} layout="vertical" ref={ref} validateTrigger={['onBlur', 'onChange']}>
      {schema.fields.map(renderFormField)}
      {children}
    </Form>
  )
})
