import React, { Component } from 'react';
import { Card, CardBody, CardTitle,} from 'reactstrap';
//style
import '../css/CardVideo.scss';

class MiniCardVideo extends Component {
  render() {
    return (
      <div className="MiniCardVideo">
        <Card>
          <CardBody>
            <CardTitle>{this.props.title}</CardTitle>
          </CardBody>
          <img width="100%" src={this.props.img} alt="Card image cap" />
        </Card>
      </div>
    );
  }
} 

export default MiniCardVideo;