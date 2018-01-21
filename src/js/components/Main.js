import React from 'react'
import { Switch, Route } from 'react-router-dom'
import MainPage from './MainPage'
import Gallery from '../containers/PhotoGallery'
import BookingStepper from './BookingStepper'
class Main extends React.Component{

    render(){
        return(
            <main>
                <Switch>
                    <Route exact path='/' component={MainPage}/>
                    <Route exact path='/bookingStep' component={BookingStepper}/>
                    <Route path='/gallery' component={Gallery}/>
                </Switch>
            </main>
        )
    }
}

export default Main