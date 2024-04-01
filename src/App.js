import React, { Component, lazy, Suspense } from 'react'
import './index.css'
import NewsSpace from './Components/NewsSpace.js'
import {HashRouter as Router, Routes, Route, Link, Outlet, Switch} from 'react-router-dom'

export default class App extends Component{
  constructor(){
    super()
    this.state= {input:'', showBar: 'visible'}
  }
  render()
  {
    return (
      <>
      <Router>
        <Suspense fallback = {<p style={{'alignSelf':'center'}} >Loading...</p>}>
      <Routes>
                  {/* <Route exact path = '/' element = {<NewsSpace pageLimit = {16}  callBack = {this.handleShow} category = 'general' />}></Route> */}
                  <Route exact path='/business' element = {<NewsSpace pageLimit = {16}  callBack = {this.handleShow} category = "business" key = "business"/>} />
                  <Route exact path='/entertainment' element = {<NewsSpace pageLimit = {16}  callBack = {this.handleShow} category = "entertainment" key = "entertainment"/>} />
                  <Route exact path='/' element = {<NewsSpace pageLimit = {16}  callBack = {this.handleShow} category = "general" key = "general" />} />
                  <Route exact path='/health' element = {<NewsSpace pageLimit = {16}  callBack = {this.handleShow} category = "health" key = "health"/>} />
                  <Route exact path='/science' element = {<NewsSpace pageLimit = {16}  callBack = {this.handleShow} category = "science" key = "science"/>} />
                  <Route exact path='/sports' element = {<NewsSpace pageLimit = {16}  callBack = {this.handleShow} category = "sports" key = "sports"/>} />
                  <Route exact path='/technology' element = {<NewsSpace pageLimit = {16}  callBack = {this.handleShow} category = "technology" key = "technology"/>} />
      </Routes>
        </Suspense>
      </Router>
      </>
    )
  }
}
