import './index.css'

const EachAppointment = props => {
  const {eachAppointment, onClickItemFunction} = props
  const {id, isStarred} = eachAppointment

  const onClickItemStarred = () => {
    onClickItemFunction(id)
  }
  const starImgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  return (
    <li className="li-css">
      <div className="appointmet-cointainer">
        <p>{eachAppointment.title}</p>
        <button testid="star" className="button" onClick={onClickItemStarred}>
          <img alt="star" src={starImgUrl} className="img" />
        </button>
      </div>
      <p className="date">Date: {eachAppointment.newDate}</p>
    </li>
  )
}

export default EachAppointment
