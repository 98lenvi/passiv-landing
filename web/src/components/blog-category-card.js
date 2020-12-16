import {Link} from 'gatsby'
import React from 'react'
import {cn} from '../lib/helpers'
import styles from './blog-category-card.module.css'
import { capitalize } from './typography.module.css'

function BlogPostPreview (props) {
  return (
    <div>
    <Link
      className={props.isInList}
      to={props.slug}
      style={{height:'inherit'}}
    >
      <div className={styles.leadMediaThumb} >
      <h2 className={cn(styles.title, capitalize)}>{props.title}</h2>
      </div>
    </Link>
    </div>
  )
}

export default BlogPostPreview
