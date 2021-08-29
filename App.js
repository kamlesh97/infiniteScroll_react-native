// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet,FlatList, Text, View,Image } from 'react-native';



export default class App extends React.Component {
  constructor() {
    super()
  
    this.state = {
       data:[],
       page:1
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData= async()=>{
    const url=`https://jsonplaceholder.typicode.com/photos?_limit=10&_page=${this.state.page}`;
    fetch(url).then(response=>response.json())
    .then((responseJson)=>{
      this.setState({data:this.state.data.concat(responseJson)})
    })
  }


  renderRow=({item})=>{
    return (
    <View style={styles.item}>
      <Image source={{uri:item.url}} style={styles.image} />
      <View style={styles.row}>
      <Text style={styles.text}>{item.id}</Text>
      <Text style={styles.text}>{item.title}</Text>
      </View>
    </View>
    
    
    )
  }

handleLoad=()=>{
  this.setState({
    page:this.state.page+1
  },
  this.getData
  )
}

  render() {
    return (
      <FlatList style={styles.container}
      
      data={this.state.data}
 
      renderItem={this.renderRow}
      keyExtractor={(item,index)=>index.toString()}
      onEndReached={this.handleLoad}
      onEndReachedThreshold={1}
      />
    )
  }
}



const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#fff',
    backgroundColor:'#F5FCFF'
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  item:{
marginBottom:10,
borderBottomWidth:1.5

  },
  image:{
    width:'100%',
    height:200,
    resizeMode:'cover',
    marginTop:-10
  },
  text:{
    fontSize:16,
    padding:5
  },
  row:{
    flexDirection:'row',
    justifyContent:'flex-start',
    margin:10,
    
    
  }

});
