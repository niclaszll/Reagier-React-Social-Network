import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'

// MUI
import { Typography, TextField, Button, CircularProgress } from '@material-ui/core'

// Redux
import { connect } from 'react-redux'

import IconButton from '@material-ui/core/IconButton'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { loginUser } from '../redux/actions/userActions'

const styles = theme => ({
  ...theme.cssStyles,
})

class login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      errors: {},
      showPassword: false,
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.ui.errors !== prevProps.ui.errors) {
      if (this.props.ui.errors) {
        this.setState({
          errors: this.props.ui.errors,
        })
      }
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    const userData = {
      email: this.state.email,
      password: this.state.password,
    }
    this.props.loginUser(userData, this.props.history)
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handlePasswordChange = prop => event => {
    this.setState({ [prop]: event.target.value })
  }

  handleClickShowPassword = () => {
    const { showPassword } = this.state
    this.setState({ showPassword: !showPassword })
  }

  handleMouseDownPassword = event => {
    event.preventDefault()
  }

  render() {
    const {
      classes,
      ui: { loading },
    } = this.props
    const { errors, showPassword, password } = this.state
    return (
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <Typography variant="h3" className={classes.pageTitle}>
            Login
          </Typography>
          <span className={classes.visibleSeparator} />
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              helperText={errors.email}
              error={!!errors.email}
              value={this.state.email}
              onChange={this.handleChange}
              className={classes.textField}
              fullWidth
              variant="outlined"
            />
            <FormControl fullWidth variant="outlined" className={classes.textField}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                name="password"
                label="Password"
                helperText={errors.password}
                error={!!errors.password}
                fullWidth
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={this.handlePasswordChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={this.handleClickShowPassword}
                      onMouseDown={this.handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button type="submit" variant="contained" color="primary" disabled={loading} className={classes.button}>
              Login
              {loading && <CircularProgress className={classes.progress} size={30} />}
            </Button>
          </form>
        </div>
        <div className={classes.signupInfo}>
          <span>Don't have an account? Sign up </span>
          <Link to="signup">here</Link>
          <span>.</span>
        </div>
      </div>
    )
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  ui: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  user: state.user,
  ui: state.ui,
})

const mapActionsToProps = {
  loginUser,
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login))
