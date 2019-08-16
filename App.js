import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import styles from './styles';
import YouTube from 'react-native-youtube';
import { Appbar, Button, Card, Paragraph } from 'react-native-paper';
import VideoList from './components/VideoList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playingVideoID: 'GlCmAC4MHek',
      text: '',
    };
    this.updateVideoList = this.updateVideoList.bind(this);
    this.playVideo = this.playVideo.bind(this);
  }

  playVideo(videoID) {
    this.setState({ playingVideoID: videoID });
  }

  updateVideoList(listFromComponent) {
    this.setState({ videoList: listFromComponent });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Appbar style={styles.bottom}>
          <Text style={styles.title}>Captiv</Text>
        </Appbar>

        <YouTube
          videoId={this.state.playingVideoID} // The YouTube video ID
          apiKey="AIzaSyBut7RQcatn7SA0rKgimlP0StonJsTvppg"
          play // control playback of video with true/false
          //onChangeState={e => this.setState({ status: e.state })}
          //onChangeQuality={e => this.setState({ quality: e.quality })}
          //onError={e => this.setState({ error: e.error })}
          controls={2}
          style={{ height: 250 }}
        />

        <ScrollView style={styles.scrollView}>
          <VideoList
            updateVideoList={this.updateVideoList}
            playVideo={this.playVideo}
          />
        </ScrollView>
      </View>
    );
  }
}

export default App;
