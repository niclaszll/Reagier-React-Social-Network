import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import NoImage from '../images/no-image.png'

const styles = theme => ({
  ...theme.cssStyles,
  expansionPanel: {
    marginBottom: 16,
    borderRadius: 5,
    boxShadow: 'none',
    '&::before': {
      display: 'none',
    },
  },
  contentContainer: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    flexWrap: 'wrap',
  },
  imageWrapper: {
    minWidth: '120px',
    overflow: 'hidden',
    height: '120px',
    position: 'relative',
    flex: '0 0 auto',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '50%',
  },
  mainContent: {
    padding: '20px 0',
    position: 'relative',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  textContent: {
    padding: '0 30px 0 40px',
    width: '100%',
  },
  controlsContent: {
    marginLeft: 160,
    width: '50%',
  },
  handle: {
    width: '25%',
    height: 18,
    backgroundColor: theme.palette.primary.main,
    marginBottom: 7,
  },
  date: {
    height: 14,
    width: '20%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    marginBottom: 10,
  },
  fullLine: {
    height: 15,
    width: '90%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    marginBottom: 10,
  },
  halfLine: {
    height: 15,
    width: '60%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    marginBottom: 10,
  },
})

const PostSkeleton = props => {
  const { classes } = props

  // like for loop, but more efficient
  const content = Array.from({ length: 5 }).map((item, index) => (
    <ExpansionPanel key={index} className={classes.expansionPanel}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel-${index}-content`} id={`panel-${index}-header`}>
        <div className={classes.contentContainer}>
          <div className={classes.mainContent}>
            <div className={classes.imageWrapper}>
              <img className={classes.image} src={NoImage} alt="Placeholder profile" title="Placeholder profile image" />
            </div>
            <div className={classes.textContent}>
              <div className={classes.handle} />
              <div className={classes.date} />
              <div className={classes.fullLine} />
              <div className={classes.halfLine} />
              <div className={classes.halfLine} />
            </div>
          </div>
          <div className={classes.controlsContent}>
            <div className={classes.halfLine} />
          </div>
        </div>
      </ExpansionPanelSummary>
    </ExpansionPanel>
  ))

  return <Fragment>{content}</Fragment>
}

PostSkeleton.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PostSkeleton)
