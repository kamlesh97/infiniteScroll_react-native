import React, { Component } from 'react'
import { StyleSheet,FlatList, Text, View,Image,TouchableOpacity } from 'react-native';


export default class Posts extends Component {
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
            
        <View style={styles.item}  >
            <TouchableOpacity onPress={this.navigateTo}>
          <Image source={{uri:item.url}} style={styles.image} />
          <Text style={styles.text}>{item.id}</Text>
          <Text style={styles.text}>{item.title}</Text>
        </TouchableOpacity>
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
      />
        )
    }

    navigateTo=()=>{this.props.navigation.navigate('Home',item.title)}
}




const styles = StyleSheet.create({
    container: {
      // flex: 1,
      backgroundColor: '#fff',
      // alignItems: 'center',
      // justifyContent: 'center',
    },
  
    item:{
  marginBottom:10,
  
    },
    image:{
      width:'100%',
      height:200,
      resizeMode:'cover',
    },
    text:{
      fontSize:16,
      padding:5
    }
  });