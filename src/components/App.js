import React from 'react'
import countries from '../data/countries'
import cities from '../data/cities'
import Field from './Field'

export default class App extends React.Component {
  constructor() {
    super()

    this.state = {
      username: '',
      password: '',
      repeatPassword: '',
      country: '1',
      city: '1',
      gender: '',
      email: '',
      mobile: '',
      agree: false,
      avatar: '',
      errors: {},
      age: '16',
    }
  }

  onSubmit = event => {
    event.preventDefault()
    const errors = {}
    if (this.state.username.length < 5) {
      errors.username = 'Reqiured. Must be 5 characters or more'
    }

    if (this.state.password.length < 4) {
      errors.password = 'Reqiured. Must be 4 characters or more'
    }

    if (this.state.repeatPassword !== this.state.password) {
      errors.repeatPassword = 'Must be equal to password'
    }

    if (
      !this.state.email.includes('@' && '.', 3) ||
      this.state.email.trim().length < 5
      // this.state.email.indexOf("@") =< 3 &&
      // this.state.email.indexOf(".") >= -3
    ) {
      console.log('this.state.email', this.state.email, 'invalid emeail')
      errors.email = 'Invalid email address'
    }

    if (this.state.mobile.length !== 10) {
      console.log('this.state.mobile', this.state.mobile)
      errors.mobile = 'Invalid mobile'
    }

    if (this.state.age < 18) {
      errors.age = 'You must be older 18'
    }

    if (Object.keys(errors).length > 0) {
      this.setState({
        errors: errors,
      })
      console.log('errors', this.state.errors)
    } else {
      this.setState({
        errors: {},
      })
      console.log('submit', this.state)
    }
  }

  onChange = event => {
    console.log('event target name', event.target.value)
    console.log('state country city', this.state.country, this.state.city)
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  onChangeAgree = event => {
    console.log('event target checked', event.target.checked)
    this.setState({
      [event.target.name]: event.target.checked,
    })
  }

  onChangeAvatar = event => {
    const reader = new FileReader()
    reader.onload = event => {
      this.setState({
        avatar: event.target.result,
      })
    }
    reader.readAsDataURL(event.target.files[0])
    console.log(event.target.files[0])
  }

  getOptionItems = Items =>
    Items.map(item => (
      <option key={item.id} value={item.id}>
        {item.name}
      </option>
    ))

  render() {
    console.log(this)

    // console.log(getOptionCountries)
    const {country, city, mobile, email, gender, username, password, errors, repeatPassword, age, agree} = this.state
    return (
      <div className="form-container card">
        <form className="form card-body">
          <Field
            labelText="Username"
            id="username"
            type="text"
            placeholder="Enter username"
            name="username"
            value={username}
            onChange={this.onChange}
            error={errors.username}
          />

          <Field
            labelText="Password"
            id="password"
            type="password"
            placeholder="Enter password"
            name="password"
            value={password}
            onChange={this.onChange}
            error={errors.password}
          />

          <Field
            labelText="Repeat password"
            id="repeatPassword"
            type="password"
            placeholder="Enter repeat password"
            name="repeatPassword"
            value={repeatPassword}
            onChange={this.onChange}
            error={errors.repeatPassword}
          />

          <div>Gender</div>
          <div className="form-check-inline">
            <label className="form-check-label">
              <input
                type="radio"
                className="form-check-input"
                name="gender"
                id="female"
                value="female"
                checked={gender === 'female' ? 'active' : ''}
                onChange={this.onChange}
              />
              Female
            </label>
          </div>
          <div className="form-check-inline">
            <label className="form-check-label">
              <input
                type="radio"
                className="form-check-input"
                name="gender"
                id="male"
                value="male"
                checked={gender === 'male' ? 'active' : ''}
                onChange={this.onChange}
              />
              Male
            </label>
          </div>
          <div className="form-check-inline">
            <label className="form-check-label">
              <input
                type="radio"
                className="form-check-input"
                name="gender"
                id="not binary"
                value="not binary"
                checked={gender === 'not binary' ? 'active' : ''}
                onChange={this.onChange}
              />
              Not binary
            </label>
          </div>

          <Field
            labelText="Email"
            id="email"
            type="text"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={this.onChange}
            error={errors.email}
          />

          <Field
            labelText="Mobile number"
            id="mobile"
            type="number"
            placeholder="Mobile"
            name="mobile"
            value={mobile}
            onChange={this.onChange}
            error={errors.mobile}
          />

          <div className="form-group">
            <label htmlFor="country">Country</label>
            <select
              className="custom-select"
              id="country"
              value={country}
              name="country"
              onChange={this.onChange}
            >
              {/* <option defaultValue="Country">Country</option> */}
              {this.getOptionItems(countries)}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="city">City</label>
            <select
              className="custom-select"
              id="city"
              value={city}
              name="city"
              onChange={this.onChange}
            >
              {Object.values(cities)
                .filter(key => key['country'] === parseInt(country) )
                .map(city => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}

              {/* {this.getOptionItems(Object.values(cities).filter(key => key["country"] === [country] ))} */}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="formControlRange">Age</label>
            <input
              type="number"
              className="form-control-range"
              id="formControlRange"
              name="age"
              value={age}
              onChange={this.onChange}
            />
            {errors.age && (
              <div className="invalid-feedback"> {errors.age} </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-group-label" htmlFor="customFileLang">
              Upload your avatar
            </label>
            <input
              type="file"
              className="form-group-input"
              id="avatar"
              name="avatar"
              onChange={this.onChangeAvatar}
            />
          </div>

          <div className="form-check">
            <label className="form-check-label">
              <input
                type="checkbox"
                className="form-check-input"
                value="true"
                id="agree"
                name="agree"
                checked={agree}
                onChange={this.onChangeAgree}
              />
              I agree to process the data
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            onClick={this.onSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    )
  }
}