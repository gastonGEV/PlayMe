import React, { Component } from 'react';
import { Button, Form, Input, InputGroup, Row, Col } from 'reactstrap';
import YouTube from 'simple-youtube-api';
import { google_api_key } from '../config.json';
import Moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format'; //si lo usa
//components
import CardVideo from './CardVideo';
import MiniCardVideo from './MiniCardVideo';
//style
import '../css/SearchBar.scss';

const youtube = new YouTube(google_api_key);

function delay(t, data) {
  return new Promise(resolve => {
    setTimeout(resolve.bind(null, data), t);
  });
}

class SearchBar extends Component {
  constructor(props) {
    super(props); //toda la logica de la class Component

    this.state = {
      urlValue: '',
      video: '',
      card: '',
      lista: []
    }

  }

  updateInput = (event) => {
    this.setState({ 
      urlValue: event.target.value 
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault(); //por defecto html quiere intentar enviar al servidor, con esto lo evitamos
    console.log('string: ' + this.state.urlValue)
    document.getElementById('searchBar').disabled = true;
    document.getElementById('searchBtn').disabled = true;
    await this.searchVideo();
    this.setState({ urlValue: '' });
    document.getElementById('searchBar').disabled = false;
    document.getElementById('searchBtn').disabled = false;
  }
  
  searchVideo = async () => {
    let video;
    if (this.state.urlValue.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
      const playlist = await youtube.getPlaylist(this.state.urlValue);
      let videos = await playlist.getVideos();
      for (const vid of Object.values(videos)) {
        video = await youtube.getVideoByID(vid.id).then(delay.bind(null, 500));
        this.setState({ video: video });
        this.setState({ card: this.showCard() });
      };
    } else {
      try {
        video = await youtube.getVideo(this.state.urlValue);
      } catch (error) {
        try {
          let videos = await youtube.searchVideos(this.state.urlValue, 1);
          video = await youtube.getVideoByID(videos[0].id);
          this.setState({ video: video });
          this.setState({ card: this.showCard() });
        } catch (error) {
          return console.log(error)
        }
      }
    }
  }

 showCard = () => {
   let card = null;
   //console.log(this.state.video);
   if (this.state.video) {
     let video = this.state.video;
     card = <CardVideo 
             title={video.title} 
             url={video.url} 
             img={video.thumbnails.high.url} 
             duration={Moment.duration(video.duration, "minutes").format("h:mm:ss")} 
             //mp3 = {video.url} 
           />
   } else {
     card = <p>Busca un video negro!!!</p>
   }
   this.setState({ lista: [...this.state.lista, this.state.video] })
   console.log(this.state.lista);
   return card;
 }

render() {
  
  const playlist = this.state.lista.map(function(video, i) { 
    //console.log(video);
    //console.log(this.state.video);
    return (
      <MiniCardVideo
        key = {i}
        title={video.title}
        img={video.thumbnails.high.url}
      />
    )
  });

  return (
    <div className="SearchBar"> 
        <Form onSubmit={this.handleSubmit}>
          <InputGroup>
            <Input id="searchBar" type="text" name="urlValue" value={this.state.urlValue} onChange={this.updateInput} placeholder="song name or URL" />
            <Button id="searchBtn" type="submit">Search</Button>
          </InputGroup>
        </Form>
        <Row id="divCards">
          <Col id="test" md={{ size: 3 }}>
            <br></br>
            <div id="playListCards">
              {playlist}
            </div>
          </Col>
          <Col id="maxCard" md={{ size: 8, offset: 1 }}>
            <br></br>
            {this.state.card}
          </Col>
        </Row>
      </div>
    );
  }
}

export default SearchBar;