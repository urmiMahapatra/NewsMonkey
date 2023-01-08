
import React, { Component } from 'react'
import NewsItems from './NewsItems'
import PropTypes from 'prop-types'


export class News extends Component {
    static defaultProps = {
        country : 'in' ,
        pageSize : 8,
        category :"general"
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category : PropTypes.string
    }
        
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
        let url = `https://newsapi.org/v2/top-headlines?${this.props.country}&category=${this.props.category}&apiKey=dab9e909b96d448b91734177f3b77776&page=1&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState ({articles:parsedData.articles,totalArticles:parsedData.totalResults})
    }

    handlePrevClick =  async ()=>{
        console.log("prevoius")
        let url = `https://newsapi.org/v2/top-headlines?${this.props.country}&category=${this.props.category}&apiKey=dab9e909b96d448b91734177f3b77776&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
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
        if(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

        }else{
        let url = `https://newsapi.org/v2/top-headlines?${this.props.country}&category=${this.props.category}&apiKey=dab9e909b96d448b91734177f3b77776&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
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
          <h2 className ="text-center">NewsMonkey - Top Headlines</h2>
        <div className ="row">
            {this.state.articles.map((element)=>{
                return  <div className="col-md-4" key={element.url}>
                <NewsItems title ={element.title?element.title.slice(0,40):""} description ={element.description?element.description.slice(0,50):""} imageUrl = {element.urlToImage} newsUrl ={element.url} author={element.author} date={element.publishedAt}/>
            </div>  
            })
        }
        
             
      </div>
      <div className="container d-flex justify-content-between">
         <button disabled ={this.state.page<=1}type="button" className="btn btn-dark" onClick={this.handlePrevClick} >&larr;Previous</button>
         <button disabled ={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type ="button" className="btn btn-dark"onClick={this.handleNextClick}>Next &rarr; </button>
      </div>
      </div>
    )
    }
}

export default News