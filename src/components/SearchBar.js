import React, { Component } from 'react';
import { Button, Form, Input, InputGroup, Row, Col } from 'reactstrap';
import YouTube from 'simple-youtube-api';
import { google_api_key } from '../config.json';
import Moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format'; //si lo usa
//components
import CardVideo from './CardVideo';
//style
import '../css/SearchBar.scss';

const youtube = new YouTube(google_api_key);

class SearchBar extends Component {
  constructor(props) {
    super(props); //toda la logica de la class Component

    this.state = {
      urlValue: '',
      video: ''
    }

    //this.updateInput = this.updateInput.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this); // con la arrow function: handleSubmit = (event) => {} no hace falta el bind(this)
  }

  updateInput = (event) => {
    this.setState({ 
      urlValue: event.target.value 
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    console.log('string: ' + this.state.urlValue)
    this.setState({ video: await this.searchVideo()});
    this.setState({ urlValue: ''});
    console.log(this.state.video);
    
  }

  async searchVideo() {
    let video;
    try {
      video = await youtube.getVideo(this.state.urlValue);
    } catch (error) {
      try {
        let videos = await youtube.searchVideos(this.state.urlValue, 1);
        video = await youtube.getVideoByID(videos[0].id);
      } catch (error) {
        console.log(error)
      }
    }
    return video;
  }
  
  render() {

    let card = null;

    if (this.state.video) {
      const video = this.state.video;
      card = <CardVideo title={video.title} url={video.url} img={video.thumbnails.high.url} duration={Moment.duration(video.duration, "minutes").format("h:mm:ss")} mp3={video.url} />
    } else {
      card = <p>Busca un video negro!!!</p>
    }

    return (
      <div className="SearchBar"> 
        <Form onSubmit={this.handleSubmit}>
          <InputGroup>
            <Input type="text" name="urlValue" value={this.state.urlValue} onChange={this.updateInput} placeholder="song name or URL" />
            <Button type="submit">Search</Button>
          </InputGroup>
        </Form>
        <Row>
          <Col sm="12" md={{ size: 8, offset: 2 }}>
            <br></br>
            {card}
          </Col>
        </Row>
      </div>
    );
  }
}

export default SearchBar;