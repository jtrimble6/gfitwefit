import React, { Component } from 'react';
import TryItOutPreviewVideos from './TryItOutPreviewVideos'

// CSS
import '../../css/tryout/tryItOutInfo.css'

class TryItOutInfo extends Component {

    render() {                                                                  
        return (
            <div className='tryItOutPreview'>
              <div className='tryItOutPreviewSection'>
                <TryItOutPreviewVideos
                  videoLibraryFiltered={this.props.videoLibraryFiltered}
                />
              </div>
            </div>
        )
    }
}

export default TryItOutInfo