export default {
  palette: {
    primary: {
      main: '#2F4678',
    },
    secondary: {
      main: '#147D64',
    },
  },
  cssStyles: {
    postContainer: {
      flexGrow: 0,
      maxWidth: '66.666667%',
      flexBasis: '66.666667%',
      '@media (max-width: 1150px)': {
        maxWidth: '60%',
        flexBasis: '60%',
      },
      '@media (max-width: 950px)': {
        maxWidth: '100%',
        flexBasis: '100%',
        order: 2,
      },
    },
    userProfileContainer: {
      flexGrow: 0,
      maxWidth: '33.333333%',
      flexBasis: '33.333333%',
      '@media (max-width: 1150px)': {
        maxWidth: '40%',
        flexBasis: '40%',
      },
      '@media (max-width: 950px)': {
        maxWidth: '100%',
        flexBasis: '100%',
        order: 1,
      },
    },
    typography: {
      useNextVariants: true,
    },
    formContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      marginTop: 30,
    },
    form: {
      textAlign: 'center',
      maxWidth: 600,
      borderRadius: 5,
      background: '#ffffff',
      padding: 35,
      '& form': {
        marginTop: 15,
      },
    },
    pageTitle: {
      marginBottom: 20,
    },
    textField: {
      margin: '10px 0',
    },
    button: {
      marginTop: 30,
      position: 'relative',
    },
    customError: {
      color: 'red',
      fontSize: '0.8rem',
      marginTop: 10,
    },
    signupInfo: {
      width: '100%',
      textAlign: 'center',
      marginTop: 25,
    },
    progress: {
      position: 'absolute',
    },
    invisibleSeparator: {
      border: 'none',
      margin: 4,
    },
    visibleSeparator: {
      width: '100%',
      height: 2,
      backgroundColor: '#E9ECF0',
      display: 'block',
    },
    paper: {
      borderRadius: 5,
      boxShadow: 'none',
      overflow: 'hidden',
    },
    dialogActions: {
      backgroundColor: '#E9ECF0',
      padding: '16px 24px',
    },
    dialogContent: {
      padding: '16px 24px',
    },
    noUserProfile: {
      padding: 20,
    },
    profile: {
      '& .upper-background': {
        height: '150px',
        position: 'relative',
        backgroundColor: '#2f4678',
      },
      '& .image-wrapper': {
        position: 'relative',
        left: '20px',
        transform: 'translateY(50%)',
        width: 150,
        height: 150,
        '& .profile-image': {
          width: 150,
          height: 150,
          objectFit: 'cover',
          maxWidth: '100%',
          borderRadius: '50%',
          border: '4px solid #ffffff',
        },
        '& button': {
          position: 'absolute',
          top: '75px',
          left: '75px',
          transform: 'translateX(-50%) translateY(-50%)',
          opacity: '0',
          color: '#ffffff',
          transition: 'opacity 0.2s ease-out',
          '&:hover': {
            opacity: '1',
          },
        },
      },
      '& .lower-content': {
        padding: '10px 20px 20px 20px',
      },
      '& .profile-details': {
        '& .profile-details-top': {
          marginLeft: 170,
          paddingBottom: 30,
        },
        '& .profile-details-main': {
          marginTop: 20,
          padding: '0 5px',
          '& div': {
            marginBottom: 8,
          },
          '& .additional-info': {
            marginTop: 20,
            '& div': {
              marginRight: 10,
            },
            '& svg': {
              marginRight: 5,
            },
          },
        },
        '& span, svg': {
          verticalAlign: 'middle',
        },
        '& a': {
          color: '#2F4678',
        },
      },
      '& svg.button': {
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
    buttons: {
      textAlign: 'center',
      '& a': {
        margin: '20px 10px',
      },
    },
  },
}
