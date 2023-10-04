  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http'; 
  import { Observable } from 'rxjs';
  import { environment } from 'src/environments/environment';

  @Injectable({
    providedIn: 'root'
  })
  export class GithubService {

    constructor(private http:HttpClient) { }
    getData():Observable<any>
    {
      const url = environment.Githuburl
      return this.http.get<any>(url)   
    }
    bioB =[]
    getTeam()
    {
      const array = []
      const Bio = []
      const Meta = []
      const Img = []
      const dataArray = []
      this.getData().subscribe(async data => {            
  console.log('nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnaaaaaaaa',data)
    for (var i = 0; i < data.length; i++) 
    {
      if(data[i].type == 'dir' &&  data[i].name != 'Parsons' && data[i].path != 'ioToad')
      {
    
    const result=await fetch(data[i].url)
    const res1 = await result.json()
    // console.log('res1',res1[2].download_url)
    Img.push(res1[2].download_url)
    
    const resmeta2 = await fetch(res1[1].download_url)
    const meta = await resmeta2.json()
    // console.log('res2meta',Meta)
      Meta.push(meta)
    
      const resbio = await fetch(res1[0].download_url)
    const bio = await resbio.text()
    // console.log('res3',bio)
    Bio.push(bio)
    dataArray.push(Img,Meta,Bio)
      }
    }
    array.push({img:Img,bio:Bio,meta:Meta})
    // console.log('this is what you have been working for ',array)
      }); 
      return array
    }
  }
