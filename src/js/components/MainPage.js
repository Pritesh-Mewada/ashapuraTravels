import React from 'react'
import {Container ,Row,Col} from 'react-grid-system'
import Paper from "material-ui/Paper"
import Divider from 'material-ui/Divider';
import SelectBus from './SelectBus'

const paperStyle={
    margin:40,
    background: "linear-gradient(135deg, rgba(255,130,68,1) 0%, rgba(253,61,83,1) 100%)",
    padding:10
};

const paperStyleBlue={
    margin:40,
    background: "linear-gradient(135deg, rgba(50,244,233,1) 0%, rgba(135,67,252,1) 100%)",
    padding:10
};

const paperStyleService={
    margin:40,
    background: "linear-gradient(135deg, rgba(184,31,230,1) 0%, rgba(36,181,252,1) 100%)",
    padding:10,
    borderRadius:10
};

const paperStyleSupport={
    margin:40,
    background: "linear-gradient(135deg, rgba(212,252,121,1) 0%, rgba(150,230,161,1) 100%)",
    padding:10,
    borderRadius:10

};

const paperStyleGuarantee={
    margin:40,
    background: "linear-gradient(135deg, rgba(245,87,108,1) 0%, rgba(240,147,251,1) 100%)",
    padding:10,
    borderRadius:10
};
const fontStyle={
    fontSize:18,
    color:"#fff",
    marginLeft:10
};
const liveTracking={
    backgroundColor:"#fff800"
};
const imageAlign={
    marginTop:10,
    marginLeft:100

};

const iconAlign={
};
const spanStyle={
    fontWeight:600,
    fontFamily:"Roboto",
    color:"#fff",
    fontSize:20,
    position:"Relative",
    top:-6

};
const pStyle={
    fontSize:18,
    color:"#fff"
}
const textAlignHeader={
    marginTop:120,
    fontWeight:900
};


class MainPage extends React.Component{
    render(){
        return(
            <div>
                <SelectBus/>
                <Container fluid >
                    <Row align="end">
                        <Col md={5} offset={{ md: 1 }} >
                            <Paper style={paperStyle} zDepth={3}>
                                <h5>Top Destinations</h5>
                                <Divider/>
                                <ul>
                                    <li style={fontStyle}>Mumbai to Sagwara</li>
                                    <li style={fontStyle}>Mumbai to Banswara</li>
                                    <li style={fontStyle}>Mumbai to Dungarpur</li>
                                    <li style={fontStyle}>Sagwara to Mumbai</li>
                                    <li style={fontStyle}>Dungarpur to Mumbai</li>
                                </ul>

                            </Paper>

                        </Col>
                        <Col md={5}>
                            <Paper style={paperStyleBlue} zDepth={3}>
                                <h5>Latest News</h5>
                                <Divider/>
                                <ul>
                                    <li style={fontStyle}>Mumbai to Sagwara</li>
                                    <li style={fontStyle}>Mumbai to Banswara</li>
                                    <li style={fontStyle}>Mumbai to Dungarpur</li>
                                    <li style={fontStyle}>Sagwara to Mumbai</li>
                                    <li style={fontStyle}>Dungarpur to Mumbai</li>
                                </ul>
                            </Paper>
                        </Col>
                    </Row>

                    <Row style={liveTracking}>
                        <Col md={5}>
                            <img src={require('../../images/gps.png')}  alt="logo" style={imageAlign}/>

                        </Col>
                        <Col md={7}>
                            <h3 style={textAlignHeader}>Live Bus Tracking....</h3>
                            <br/>
                            <h5>Take current bus location through your fingertips <br/> easily stay notified always.....</h5>

                        </Col>
                    </Row>

                <Row>
                    <Col md={4}>
                        <Paper style={paperStyleService} zDepth={3}>
                            <img src={require('../../images/thumb.png')}  alt="logo" style={iconAlign}/> <span style={spanStyle}>Highly Qualified Service</span>
                            <p style={pStyle}>Our high level of service is officially recognised by thousands of clients.</p>
                        </Paper>
                    </Col>
                    <Col md={4}>
                        <Paper style={paperStyleSupport} zDepth={3}>
                            <img src={require('../../images/price.png')}  alt="logo" style={iconAlign}/> <span style={spanStyle}>Highly Qualified Service</span>
                            <p style={pStyle}>Our high level of service is officially recognised by thousands of clients.</p>
                        </Paper>
                    </Col>
                    <Col md={4}>
                        <Paper style={paperStyleGuarantee} zDepth={3}>
                            <img src={require('../../images/care.png')}  alt="logo" style={iconAlign}/> <span style={spanStyle}>Highly Qualified Service</span>
                            <p style={pStyle}>Our high level of service is officially recognised by thousands of clients.</p>
                        </Paper>
                    </Col>

                </Row>
                </Container>

            </div>
        )
    }
}

export default MainPage