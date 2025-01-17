import classNames from 'classnames'
import React, { useContext, useMemo } from 'react'
import { compose, equals, head, last, findLastIndex, findIndex, prop, path } from 'ramda'

import QueryContext from './components/QueryContext'

import styles from './searchResult.css'

const findFT = findIndex(equals('ft'))
const findProductCluster = findIndex(equals('productClusterIds'))
const findLastCategory = findLastIndex(equals('c'))
const isBrandPage = compose(equals('b'), head)
const getLastName = compose(prop('name'), last)
const breadcrumbName = (index, breadcrumb) => path([index, 'name'], breadcrumb)

const getQueryNameIndex = mapArray => {
  if (isBrandPage(mapArray)) {
    return 0
  }
  const ftIndex = findFT(mapArray)
  if (ftIndex >= 0) {
    return ftIndex
  }
  const clusterIndex = findProductCluster(mapArray)
  if (clusterIndex >= 0) {
    return clusterIndex
  }
  const lastCategoryIndex = findLastCategory(mapArray)
  return lastCategoryIndex
}

const SearchTitle = ({ breadcrumb = [] }) => {
  const { map } = useContext(QueryContext)

  const index = useMemo(() => {
    const mapArray = map.split(',')
    return getQueryNameIndex(mapArray)
  }, [map])
  
  const title = index >= 0 ? breadcrumbName(index, breadcrumb) : getLastName(breadcrumb)
  if (!title) {
    return null
  }

  return (
    <h1 className={classNames(styles.galleryTitle, 't-heading-1')}>
      {decodeURI(title)}
    </h1>
  )
}

export default SearchTitle
