import React, { Component } from 'react';
import { Card, CardBody, CardTitle,} from 'reactstrap';
//style
import '../css/CardVideo.scss';

class MiniCardVideo extends Component {

  handleClick = () => {
    //console.log(this.props.title);
    this.props.passClick();
  }

  render() {
    return (
      <div className="MiniCardVideo">
         <Card id="miniCard" onClick= {this.handleClick}>
          <CardBody>
            <CardTitle>{this.props.title}</CardTitle>
          </CardBody>
          <img width="100%" src={this.props.img} alt="Card image cap" />
        </Card>
        <br></br>
      </div>
    );
  }
} 

export default MiniCardVideo;