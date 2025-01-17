import classNames from 'classnames'
import React, { useContext } from 'react'
import { injectIntl } from 'react-intl'
import { IconClose } from 'vtex.styleguide'
import { NoSSR } from 'vtex.render-runtime'

import QueryContext from './QueryContext'
import Collapsible from './Collapsible'
import CategoryItem from './CategoryItem'

import styles from '../searchResult.css'

const getSelectedCategories = rootCategory => {
  let node = rootCategory.children
  const selectedCategories = [rootCategory]

  while (node) {
    const category = node.find(category => category.selected)

    if (!category) {
      break
    }

    selectedCategories.push(category)
    node = category.children
  }

  return selectedCategories
}

const CategoryFilter = ({ category, shallow = false, onCategorySelect }) => {
  const { map } = useContext(QueryContext)

  const selectedCategories = getSelectedCategories(category)

  const handleUnselectCategories = index => {
    const categoriesToRemove = selectedCategories.slice(index)

    onCategorySelect(categoriesToRemove)
  }

  const lastSelectedCategory = selectedCategories[selectedCategories.length - 1]

  const canDisableRoot = map.split(',').includes('ft')

  const handleRootCategoryClick = () => {
    if (!canDisableRoot) {
      return
    }

    if (shallow) {
      onCategorySelect(category)
    } else {
      // deselect root category
      handleUnselectCategories(0)
    }
  }

  return (
    <div className={classNames(styles.categoryGroup, 'mt4')}>
      <div
        role="button"
        tabIndex={canDisableRoot ? 0 : -1}
        className={classNames(styles.categoryParent, 'flex items-center pointer')}
        onClick={handleRootCategoryClick}
        onKeyDown={e => e.key === 'Enter' && handleRootCategoryClick()}
      >
        <div className="flex-grow-1 dim">
          <span className={classNames(styles.categoryItemName, 'f5 c-on-base')}>
            {category.name}
          </span>
        </div>
        {!shallow && canDisableRoot && (
          <span
            className={classNames(
              styles.selectedCategoryIcon,
              'flex items-center c-muted-3'
            )}
          >
            <IconClose size={14} />
          </span>
        )}
      </div>
      <div
        className={classNames(
          styles.categoryItemChildrenContainer,
          'pl5 pl0-ns'
        )}
      >
        {selectedCategories.slice(1).map((subCategory, index) => (
          <span
            key={subCategory.id}
            role="button"
            tabIndex={0}
            className={classNames(
              styles.selectedCategory,
              'mt5 mt4-ns flex items-center justify-between pointer f5 f6-ns'
            )}
            onClick={() => handleUnselectCategories(index + 1)}
            onKeyDown={e =>
              e.key === 'Enter' && handleUnselectCategories(index + 1)
            }
          >
            <span className={styles.selectedCategoryName}>
              {subCategory.name}
            </span>
            <span
              className={classNames(
                styles.selectedCategoryIcon,
                'flex items-center c-muted-3'
              )}
            >
              <IconClose size={14} />
            </span>
          </span>
        ))}
        {lastSelectedCategory.children &&
          lastSelectedCategory.children.length > 0 && (
            <div
              className={classNames({
                'mt5 mt4-ns bl b--muted-4': !shallow,
                mt2: shallow,
              })}
            >
             <NoSSR>
              <Collapsible
                items={lastSelectedCategory.children}
                maxItems={8}
                threshold={2}
                linkClassName="ml3"
                openLabel="store/filter.more-categories"
                render={(childCategory, index) => (
                  <CategoryItem
                    key={childCategory.id}
                    className={classNames({
                      mt2: index === 0 && !shallow,
                    })}
                    onClick={() =>
                      onCategorySelect(
                        shallow ? [category, childCategory] : childCategory
                      )
                    }
                    label={childCategory.name}
                  />
                )}
              />
             </NoSSR>
            </div>
          )}
      </div>
    </div>
  )
}

export default injectIntl(CategoryFilter)
