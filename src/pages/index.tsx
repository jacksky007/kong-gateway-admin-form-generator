import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { Button, Form, FormInstance } from 'antd'

import 'antd/dist/antd.css'
import './index.styl'

import { EntityTypes, SideMenu } from '../components/side-menu'
import { FormGenerator, FormGeneratorProps } from '../components/form-generator'
import { logger } from '../utils/logger'
import { FieldSchema } from '../components/form-generator/interface'

// only these entities are supported in this version
const entities = ['Services', 'Routes', 'Consumers', 'Plugins'] as EntityTypes[]

async function getSchema(entityType): Promise<{ fields: FieldSchema[] }> {
  const response = await fetch(`/schemas/${entityType.toLocaleLowerCase()}`)
  const data = await response.json()
  return data
}

const Index = () => {
  const [activeEntityType, setActiveEntityType] = useState(entities[0])
  const [schema, setSchema] = useState<FormGeneratorProps['schema']>({ fields: [] })

  const onChangEntityType = async (entityType: EntityTypes) => {
    logger.log(`choose entity type: ${entityType}`)
    setActiveEntityType(entityType)
    const data = await getSchema(entityType)
    setSchema(data)
  }

  // get first entity on initialization
  useEffect(() => {
    getSchema(activeEntityType).then(setSchema)
  }, [])

  const formRef = useRef<FormInstance>(null)
  const submitForm = () => {
    logger.log('submit form', 'values:', formRef.current?.getFieldsValue())
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
        <FormGenerator key={activeEntityType} ref={formRef} schema={schema}>
          <Button onClick={(event) => submitForm()} type="primary">
            Submit
          </Button>
        </FormGenerator>
      </main>
    </>
  )
}
ReactDOM.render(<Index />, document.querySelector('#app'))
