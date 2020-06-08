import React, { Component } from 'react';
import TryItOutPreviewVideos from './TryItOutPreviewVideos'
import '../css/tryItOutInfo.css'

class TryItOutInfo extends Component {

    render() {                                                                  
        return (
            <div className='tryItOutPreview'>
              <div className='tryItOutPreviewSection'>
                <TryItOutPreviewVideos />
              </div>
            </div>
        )
    }
}

export default TryItOutInfo