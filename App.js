import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import styles from './styles';
import YouTube from 'react-native-youtube';
import { Appbar, Button, Card, Paragraph } from 'react-native-paper';
import VideoList from './components/VideoList';

const App = () => {
  function addVideo(url) {
    const body = { url };
    fetch('https://captivapi.azurewebsites.net/api/Videos', {
      body: JSON.stringify(body),
      headers: {
        Accept: 'text/plain',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }).then(() => {
      this.state.updateVideoList();
    });
  }

  return (
    <ScrollView style={styles.scrollView}>
      <Appbar style={styles.bottom}>
        <Text style={styles.title}>Captiv</Text>
      </Appbar>
      <YouTube
        videoId="6Y4QGFte3T8" // The YouTube video ID
        apiKey="AIzaSyBut7RQcatn7SA0rKgimlP0StonJsTvppg"
        play // control playback of video with true/false
        //onChangeState={e => this.setState({ status: e.state })}
        //onChangeQuality={e => this.setState({ quality: e.quality })}
        //onError={e => this.setState({ error: e.error })}
        controls={2}
        style={{ height: 250 }}
      />
      <Card style={styles.card}>
        <Card.Title title="Card Title" subtitle="Card Subtitle" />

        <Card.Content>
          <Paragraph>Card content</Paragraph>
        </Card.Content>

        <Card.Actions>
          <Button>Cancel</Button>
          <Button>Ok</Button>
        </Card.Actions>
      </Card>

      <VideoList />
    </ScrollView>
  );
};

App.navigationOptions = {
  title: 'Cards',
};

export default App;
