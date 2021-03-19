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
      isData: false
    }
  }

  componentDidMount() {
    const { match: { params } } = this.props
    if (params.product !== "null" && params.product !== undefined) {
      const url = this.state.baseURL + "id=" + params.product + "&pricing=1&attributes=1"
      this.setState({
        isData: true,
      })
      this.GetDataForCurrentStep(url);
    }
    if (params.trans !== "null" && params.trans !== undefined) {
      const url = this.state.baseURL + "YearID=" + params.year + "&MakeID=" + params.make + "&ModelID=" + params.model + "&EngineBaseID=" + params.engine + "&EngineBaseID=" + params.trans + "&getProducts=1"
      this.GetDataForCurrentStep(url);
    }
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
      this.GetDataForCurrentStep(url);
    }

  }

  itemSelected = (id) => {
    let path = window.location.href;
    if (path.slice(-1) === "/") {
      path = path.substr(0, path.length - 1)
    }
    window.location.href = path + "/" + id
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
            this.state.isData && this.state.appData.data.map((item) => (<li key={item.id}>
              <button>
                {item.Description}#ASDF
              </button>
            </li>
            )
            )}
          {
            !this.state.isData && this.state.appData.data.map((item) => {
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
