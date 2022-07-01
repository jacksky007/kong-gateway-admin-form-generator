import { FC, useState } from 'react'
import classnames from 'classnames'

import * as styles from './index.module.styl'

export type EntityTypes = 'Services' | 'Routes' | 'Consumers' | 'Plugins'

interface SideMenuProps {
  defaultActiveIndex?: number
  entities: EntityTypes[]
  onChange: (entitiyType: EntityTypes) => void
}

export const SideMenu: FC<SideMenuProps> = ({ defaultActiveIndex = 0, entities, onChange }) => {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex)

  return (
    <>
      <h2>Available entities</h2>
      <ul className={classnames(styles['entities-list'])}>
        {entities.map((entity, index) => (
          <li
            key={entities[index]}
            className={classnames({ [styles['active']]: activeIndex === index })}
            onClick={() => {
              if (activeIndex === index) {
                return
              }
              setActiveIndex(index)
              onChange(entities[index])
            }}
          >
            {entity}
          </li>
        ))}
      </ul>
    </>
  )
}
