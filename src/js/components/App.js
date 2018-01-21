import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AlertDialogue from './AlertDialogue'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import NavBar from './NavBar'
import Main from './Main'
import ProgressDialogue from './ProgressDialogue'

//require('../../css/style.css');


const muiTheme = getMuiTheme({
    raisedButton: {
        fontSize:14,
    }
});


class App extends React.Component{
    constructor(){
        super();

    }

    render(){
        return(
            <div>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <div>
                        <AlertDialogue/>
                        <NavBar/>
                        <Main/>
                        <ProgressDialogue/>
                    </div>
                </MuiThemeProvider>
            </div>
        )
    }

}

export default App