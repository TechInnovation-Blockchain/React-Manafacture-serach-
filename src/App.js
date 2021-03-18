import React, { Component } from 'react';
import { withRouter } from "react-router-dom"
import './App.css';

class MainComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      baseURL: 'http://tcr.etoolpim.com/api/?',
      apiURL: 'http://tcr.etoolpim.com/api/?column=YearID',
      appData: [],
      isLoaded: false,
      urlLevels: ['Year', 'Make', 'Model', 'EngineBase', 'Transmission'],
      currentStep: 0,
      makeID: null,
      YearID: null,
      modelID: null,
    }
  }

  componentDidMount() {
    const { match: { params } } = this.props
    if (params.engine !== "null" && params.engine !== undefined) {
      const url = this.state.baseURL + "YearID=" + params.year + "&MakeID=" + params.make + "&ModelID=" + params.model + "&EngineBaseID=" + params.engine + "&column=TransmissionMfrCodeID"
      this.GetDataForCurrentStep(url);
    }
    else if (params.model !== "null" && params.model !== undefined) {
      const url = this.state.baseURL + "YearID=" + params.year + "&MakeID=" + params.make + "&ModelID=" + params.model + "&column=EngineBaseID"
      this.GetDataForCurrentStep(url);
    }
    else if (params.make !== "null" && params.make !== undefined) {
      const url = this.state.baseURL + "YearID=" + params.year + "&MakeID=" + params.make + "&column=ModelID"
      this.GetDataForCurrentStep(url);
    }
    else if (params.year !== "null" && params.year !== undefined) {
      const url = this.state.baseURL + "YearID=" + params.year + "&column=MakeID"
      this.GetDataForCurrentStep(url);
    }
    else {
      const url = this.state.baseURL + "&column=YearID"
      this.setState({
        isLoaded: false,
      })
      this.GetDataForCurrentStep(url);
    }

  }

  itemSelected = (id) => {
    let the_arr = window.location.href;
    if (the_arr.slice(-1) === "/") {
      the_arr = the_arr.substr(0, the_arr.length - 1)
    }
    window.location.href = the_arr + "/" + id
  }

  GetDataForCurrentStep = (url) => {
    this.setState({
      isLoaded: false,
    })

    fetch(url, {
      method: 'GET',
      headers: new Headers({
        'X-Authorization': 'Basic YUZJUndYbEhTSE1pZm9pNTpDQzZZRWZHd1pVSUR4dEFk',
        'X-Resource-Key': 'fitment'
      }),
      redirect: 'follow'
    })
      .then(response => response.json())
      .then(applicationData => {
        this.setState({
          isLoaded: true,
          appData: applicationData,
        })
        console.log(applicationData)
      })
      .catch(err => console.error(err));
  }

  render() {

    if (!this.state.isLoaded) {
      return <div className="AppLoading">Loading...</div>;
    }

    return (
      <div className="App">
        <header>
          <h1>TCR YMM Application</h1>
        </header>
        <ul>
          {
            this.state.appData.data.map((item) => {
              if (item.value) {
                return <li key={item.id}>
                  <button onClick={() => this.itemSelected(item.id)}>
                    {/* {item.value} - <span className="small">{this.state.currentURL}</span> */}
                    {item.value}
                  </button>
                </li>
              }
              else {
                return <li key={item.id}>
                  <button onClick={() => this.itemSelected(item.id)}>
                    {`${item.Liter}L ${item.BlockType}${item.Cylinders}`}
                  </button>
                </li>
              }
            }
            )}
        </ul>
      </div>
    );
  }
}

export default withRouter(MainComponent);
