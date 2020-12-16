import {Link} from 'gatsby'
import React from 'react'
import BlogPostPreview from './blog-post-preview'

import styles from './blog-post-preview-list.module.css'
import {cn} from '../lib/helpers'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import BlogCategoryCard from './blog-category-card'; 
import {capitalize} from './typography.module.css'

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

function ArrowSVG () {
  return(
  <svg width="11px" height="18px" viewBox="0 0 7 11" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <g transform="translate(-497.000000, -623.000000)" fill-rule="nonzero" stroke="currentColor" stroke-width="2">
        <g transform="translate(409.000000, 612.000000)">
          <polyline transform="translate(89.242641, 16.242641) rotate(-135.000000) translate(-89.242641, -16.242641) " points="92.2426407 19.2426407 86.2426407 19.2426407 86.2426407 13.2426407">
          </polyline>
       </g>
      </g>
    </g>
  </svg>)
}

function BlogPostPreviewGrid (props) {

  const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
    const { carouselState: { currentSlide,slidesToShow, deviceType, totalItems } } = rest;
    const displayPrev = currentSlide != 0
    let displayNext = totalItems <= responsive[deviceType].items ? false : currentSlide < slidesToShow
    return (
      <div className={styles.carouselbuttongroup}>
        <button className={cn(styles.carouselbutton, !displayPrev && styles.carouselbuttondisabled)} onClick={() => previous()} ><ArrowSVG/></button>
        <button className={cn(styles.carouselbutton, !displayNext && styles.carouselbuttondisabled)} onClick={() => next()} ><ArrowSVG/></button>
      </div>
    );
  };

  return (
    <div className={styles.root}>
      {props.title && <Link to={props.browseMoreHref}><h2 className={cn(styles.titleMobile, capitalize)}>{props.title}</h2></Link>}
      <Carousel
        responsive={responsive}
        itemClass={styles.item}
        containerClass={cn(styles.col3, styles.carouselroot)}
        arrows={false} 
        customButtonGroup={<ButtonGroup />}
      >
          <BlogCategoryCard
            title={props.title}
            slug={props.browseMoreHref}
          />
        {props.nodes &&
          props.nodes.map(node => (
              <BlogPostPreview {...node} isInList />
          ))}
      </Carousel>
      {/* {props.browseMoreHref && (
        <div className={styles.browseMoreNav}>
          <Link className={styles.btn1} to={props.browseMoreHref}>Browse more</Link>
        </div>
      )} */}
    </div>
  )
}

BlogPostPreviewGrid.defaultProps = {
  title: '',
  nodes: [],
  browseMoreHref: ''
}

export default BlogPostPreviewGrid
