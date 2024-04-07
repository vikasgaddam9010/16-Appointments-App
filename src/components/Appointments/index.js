import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'

import EachAppointment from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    title: '',
    actualDate: '',
    isStarred: '',
    appiontmentsList: [],
    isBtnClicked: false,
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {title, actualDate, isStarred, appiontmentsList} = this.state
    const fDate = actualDate
      ? format(new Date(actualDate), 'dd MMMM yyyy, EEEE')
      : ''
    const newApp = {
      id: uuidv4(),
      title,
      newDate: fDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appiontmentsList: [...prevState.appiontmentsList, newApp],
      actualDate: '',
      title: '',
    }))
  }
  onClickItemFunction = id => {
    const {appiontmentsList} = this.state
    appiontmentsList.map(each => {
      if (each.id === id) {
        this.setState(prevState => ({
          appiontmentsList: prevState.appiontmentsList.map(each => {
            if (each.id === id) {
              return {...each, isStarred: !each.isStarred}
            }
            return each
          }),
        }))
      }
    })
  }

  onClickStarredBtn = () => {
    const {isBtnClicked} = this.state
    this.setState({isBtnClicked: !isBtnClicked})
  }

  onClickTextInput = event => {
    const {title} = this.state
    this.setState({title: event.target.value})
  }

  onClickDateInput = event => {
    const {actualDate} = this.state
    this.setState({actualDate: event.target.value})
  }

  getStarredList = () => {
    const {appiontmentsList, isBtnClicked} = this.state
    const {isStarred} = appiontmentsList
    if (isBtnClicked) {
      return appiontmentsList.filter(each => each.isStarred === isBtnClicked)
    } else {
      return appiontmentsList
    }
  }
  render() {
    const {title, actualDate, appiontmentsList, isBtnClicked} = this.state
    const functAbc = this.getStarredList()
    console.log(functAbc)
    return (
      <div className="bg-container">
        <div className="container">
          <div className="row-css">
            <div>
              <h1>Add Appointment</h1>
              <form onSubmit={this.onAddAppointment} className="column-css">
                <label className="label-text" htmlFor="title">
                  TITLE
                </label>
                <input
                  id="title"
                  className="label"
                  value={title}
                  type="text"
                  onChange={this.onClickTextInput}
                  placeHolder="Title"
                />
                <label className="label-text" htmlFor="date">
                  DATE
                </label>
                <input
                  id="date"
                  className="label"
                  type="date"
                  value={this.state.actualDate}
                  onChange={this.onClickDateInput}
                  placeHolder="dd/mm/yyyy"
                />

                <button type="submit" testid="star" className="btn">
                  Add
                </button>
              </form>
            </div>
            <img
              alt="appointments"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              className="image"
            />
          </div>
          <hr className="hr" />
          <div className="appointment-container">
            <h1>Appointments</h1>
            <button onClick={this.onClickStarredBtn} className="btn-starred">
              <p className={isBtnClicked ? 'somthing' : 'starred-css'}>
                Starred
              </p>
            </button>
          </div>
          <ul className="ul">
            {functAbc.map(eachAppointment => (
              <EachAppointment
                key={eachAppointment.id}
                eachAppointment={eachAppointment}
                onClickItemFunction={this.onClickItemFunction}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
