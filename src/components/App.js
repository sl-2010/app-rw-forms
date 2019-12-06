import React from "react";
import countries from "../data/countries";
import Field from "./Field"

export default class App extends React.Component {

  constructor() {
    super()

    this.state = {
      username: '',
      password: '',
      repeatPassword: '',
      country: "1",
      gender: "",
      agree: false,
      avatar: "",
      errors: {},
      age: "16"
    }
  }

  onSubmit = event => {
    event.preventDefault();
    const errors = {}
    if (this.state.username.length < 5) {
      errors.username = "Reqiured. Must be 5 characters or more"
    }

    if (this.state.password.length < 4) {
      errors.password = "Reqiured. Must be 4 characters or more"
    }

    if (this.state.repeatPassword !== this.state.password) {
      errors.repeatPassword = "Must be equal to password"
    }

    if (this.state.age < 18 ) {
      errors.age = "You must be older 18"
    }

    if (Object.keys(errors).length > 0) {
      this.setState({
        errors: errors
      })
      console.log("errors", this.state.errors)
    } else {
      this.setState({
        errors: {}
      })
      console.log("submit",this.state)
    }
  }

  onChange = event => {
    console.log("event target name", event.target.value)
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onChangeAgree = event => {
    console.log("event target checked",  event.target.checked)
    this.setState({
      [event.target.name]: event.target.checked
    });
  };

  onChangeAvatar = event => {
    const reader = new FileReader()
    reader.onload = event => {
      this.setState({
        avatar: event.target.result
      });
    };
    reader.readAsDataURL(event.target.files[0])
    console.log(event.target.files[0])
  };

  getOptionItems = (Items) => Items.map(item =>
    <option key={item.id} value={item.id}>
      {item.name}
    </option>
  )

  render() {
    // console.log(this)

    // const getOptionCountries = countries.map(country => {
    //   return (<option key={country.id} value={country.id}>
    //     {country.name}
    //   </option>)
    // })
    // console.log(getOptionCountries)
    return (
      <div className="form-container card">
        <form className="form card-body">
          <Field
            labelText="Username"
            id="username"
            type="text"
            placeholder="Enter username"
            name="username"
            value={this.state.username}
            onChange={this.onChange}
            error = {this.state.errors.username}
          />

          <Field
            labelText="Password"
            id="password"
            type="password"
            placeholder="Enter password"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
            error = {this.state.errors.password}
          />

          <Field
            labelText="Repeat password"
            id="repeatPassword"
            type="password"
            placeholder="Enter repeat password"
            name="repeatPassword"
            value={this.state.repeatPassword}
            onChange={this.onChange}
            error = {this.state.errors.repeatPassword}
          />

          <div>Gender</div>
            <div className="form-check-inline">
              <label className="form-check-label">
                <input type="radio"
                  className="form-check-input"
                  name="gender"
                  id="female"
                  value="female"
                  checked={this.state.gender === "female" ? "active" : ""}
                  onChange={this.onChange}
                />Female
              </label>
            </div>
            <div className="form-check-inline">
            <label className="form-check-label">
              <input type="radio"
                className="form-check-input"
                name="gender"
                id="male"
                value="male"
                checked={this.state.gender === "male" ? "active" : ""}
                onChange={this.onChange}
              />Male
            </label>
          </div>
          <div className="form-check-inline">
            <label className="form-check-label">
              <input type="radio"
                className="form-check-input"
                name="gender"
                id="not binary"
                value="not binary"
                checked={this.state.gender === "not binary" ? "active" : ""}
                onChange={this.onChange}
              />Not binary
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="country">Country</label>
            <select
              className="custom-select"
              id="country"
              value={this.state.country}
              name="country"
              onChange={this.onChange}
            >
              {/* <option defaultValue="Country">Country</option> */}
              {this.getOptionItems(countries)}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="formControlRange">Age</label>
              <input type="number"
                className="form-control-range"
                id="formControlRange"
                name="age"
                value={this.state.age}
                onChange={this.onChange}
              />
            { this.state.errors.age && (<div className="invalid-feedback"> {this.state.errors.age} </div>) }
          </div>

          <div className="form-group">
            <label className="form-group-label" htmlFor="customFileLang">Upload your avatar</label>
            <input type="file"
              className="form-group-input"
              id="avatar"
              name="avatar"
              onChange={this.onChangeAvatar}
            />
          </div>

          <div className="form-check">
            <label className="form-check-label">
              <input type="checkbox"
                className="form-check-input"
                value="true"
                id="agree"
                name="agree"
                checked={this.state.agree}
                onChange={this.onChangeAgree}
              />I agree to process the data
            </label>
          </div>

          <button type="submit"
            className="btn btn-primary w-100"
            onClick={this.onSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}
