
import React, { Component } from 'react'
import NewsItems from './NewsItems'

export class News extends Component {

        
    constructor(){
        super();
        console.log("hello i am a constructor");        
        this.state={
            articles :[],
            loading : false,
            page :1
      }
    }

    async componentDidMount(){
        console.log("cdm")
        let url = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=81d44d8008374113897a82c42d2865d3&page=1&pageSize=5";
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState ({articles:parsedData.articles,totalArticles:parsedData.totalResults})
    }
    handlePrevClick =  async ()=>{
        console.log("prevoius")
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=81d44d8008374113897a82c42d2865d3&page=${this.state.page - 1}&pageSize=5`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState ({
            page:this.state.page -1,
            articles:parsedData.articles
        })

    }
    handleNextClick = async ()=>{
        console.log("next");
        if(this.state.page + 1 > Math.ceil(this.state.totalResults/10)){

        }else{
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=81d44d8008374113897a82c42d2865d3&page=${this.state.page+1}&pageSize=5`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState ({
            page:this.state.page+1,
            articles:parsedData.articles
        })
        }
    }



  render() {
    return (
         <div className="container my-3">
        <h2>newsMonkey - Top Headlines</h2>
        <div className ="row">
            {this.state.articles.map((element)=>{
                return  <div className="col-md-4" key={element.url}>
                <NewsItems title ={element.title?element.title.slice(0,40):""} description ={element.description?element.description.slice(0,50):""} imageUrl = {element.urlToImage} newsUrl ={element.url}/>
            </div>  
            })
        }
        
             
      </div>
      <div className="container d-flex justify-content-between">
         <button disabled ={this.state.page<=1}type="button" className="btn btn-light" onClick={this.handlePrevClick}>&larr;Previous</button>
         <button type="button" className="btn btn-dark"onClick={this.handleNextClick}>Next &rarr; </button>
      </div>
      </div>
    )
    }
}

export default News