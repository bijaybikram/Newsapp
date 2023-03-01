import React, { Component } from 'react'
import NewsItem from '../NewsItem'

export class News extends Component {
  
  constructor (){
    super();
    // console.log("Hello I am a constructor!");
    this.state ={
      articles: [],
      loading: false,
      page:1
    }
  }
  async componentDidMount(){
    // console.log("cdm")
    let url= "https://newsapi.org/v2/top-headlines?country=in&apiKey=4c310ebdd7dd4d10bcd6b61e2bcf7710&page=1&pagesize=20";
    let data= await fetch(url);
    let parsedData = await data.json()
    // console.log(parsedData);
    this.setState({articles: parsedData.articles,
    totalResults: parsedData.totalResults})
    
  }

  handlePrevClick = async ()=> {
    console.log("Previous News Items Showing")

    let url= `https://newsapi.org/v2/top-headlines?country=in&apiKey=4c310ebdd7dd4d10bcd6b61e2bcf7710&page=${this.state.page - 1}&pagesize=20`;
    let data= await fetch(url);
    let parsedData = await data.json()
    // console.log(parsedData);
    this.setState({
      page:this.state.page - 1,
      articles: parsedData.articles
    })
  }

  handleNextClick = async ()=> {
      console.log("Previous News Items Showing")
      if( this.state.page + 1 > Math.ceil(this.state.totalResults/20)) {

      }
      else{
      let url= `https://newsapi.org/v2/top-headlines?country=in&apiKey=4c310ebdd7dd4d10bcd6b61e2bcf7710&page=${this.state.page + 1}&pagesize=20`;
      let data= await fetch(url);
      let parsedData = await data.json()
      // console.log(parsedData);
      this.setState({
        page:this.state.page + 1,
        articles: parsedData.articles
      })
      }
      
    
  }

 

  render() {
    // console.log("console")
    return (
      <div className="news-container my-4 mx-5">
        <h2>Todays News - Top Headlines</h2>
        
        <div className="row">
        {this.state.articles.map((element)=>{
          return <div className="col-md-4" key={element.url}>
          <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url}/>
      </div>  
        })}
            
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Prev</button>
        <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
        
      </div>
    )
  }
}

export default News