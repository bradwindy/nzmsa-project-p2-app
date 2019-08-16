import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Appbar, Button, Card, Paragraph, TextInput } from 'react-native-paper';
import styles from '../styles';

class VideoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoList: [],
      urlList: [],
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateList = this.updateList.bind(this);
    this.handleLike = this.handleLike.bind(this);
  }

  componentDidMount() {
    this.updateList();
  }

  updateList = () => {
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
                <Button onPress={() => this.playVideo(video.webUrl)}>
                  Play
                </Button>
                <Button onPress={() => this.handleLike(video)}>
                  {video.isFavourite ? 'UNHEART' : 'HEART'}
                </Button>
                <Button onPress={() => this.deleteVideo(video.videoId)}>
                  Remove
                </Button>
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
  };

  playVideo = url => {
    this.props.playVideo(url.slice(-11).toString());
  };

  addVideo = url => {
    const body = { url };
    fetch('https://captivapi.azurewebsites.net/api/Videos', {
      body: JSON.stringify(body),
      headers: {
        Accept: 'text/plain',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }).then(() => {
      this.updateList();
    });
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
    return (
      <View style={{ padding: 15 }}>
        <View
          style={{
            flexDirection: 'row',
            width: window.width,
            margin: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View style={{ flex: 2 }}>
            <TextInput
              style={{ marginBottom: 15, paddingBottom: 5 }}
              mode="outlined"
              label="Add Video"
              placeholder="Video URL"
              value={this.state.text}
              onChangeText={text => this.setState({ text })}
            />
          </View>
          <Button
            style={{ margin: 15, paddingBottom: 5 }}
            onPress={() => this.addVideo(this.state.text)}
          >
            + Add
          </Button>
        </View>

        {this.state.videoList}
      </View>
    );
  }
}

export default VideoList;
