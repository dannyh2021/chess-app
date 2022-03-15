import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../../config.js'

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getNews(page = 1) {
    // use your own API key if you're looking at this code
    console.log(config);
    const headersDict = {
      // "x-rapid-api-host": "free-news.p.rapidapi.com",
      "X-RapidAPI-Key": config.RAPID_API_KEY
    };
    const requestOptions = {
      headers: new HttpHeaders(headersDict)
    }
    console.log('requestOptions: ', requestOptions);
    let url = 'https://free-news.p.rapidapi.com/v1/search?q=chess&lang=en';
    url += '&page=' + page;

    return this.http.get(url, requestOptions);
  }
}