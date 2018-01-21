import React from 'react';

const sleepStyle={
    backgroundColor:"#ff00ff",
    width:"45px",
    height:"80px",
    borderRadius:"8px",
    boxShadow:"2px 2px 5px #2d2d2d"
};

const pillow={
    backgroundColor:"#ff00ff",
    width:"25px",
    height:"10px",
    borderRadius:"8px",
    boxShadow:"0px 2px 5px #2d2d2d",
    margin:"auto"
};

const containerWidth={
    width:"200px"

};
const TopBus={
    float :"left",
    marginLeft:"5px",
    marginTop:'5px'
};
const TopBusMid={
    float :"left",
    marginLeft:"50px",
    marginTop:'5px'
};



const sleepStyleHorizontal={
    width:"100px",
    height:"40px",
    backgroundColor:"#ff00ff",
    marginTop:"2px",
    borderRadius:"8px",
    boxShadow:"2px 2px 5px #2d2d2d"
};

const pillowHorizontal ={
    backgroundColor:"#ff00ff",
    width:"10px",
    height:"25px",
    borderRadius:"8px",
    boxShadow:"0px 2px 5px #2d2d2d",
    marginTop:"7px",
    float:"right"
};



class LastRowRangeela extends React.Component {
    render() {
        return (
            <div style={containerWidth}>
                <div style={TopBus}>
                    <div style={sleepStyle}>
                        <div style={pillow}></div>
                    </div>
                </div>

                <div style={TopBusMid}>
                    <div style={sleepStyleHorizontal}>
                        <div style={pillowHorizontal}></div>
                    </div>
                    <div style={sleepStyleHorizontal}>
                        <div style={pillowHorizontal}></div>
                    </div>

                </div>
            </div>

        )
    }
}

export default LastRowRangeela