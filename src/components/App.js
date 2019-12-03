import React from "react";
import countries from "../data/countries"

export default class App extends React.Component {

  constructor() {
    super()

    this.state = {
      username: '',
      password: '',
      repeatPassword: '',
      country: "1"
    }
  }

  onSubmit = event => {
    event.preventDefault();
    console.log(this.state)
  }

  onChange = event => {
    console.log("event target name", event.target.value)
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  getOptionItems = (Items) => Items.map(item =>
    <option key={item.id} value={item.id}>
      {item.name}
    </option>
  )

  render() {
    console.log(this)

    // const getOptionCountries = countries.map(country => {
    //   return (<option key={country.id} value={country.id}>
    //     {country.name}
    //   </option>)
    // })
    // console.log(getOptionCountries)
    return (
      <div className="form-container card">
        <form className="form card-body">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              ref={node => this.username = node}
              value={this.state.username}
              name="username"
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter password"
              ref={node => this.password = node}
              value={this.state.password}
              name="password"
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label>Repeat password</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter repeat password"
              ref={node => this.repeatPassword = node}
              value={this.state.repeatPassword}
              name="repeatPassword"
              onChange={this.onChange}
            />
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

          <button type="submit" className="btn btn-primary w-100" onClick={this.onSubmit}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}
