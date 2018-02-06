import React from 'react'
import { Switch, Route } from 'react-router-dom'
import MainPage from './MainPage'
import Gallery from '../containers/PhotoGallery'
import BookingStepper from './BookingStepper'
import LoginAgent from '../components/AgentComponents/LoginAgent'
import AgentTabs from '../components/AgentComponents/AgentTabs'

class Main extends React.Component{

    render(){
        return(
            <main>
                <Switch>
                    <Route exact path='/' component={MainPage}/>
                    <Route exact path='/bookingStep' component={BookingStepper}/>
                    <Route path='/gallery' component={Gallery}/>
                    <Route path='/login' component={LoginAgent}/>
                    <Route path='/agent' component={AgentTabs}/>

                </Switch>
            </main>
        )
    }
}

export default Main