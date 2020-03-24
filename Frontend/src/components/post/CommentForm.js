import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

// Redux
import { connect } from 'react-redux'

// MUI
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { submitComment } from '../../redux/actions/dataActions'

const styles = theme => ({
  ...theme.cssStyles,
  formContainer: {
    textAlign: 'center',
    width: '100%',
  },
  commentForm: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px 25px 20px',
    '@media (max-width: 600px)': {
      padding: '0 0 15px 0',
    },
  },
  textField: {
    flexGrow: 1,
    marginRight: 30,
    '@media (max-width: 600px)': {
      marginRight: 15,
    },
  },
  button: {
    margin: 0,
  },
})

class CommentForm extends Component {
  state = {
    body: '',
    errors: {},
  }

  componentDidUpdate(prevProps) {
    if (this.props.ui.errors !== prevProps.ui.errors) {
      this.setState({ errors: this.props.ui.errors })
    }
    if (this.props !== prevProps) {
      if (!this.props.ui.errors && !this.props.ui.loading) {
        this.setState({ body: '' })
      }
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.submitComment(this.props.postId, { body: this.state.body })
  }

  render() {
    const { classes, authenticated } = this.props
    const { errors, body } = this.state
    const commentFormMarkup = authenticated ? (
      <Grid item className={classes.formContainer}>
        <form className={classes.commentForm} onSubmit={this.handleSubmit}>
          <TextField
            name="body"
            type="text"
            label="Create a comment ..."
            variant="outlined"
            error={errors != null ? !!errors.comment : false}
            helperText={errors != null ? errors.comment : ''}
            value={body}
            onChange={this.handleChange}
            fullWidth
            className={classes.textField}
          />
          <Button type="submit" variant="contained" color="primary" className={classes.button}>
            Submit
          </Button>
        </form>
      </Grid>
    ) : null
    return commentFormMarkup
  }
}

CommentForm.propTypes = {
  classes: PropTypes.object.isRequired,
  submitComment: PropTypes.func.isRequired,
  ui: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  postId: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  ui: state.ui,
  authenticated: state.user.authenticated,
})

export default connect(mapStateToProps, { submitComment })(withStyles(styles)(CommentForm))
