import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class SpecificTech extends Component {
  state = {courseDetailsArray: [], apiStatus: apiConstants.initial}

  componentDidMount() {
    this.getSpecificTechDetails()
  }

  getFormattedObject = courseDetails => ({
    description: courseDetails.description,
    id: courseDetails.id,
    imageUrl: courseDetails.image_url,
    name: courseDetails.name,
  })

  getSpecificTechDetails = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(url)
    if (response.ok) {
      const specificDetails = await response.json()
      console.log(specificDetails)
      const courseDetailsArray = this.getFormattedObject(
        specificDetails.course_details,
      )
      console.log(courseDetailsArray)
      this.setState({courseDetailsArray, apiStatus: apiConstants.success})
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  getFetchedDataView = () => {
    const {courseDetailsArray} = this.state
    const {description, name, imageUrl} = courseDetailsArray

    return (
      <>
        <img src={imageUrl} className="specific-details-image" alt={name} />
        <div className="text-container">
          <h1 className="specific-tech-name">{name}</h1>
          <p className="tech-description">{description}</p>
        </div>
      </>
    )
  }

  getLoadingView = () => (
    <div data-testid="loader">
      <Loader type="Threedots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  getFailureView = () => (
    <>
      <img
        className="failure-view-image"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1 className="something-went-wrong">Oops! Something Went Wrong</h1>
      <p className="something-went-wrong-description">
        We cannot seem to find the page you are looking for
      </p>
      <button
        onClick={this.getSpecificTechDetails}
        className="try-again-button"
        type="button"
      >
        Retry
      </button>
    </>
  )

  getResultantView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstants.success:
        return this.getFetchedDataView()
      case apiConstants.inProgress:
        return this.getLoadingView()
      case apiConstants.failure:
        return this.getFailureView()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="specific-course-main-container">
        <Header />
        <div className="specific-details-bottom-container">
          <div className="specific-details-course-container">
            {this.getResultantView()}
          </div>
        </div>
      </div>
    )
  }
}

export default SpecificTech
