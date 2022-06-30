import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import 'antd/dist/antd.css'
import './index.styl'

import { EntityTypes, SideMenu } from '../components/side-menu'
import { FormGenerator, FormGeneratorProps } from '../components/form-generator'
import { Button, Form } from 'antd'

// only these entities are fully supported in this lite version form generator
const entities = ['Services', 'Routes', 'Consumers', 'Plugins'] as EntityTypes[]

const exampleFields1: FormGeneratorProps['schema']['fields'] = [
  {
    id: {
      type: 'number',
      required: true,
      default: 1,
      gt: 1,
      between: [0, 1],
    },
  },
  {
    name: {
      type: 'string',
      required: true,
      default: 'default name',
      len_min: 1,
      len_max: 10,
    },
  },
  {
    protocol: {
      default: 'http',
      // indexed: true,
      len_min: 1,
      one_of: ['grpc', 'grpcs', 'http', 'https', 'tcp', 'tls', 'tls_passthrough', 'udp'],
      required: true,
      type: 'string',
    },
  },
]

const exampleFields2: FormGeneratorProps['schema']['fields'] = [
  {
    id: {
      type: 'number',
      required: true,
      default: 10,
      gt: 1,
      between: [0, 10],
    },
  },
]

const Index = () => {
  const [fields, setFields] = useState<FormGeneratorProps['schema']['fields']>(exampleFields1)

  const onChangEntityType = (entityType: EntityTypes) => {
    console.log(`choose entity type: ${entityType}`)
    if (entityType === entities[0]) {
      setFields(exampleFields1)
      return
    }
    setFields(exampleFields2)
  }

  const [form] = Form.useForm()
  const submitForm = () => {
    console.log('submit form', 'values:', form.getFieldsValue())
  }

  return (
    <>
      <header>
        <h1>Kong Gateway entities form</h1>
        <p>Choose the entity in the menu, then you can create new entitiy object by the form shown.</p>
      </header>
      <aside>
        <SideMenu entities={entities} onChange={onChangEntityType} />
      </aside>
      <main>
        <FormGenerator form={form} schema={{ fields }}>
          <Button onClick={(event) => submitForm()}>Submit</Button>
        </FormGenerator>
      </main>
    </>
  )
}

ReactDOM.render(<Index />, document.querySelector('#app'))
