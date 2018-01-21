import React from 'react';
import LastRowRangeela from './LastRowRangeela'
import TopBusRow from './TopBusRow'
require('../../scss/style.scss');


class TopLayoutRangeela extends React.Component{
        constructor(props){
            super(props)
        }

        render(){
            return(
                <div>
                    <TopBusRow book={this.props.book}/>
                    <TopBusRow/>
                    <TopBusRow/>
                    <TopBusRow/>
                    <TopBusRow/>
                    <LastRowRangeela/>
                </div>
            )
        }
}

export default TopLayoutRangeela;