import React, { Component } from 'react';
import { Card, CardText, CardBody, CardLink, CardTitle, CardSubtitle} from 'reactstrap';
//style
import '../css/CardVideo.scss';

class CardVideo extends Component {
  render() {
    return (
      <div className="CardVideo">
        <Card>
          <CardBody>
            <CardTitle>{this.props.title}</CardTitle>
            <CardSubtitle><a href={this.props.url} target="blank_">{this.props.url}</a></CardSubtitle>
          </CardBody>
          <img width="100%" src={this.props.img} alt="Card image cap" />
          <CardBody>
            <CardText>Duration: {this.props.duration}</CardText>
            <CardLink href="#">MP3</CardLink>
            <CardLink href="#">Play</CardLink>
          </CardBody>
        </Card>
      </div>
    );
  }
} 

export default CardVideo;