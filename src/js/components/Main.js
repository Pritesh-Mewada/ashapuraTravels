import React from 'react'
import { Switch, Route } from 'react-router-dom'
import MainPage from './MainPage'
import Gallery from '../containers/PhotoGallery'
import BookingStepper from './BookingStepper'
import LoginAgent from '../components/AgentComponents/LoginAgent'
import AgentTabs from '../components/AgentComponents/AgentTabs'
import CheckPNR from '../components/CheckPNR'
import knowUs from '../containers/knowUs'
class Main extends React.Component{

    render(){
        return(
            <main>
                <Switch>
                    <Route exact path='/' component={MainPage}/>
                    <Route exact path='/app/bookingStep' component={BookingStepper}/>
                    <Route path='/app/gallery' component={Gallery}/>
                    <Route path='/app/login' component={LoginAgent}/>
                    <Route path='/app/agent' component={AgentTabs}/>
                    <Route path='/app/pnr' component={CheckPNR} />
                    <Route path='/app/knowUs' component={knowUs} />

                </Switch>
            </main>
        )
    }
}

export default Main