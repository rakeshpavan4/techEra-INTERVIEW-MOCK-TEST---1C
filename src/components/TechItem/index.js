import {Link} from 'react-router-dom'
import './index.css'

const TechItem = props => {
  const {techDetails} = props
  const {id, name, logoUrl} = techDetails
  return (
    <Link className="link-item" to={`/courses/${id}`}>
      <li className="each-tech-name-image-container">
        <img src={logoUrl} className="tech-thumbnail-image" alt={name} />
        <p className="tech-name">{name}</p>
      </li>
    </Link>
  )
}

export default TechItem
