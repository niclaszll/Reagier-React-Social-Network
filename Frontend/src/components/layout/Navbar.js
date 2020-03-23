import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import withStyles from '@material-ui/core/styles/withStyles'

// Redux
import { connect } from 'react-redux'

// MUI stuff
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle'
import Notifications from './Notifications'
import PostPost from '../post/PostPost'
import CustomButton from '../../util/CustomButton'

const styles = theme => ({
  ...theme.cssStyles,
  navbar: {
    flexGrow: 1,
    '& svg, & h6': {
      color: '#ffffff',
    },
  },
  title: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
  },
})

export class Navbar extends Component {
  render() {
    const { authenticated, classes } = this.props
    let linkContainer

    if (authenticated) {
      linkContainer = (
        <Fragment>
          <PostPost />
          <Notifications />
        </Fragment>
      )
    } else {
      linkContainer = (
        <Fragment>
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
          <Button color="inherit" component={Link} to="/signup">
            Signup
          </Button>
        </Fragment>
      )
    }

    return (
      <div className={classes.navbar}>
        <AppBar position="static">
          <Toolbar variant="regular">
            <Link to="/" className={classes.title} color="inherit">
              <CustomButton tip="Home">
                <SupervisedUserCircleIcon className={classes.icon} />
              </CustomButton>
              <Typography edge="start" variant="h6" noWrap>
                Reagier
              </Typography>
            </Link>
            {linkContainer}
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  authenticated: state.user.authenticated,
})

export default connect(mapStateToProps)(withStyles(styles)(Navbar))
