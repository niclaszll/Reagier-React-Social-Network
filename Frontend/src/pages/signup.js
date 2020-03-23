import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'

// MUI
import { Typography, TextField, Button, CircularProgress } from '@material-ui/core'

// Redux
import { connect } from 'react-redux'
import { signupUser } from '../redux/actions/userActions'

const styles = theme => ({
  ...theme.cssStyles,
})

export class signup extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      handle: '',
      errors: {},
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ui.errors) {
      this.setState({
        errors: nextProps.ui.errors,
      })
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle,
    }
    this.props.signupUser(newUserData, this.props.history)
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {
    const {
      classes,
      ui: { loading },
    } = this.props
    const { errors } = this.state
    return (
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <Typography variant="h3" className={classes.pageTitle}>
            Signup
          </Typography>
          <span className={classes.visibleSeparator} />
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              helperText={errors.email}
              error={!!errors.email}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
              variant="outlined"
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.textField}
              helperText={errors.password}
              error={!!errors.password}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
              variant="outlined"
            />
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              className={classes.textField}
              helperText={errors.confirmPassword}
              error={!!errors.confirmPassword}
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              fullWidth
              variant="outlined"
            />
            <TextField
              id="handle"
              name="handle"
              type="text"
              label="Handle"
              className={classes.textField}
              helperText={errors.handle}
              error={!!errors.handle}
              value={this.state.handle}
              onChange={this.handleChange}
              fullWidth
              variant="outlined"
            />
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button type="submit" variant="contained" color="primary" disabled={loading} className={classes.button}>
              Signup
              {loading && <CircularProgress className={classes.progress} size={30} />}
            </Button>
          </form>
        </div>
        <div className={classes.signupInfo}>
          <span>Already have an account? Login </span>
          <Link to="login">here</Link>
          <span>.</span>
        </div>
      </div>
    )
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  ui: state.ui,
})

export default connect(mapStateToProps, { signupUser })(withStyles(styles)(signup))
