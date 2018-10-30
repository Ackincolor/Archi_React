import * as React from 'react';
import { View, StyleSheet, Animated,ScrollView,ActivityIndicator } from 'react-native';
import { Constants } from 'expo';
import { ListView } from 'react-native';
import { Container, Header, Content, Button, Icon, List, ListItem, Text } from 'native-base';

const endpoint = "https://api.spotify.com/v1/recommendations";
const params = {
  'seed_artists': '6sFIWsNpZYqfjUpaCgueju',
  'target_danceability': '0.9'
};
const userAccessToken = '1a40c96d1d804333a6853b06f3fe8220';
export default class LinkScreen extends React.Component {
  datas = null;
  componentDidMount(){
    Animated.timing(this.state.value, {toValue :1, duration : 500}).start();
    return fetch('https://jsonplaceholder.typicode.com/albums', {
      method: 'GET',
    })
    .then(response => response.json()
    .then(json => {
      var finalAlbum = new Array();
      for(let album of json)
      {
        console.log(album);
        finalAlbum.push(album.title);
      }
      this.setState({
        isLoading: false,
        listViewData: finalAlbum
      }, function(){

      });
    })).catch((error) =>{
      console.error(error);
    });
  }
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      isLoading: true,
      basic: true,
      listViewData: this.datas,
      value: new Animated.Value(0),
    };
  }
  deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
  }
  render() {
    const scale = this.state.value;
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
    return (
      <View style={styles.container}>
      <Animated.View style={{transform : [{scale}]}}>
        <Text style={styles.paragraph}>
          Hello World !! Nassim
        </Text>
      </Animated.View>
      <View style={styles.container}>
      <ScrollView>
        <Content>
          <List
            leftOpenValue={75}
            rightOpenValue={-75}
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={data =>
              <ListItem>
                <Text> {data} </Text>
              </ListItem>}
            renderLeftHiddenRow={data =>
              <Button full onPress={() => alert(data)}>
                <Icon active name="information-circle" />
              </Button>}
            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
              <Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
                <Icon active name="trash" />
              </Button>}
          />
        </Content>
        </ScrollView>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});