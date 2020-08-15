import React, { Component } from 'react';
import axios from 'axios'

// COMPONENTS
import NavbarSecondaryPage from '../../components/nav/NavbarSecondaryPage'
import Footer from '../../components/nav/Footer'
import TryItOutLanding from '../../components/tryout/TryItOutLanding'
import TryItOutInfo from '../../components/tryout/TryItOutInfo'

class TryItOutPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
          videoLibrary: [],
          videoLibraryFiltered: [],
        }
    
        this.getVideos = this.getVideos.bind(this)
      }

    componentDidMount() {
        this.getVideos()
      }
    


    getVideos = () => {
        axios.get('/sampleVideos').then(res => {
            let files = res.data
            let videoLibrary = files.filter(file => {
              return file.contentType === 'video/quicktime' && file.sampleVideo === "true"
            })
            this.setState({
                videoLibrary: videoLibrary,
                videoLibraryFiltered: videoLibrary
            }, () => {
              console.log(this.state.videoLibrary);
            })
          });
        }

    render() {                                                                  
        return (
          <div className='appPageMainDiv'>
              <div className="navbarDiv">
                <NavbarSecondaryPage />
              </div>
              <div className="contentsDiv">
                <TryItOutLanding />
                <TryItOutInfo 
                    videoLibraryFiltered={this.state.videoLibraryFiltered}
                />
              </div>
              <div className="footerDiv">
                <Footer />
              </div>
          </div>
        )
    }
}

export default TryItOutPage