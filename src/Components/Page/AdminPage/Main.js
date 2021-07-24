import React from 'react';
//import SideMenu from "../components/SideMenu";
import { makeStyles, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
//import Header from "../components/Header";
//import PageHeader from '../components/PageHeader';
import Background6 from '../../Template/Background6/Background6';

import BookAdminPage from "./BookAdminPage";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#333996",
      light: '#3c44b126'
    },
    secondary: {
      main: "#f83245",
      light: '#f8324526'
    },
    background: {
      default: "#f4f5fd"
    },
  },
  overrides:{
    MuiAppBar:{
      root:{
        transform:'translateZ(0)'
      }
    }
  },
  props:{
    MuiIconButton:{
      disableRipple:true
    }
  }
})


const useStyles = makeStyles({
  appMain: {
    
    //justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    // display: 'flex',
    width: window.width,
    height: window.height,
    flex: 1,
    overflowY: 'scroll',
    paddingTop: 50,
    position: 'absolute',
    zIndex: 5,
    top:0,
    left: 0,
    right: 0,
    bottom: 0,

  }
})

function Main() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      {/* <SideMenu /> */}
      <Background6>
      <div className={classes.appMain}  >
        {/* <Header /> */}
        
        <BookAdminPage />
      </div>
      </Background6>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default Main;
