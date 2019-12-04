import React from "react";
import countries from "../data/countries"

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
      avatar: ""
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

          <button type="submit" className="btn btn-primary w-100" onClick={this.onSubmit}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}
