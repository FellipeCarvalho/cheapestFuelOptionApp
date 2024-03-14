import React,{useState, useRef} from "react"
import { StatusBar } from 'expo-status-bar';
import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View,TouchableWithoutFeedback, Keyboard } from 'react-native';

export default function App() {

  const [ethanolValue, setEthanolValue] = useState("")
  const [gasValue, setGasValue] = useState("")
  const [showResult, setShowResult] = useState(false)
  const betterOption = useRef("")

  const handleOnKeyPressGasInput = ({ nativeEvent: { key: keyValue } }) =>{
  
  if(keyValue =='Backspace') {
    if(gasValue?.length){
    const newValue = gasValue.slice(0, -1);
    setGasValue(newValue)
    
  }
   return
  }

  if(gasValue.length > 6) return;
  if(String(gasValue).includes(',') && keyValue == ',' ) return;
  setGasValue(String(gasValue) + keyValue)
  

}

const handleOnKeyPressEthanolInput = ({ nativeEvent: { key: keyValue } }) =>{
  
  if(keyValue =='Backspace') {
    if(ethanolValue?.length){
    const newValue = ethanolValue.slice(0, -1);
    setEthanolValue(newValue)
    
  }
   return
  }

  if(ethanolValue.length > 6) return;
  if(String(ethanolValue).includes(',') && keyValue == ',' ) return;
  setEthanolValue(ethanolValue + keyValue)
  

}

const handlePressCalcButton = () =>{
  setShowResult(true)
  const result = (parseFloat(ethanolValue) /  parseFloat(gasValue)).toFixed(3)

 if(result <= 0.7){

  betterOption.current ="Álcool"
 }else{

    betterOption.current = "Gasolina"
  }
 

}

const handlePressClearButton = () =>{
setEthanolValue("")
setGasValue("")
setShowResult(false)
}

const resultBetterOption = () =>{
  
return <><View style={styles.resulWrapper}>
<Text style={styles.subTitleResult}> Com os preços:</Text>
<Text style={styles.textResult}> Álcool: R$ {ethanolValue} </Text>
<Text style={styles.textResult}> Gasolina: R$ {gasValue} </Text>


<TouchableOpacity   style={styles.buttonClear} onPress={handlePressClearButton}>
  <Text style={styles.buttonTextClear}>Calcular novamente</Text>
  </TouchableOpacity>

</View>
</>

}

const formCalcBetterOption = () =>{

  return(
    <View style={styles.formWrapper}>
<Text  style={styles.label}> Álcool(preço por litro): </Text>
<TextInput value={ethanolValue} style={styles.input} placeholder='digite o valor'  keyboardType={ethanolValue.includes(',') ? 'number-pad': 'decimal-pad' } onKeyPress={handleOnKeyPressEthanolInput} />
<Text  style={styles.label}> Gasolina(preço por litro): </Text> 
<TextInput value={gasValue} style={styles.input} placeholder='digite o valor' keyboardType={gasValue.includes(',') ? 'number-pad': 'decimal-pad' } onKeyPress={handleOnKeyPressGasInput}/>

<View style={styles.buttonWrapper}>
<TouchableOpacity   style={styles.button} onPress={handlePressCalcButton}>
  <Text style={styles.buttonText}>CALCULAR</Text>
  </TouchableOpacity>
  </View>
</View>
  )
}


return (
    <View style={showResult ? styles.mainContainerResult : styles.mainContainer} >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
<View style={styles.logoWrapper} >
  <Image source={showResult ? require('./assets/gas.png') : require('./assets/logo.png')} />
  {
    !showResult ?
<Text style={styles.title}> Qual melhor opção? </Text> :
<Text style={styles.titleResult}> Compensa usar {betterOption.current}</Text>
  }
  
  

</View>
</TouchableWithoutFeedback>

{ !showResult ? formCalcBetterOption(): resultBetterOption()}


    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#6969',
    alignItems: 'center',
    justifyContent: 'center',

  },

  mainContainerResult: {
    flex: 1,
    backgroundColor: '#484d50',
    alignItems: 'center',
    justifyContent: 'center',

  },

  logoWrapper:{
    flex: 1,
    justifyContent:"center",
    alignItems:"center",
  },
  resulWrapper:{
    flex: 1,
    width:"100%",
    justifyContent:"start",
    alignItems:"center",
    marginTop:-100
  },
  title:{
    marginTop:25,
   fontSize:20,
   fontWeight:"bold",
   color:"#fff"

  },
  subTitleResult:{

   fontSize:25,
   fontWeight:"bold",
   color:"#fff"

  },
  textResult:{
    marginTop:25,
   fontSize:18,
 
   color:"#fff"

  },
  titleResult:{
    marginTop:25,
    fontSize:30,
    fontWeight:"bold",
    color:"#39FF14"
  },
  
  formWrapper:{
    flex: 1,
    width:"100%",
    justifyContent:"start",


  },
  label:{
    marginLeft:10,
    color:"#fff",
    fontSize:16,
    fontWeight:"bold"
  },
  input:{
    height:45,
    borderWidth:1,
    borderColor:"#222",
    margin:10,
    fontSize:20,
    padding:10,
    backgroundColor:"#fff",
    borderRadius:3
  },
  buttonWrapper:{
 padding:10,


   
  },


  buttonClear:{
    minWidth:350,
    marginTop:50,
    justifyContent:"center",
    alignItems:"center",
    height:45,
    margin:10,
    backgroundColor:"#ffffff00",
    borderRadius:3,
    borderColor: "#FA8072",
    borderWidth: 2,
  

  },
  buttonTextClear:{
    fontSize:14,
    fontWeight:'bold',
    color:"#FA8072"
  },

  button:{
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#FA8072",
    height:45,
    margin:10,
    borderRadius:3

  },
  buttonText:{
    fontSize:14,
    fontWeight:'bold',
    color:"#fff"
  }


});
