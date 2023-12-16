import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TechItem from '../TechItem'
import Header from '../Header'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

// Replace your code here
class Home extends Component {
  state = {coursesArray: [], apiStatus: apiConstants.initial}

  componentDidMount() {
    this.fetchTechnologiesData()
  }

  getFormattedResponseArray = technology => ({
    id: technology.id,
    name: technology.name,
    logoUrl: technology.logo_url,
  })

  fetchTechnologiesData = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const url = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(url)
    if (response.ok) {
      const coursesResponseData = await response.json()
      const coursesArray = coursesResponseData.courses.map(eachTech =>
        this.getFormattedResponseArray(eachTech),
      )
      this.setState({coursesArray, apiStatus: apiConstants.success})
    }
    // console.log(coursesResponseData)
    // console.log(coursesArray)
    else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  getLoadingView = () => (
    <div data-testid="loader">
      <Loader type="Threedots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  getFetchedDataView = () => {
    const {coursesArray} = this.state
    return (
      <>
        <h1 className="courses-heading">Courses</h1>
        <ul className="all-technologies-container">
          {coursesArray.map(eachTech => (
            <TechItem techDetails={eachTech} key={eachTech.id} />
          ))}
        </ul>
      </>
    )
  }

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
        onClick={this.fetchTechnologiesData}
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
      <div className="page-main-container">
        <Header />
        <div className="bottom-container">{this.getResultantView()}</div>
      </div>
    )
  }
}

export default Home
