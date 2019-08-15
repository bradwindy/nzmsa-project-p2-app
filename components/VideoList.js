import React, { Component } from 'react';
import { Text, View } from 'react-native';

class VideoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoList: [],
    };
  }

  componentDidMount() {
    fetch('https://captivapi.azurewebsites.net/api/Videos', {
      method: 'GET',
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        const output = [];
        response.forEach(video => {
          // TODO change <star> to a font-awesome icon.
          const row = <Text key={video.videoId}>{video.videoTitle}</Text>;
          if (video.isFavourite) {
            output.unshift(row);
          } else {
            output.push(row);
          }
        });
        this.setState({ videoList: output });
      });
  }

  deleteVideo = id => {
    fetch('https://captivapi.azurewebsites.net/api/Videos/' + id, {
      method: 'DELETE',
    }).then(() => {
      this.updateList();
    });
  };

  handleLike = video => {
    const toSend = [
      {
        from: '',
        op: 'replace',
        path: '/isFavourite',
        value: !video.isFavourite,
      },
    ];
    fetch(
      'https://captivapi.azurewebsites.net/api/Videos/update/' + video.videoId,
      {
        body: JSON.stringify(toSend),
        headers: {
          Accept: 'text/plain',
          'Content-Type': 'application/json-patch+json',
        },
        method: 'PATCH',
      }
    ).then(() => {
      this.updateList();
    });
  };

  render() {
    return <View style={{ padding: 15 }}>{this.state.videoList}</View>;
  }
}

export default VideoList;
