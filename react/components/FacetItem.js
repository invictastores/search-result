import React, { useContext } from 'react'
import { Checkbox } from 'vtex.styleguide'
import classNames from 'classnames'

import SettingsContext from './SettingsContext'
import useFacetNavigation from '../hooks/useFacetNavigation'

const FacetItem = ({ facet, className }) => {
  const { showFacetQuantity } = useContext(SettingsContext)

  const navigateToFacet = useFacetNavigation()

  return (
    <div className={classNames(className, 'lh-copy w-100')} style={{hyphens: 'auto', wordBreak: 'break-word'}}>
      <Checkbox
        id={facet.value}
        checked={facet.selected}
        label={
          showFacetQuantity ? `${facet.name} (${facet.quantity})` : facet.name
        }
        name={facet.name}
        onChange={() => navigateToFacet(facet)}
        value={facet.name}
      />
    </div>
  )
}

export default FacetItem
