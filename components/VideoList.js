import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Appbar, Button, Card, Paragraph } from 'react-native-paper';
import styles from '../styles';

class VideoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoList: [],
      urlList: [],
    };

    this.componentDidMount = this.componentDidMount.bind(this);
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
        const urls = [];
        response.forEach(video => {
          const row = (
            <Card key={video.webUrl} style={styles.card}>
              <Card.Cover source={{ uri: video.thumbnailUrl }} />

              <Card.Content>
                <Paragraph style={{ fontWeight: '700', paddingTop: 15 }}>
                  {video.videoTitle}
                </Paragraph>
              </Card.Content>

              <Card.Actions>
                <Button onPress={() => this.playVideo()}>Play</Button>
                <Button>Heart</Button>
                <Button>Remove</Button>
              </Card.Actions>
            </Card>
          );
          if (video.isFavourite) {
            output.unshift(row);
            urls.unshift(video.webUrl);
          } else {
            output.push(row);
            urls.push(video.webUrl);
          }
        });
        this.setState({ videoList: output });
        this.setState({ urlList: urls });
        this.props.updateVideoList(urls);
      });
  }

  playVideo = () => {
    this.props.playVideo(this.state.urlList[0].slice(-11).toString());
  };

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
