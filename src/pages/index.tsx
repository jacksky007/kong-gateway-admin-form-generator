import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { Button, Form, FormInstance, Modal } from 'antd'

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
  const submitForm = async () => {
    const form = formRef.current

    if (!form) {
      return
    }

    logger.log(`submit form to create ${activeEntityType.toLocaleLowerCase()}`)

    const values = formRef.current?.getFieldsValue()

    const response = await fetch(`/${activeEntityType.toLocaleLowerCase()}`, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await response.json()
    if (!data.code) return

    const modal = Modal.info({
      title: `Post form to create ${activeEntityType}`,
      width: '50vw',
      content: <div style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(data, null, 2)}</div>,
    })
  }

  const [refreshKey, setRefreshKey] = useState(Date.now())
  useEffect(() => {
    formRef.current?.validateFields()
  }, [formRef.current])

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
        <FormGenerator key={`${activeEntityType}-${refreshKey}`} ref={formRef} schema={schema}>
          <Form.Item shouldUpdate>
            {() => {
              const result = formRef.current?.getFieldsError()

              return (
                <Button
                  disabled={!!result?.find(({ errors }) => errors.length > 0)}
                  onClick={(event) => submitForm()}
                  type="primary"
                >
                  Submit
                </Button>
              )
            }}
          </Form.Item>
        </FormGenerator>
      </main>
    </>
  )
}
ReactDOM.render(<Index />, document.querySelector('#app'))
