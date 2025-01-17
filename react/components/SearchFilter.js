import PropTypes from 'prop-types'
import React from 'react'
import { injectIntl, intlShape } from 'react-intl'
import classNames from 'classnames'

import FilterOptionTemplate from './FilterOptionTemplate'
import FacetItem from './FacetItem'
import { facetOptionShape } from '../constants/propTypes'
import { getFilterTitle } from '../constants/SearchHelpers'
import useSelectedFilters from '../hooks/useSelectedFilters'

import styles from '../searchResult.css'

/**
 * Search Filter Component.
 */
const SearchFilter = ({ title = 'Default Title', facets = [], intl }) => {
  const filtersWithSelected = useSelectedFilters(facets)

  return (
    <FilterOptionTemplate
      title={getFilterTitle(title, intl)}
      filters={filtersWithSelected}
    >
      {facet => (
        <FacetItem
          key={facet.name}
          facet={facet}
          className={classNames(styles.filterItem, {
            [`${styles.filterItem}--selected`]: facet.selected,
          })}
        />
      )}
    </FilterOptionTemplate>
  )
}

SearchFilter.propTypes = {
  /** SearchFilter's title. */
  title: PropTypes.string.isRequired,
  /** SearchFilter's options. */
  facets: PropTypes.arrayOf(facetOptionShape),
  /** Intl instance. */
  intl: intlShape.isRequired,
}

export default injectIntl(SearchFilter)
