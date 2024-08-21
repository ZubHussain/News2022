import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from './Spinner'

export class News extends Component {

  capitalizeFirstLetter=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  
  constructor(props){
    super(props)
    this.state={
      articles:[],
      loading:true,
      page:1
    }
    document.title=this.capitalizeFirstLetter(this.props.category)
  }
  async componentDidMount(){
    
    let url=`https://saurav.tech/NewsAPI/top-headlines/category/${this.props.category}/${this.props.country}.json`
    this.setState({loading:true})
    let data=await fetch(url)
    let parseddata=await data.json();
    this.setState({articles: parseddata.articles,loading:false,totalresults:parseddata.totalresults})
  }



  render() {
    return (
      
      <div className="container my-3">
          <h2 className="row justify-content-center">NewsMonkey-Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
          {this.state.loading && <Spinner/>}
        <div className="row">
            {!this.state.loading && this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url} >
            <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} 
            imageUrl={element.urlToImage} newsUrl={element.url} author={element?element.author:"Unknown"} 
            date={element.publishedAt} name={element.source.name}/>
            
        </div> 
       })}
           
        </div>
      </div>
    );
  }
}

export default News;
