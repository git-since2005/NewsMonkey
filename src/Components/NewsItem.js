import React, { Component } from 'react'
import '../index.css'

export class NewsItem extends Component {
  // handleNav = ()=>{
  //   let url = this.props.link
  //   location.href = {url};
  // }
  // navigate = (link)=>{ useNavigate(link)}
  // console.log()
  render() {
    let {headlines, source, img, link} = this.props
    return (
      <div className='container'>
        <div className="img">
          <a href={link}>
          <img src={img} alt="" className="cover" />
          </a>
          {/* <section className = 'cap'><a href={link} className='sectionText'>Read more</a></section> */}
        </div>
        <div className="content">
            <h3 className="headlines">{headlines}...</h3>
            <p className="source">Source: {source}</p>
        </div>
      </div>
    )
  }
}

export default NewsItem