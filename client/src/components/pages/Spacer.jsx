import React, { Component } from 'react';
import '../../css/spacer.css'

class Spacer extends Component {

    constructor(props) {
      super(props);
      this.state = {

      }
 
    }



    render() {                                                                  
        return (
          <div className='spacer'>
            <hr className='spacerLine'></hr>
          </div>
        )
    }
}

export default Spacer