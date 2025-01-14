import React, {useRef, useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

import {
  Button,
  Pressable,
  DrawerLayoutAndroid,
  StatusBar,
  Text,
  StyleSheet,
  View,
  Alert,
  Dimensions,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Platform,
  Image
} from 'react-native';

const { width, height } = Dimensions.get('window');
const App = () => {
//Valores dos componentes, se for true e aparece se for false ele nao aparece
  const [lembrete, setLembrete] = useState(true);
  const [loja, setLoja] = useState(false);
  const [sininho, setSininho] = useState(false);
  const [engrenagem, setEngrenagem] = useState(false);
  const [mais, setMais] = useState(false);
//valores das imagens(seus caminhos)
const [imgLembrete, setImgLembrete] = useState(require('./assets/bt-lembretes.png'));
const [imgLoja, setImgLoja] = useState(require('./assets/bt-01-removebg-preview.png'));
const [imgSininho, setImgSininho] = useState(require('./assets/Screenshot_5-removebg-preview.png'));
const [imgEngrenagem, setImgEngrenagem] = useState(require('./assets/Screenshot_6-removebg-preview (1).png'));

  const esconderLembrete = () => {
    //setando o caminho novo dos componentes para trocar a imagem
    setImgLembrete(require('./assets/bt-lembretes.png'));
    setImgLoja(require('./assets/bt-01-removebg-preview.png'));
    setImgSininho(require('./assets/Screenshot_5-removebg-preview.png'));
    setImgEngrenagem(require('./assets/Screenshot_6-removebg-preview (1).png'));
    //setando os conponentes para verdadeiro ou falso
    setLembrete(true);
    setLoja(false);
    setSininho(false);
    setEngrenagem(false);
    setMais(false);
  };
  const esconderLoja = () => {
    //setando o caminho novo dos componentes para trocar a imagem
    setImgLembrete(require('./assets/Screenshot_2-removebg-preview.png'));
    setImgLoja(require('./assets/loja_dourada.png'));
    setImgSininho(require('./assets/Screenshot_5-removebg-preview.png'));
    setImgEngrenagem(require('./assets/Screenshot_6-removebg-preview (1).png'));
    //setando os conponentes para verdadeiro ou falso
    setLembrete(false);
    setLoja(true);
    setSininho(false);
    setEngrenagem(false);
    setMais(false);
  };
  const esconderSininho = () => {
    //setando o caminho novo dos componentes para trocar a imagem
    setImgLembrete(require('./assets/Screenshot_2-removebg-preview.png'));
    setImgLoja(require('./assets/bt-01-removebg-preview.png'));
    setImgSininho(require('./assets/Screenshot_6-removebg-preview.png'));
    setImgEngrenagem(require('./assets/Screenshot_6-removebg-preview (1).png'));
    //setando os conponentes para verdadeiro ou falso
    setLembrete(false);
    setLoja(false);
    setSininho(true);
    setEngrenagem(false);
    setMais(false);
  };
  const esconderEngrenagem = () => {
    //setando o caminho novo dos componentes para trocar a imagem
    setImgLembrete(require('./assets/Screenshot_2-removebg-preview.png'));
    setImgLoja(require('./assets/bt-01-removebg-preview.png'));
    setImgSininho(require('./assets/Screenshot_5-removebg-preview.png'));
    setImgEngrenagem(require('./assets/Screenshot_7-removebg-preview.png'));
    //setando os conponentes para verdadeiro ou falso
    setLembrete(false);
    setLoja(false);
    setSininho(false);
    setEngrenagem(true);
    setMais(false);
  };
  const esconderMais = () => {
    setLembrete(false);
    setLoja(false);
    setSininho(false);
    setEngrenagem(false);
    setMais(true);
  };
  
  const [alarmTime, setAlarmTime] = useState(new Date());
	const [showTimePicker, setShowTimePicker] = useState(false);
  const [text, setText] = useState('');
  const [alarmes, setAlarmes] = useState([
    { nome_alarme: "lucas", horas: 10, minutos: 50, index: 0 },
    { nome_alarme: "dorflex", horas: 11, minutos: 50, index: 1 },
    { nome_alarme: "remedio", horas: 10, minutos: 50, index: 2 },
    { nome_alarme: "buscopan", horas: 10, minutos: 42, index: 3 },
  ])

  const verificarAlarmeExistente = (nome) => {
    return alarmes.some(alarme => alarme.nome_alarme === nome);
  };
  const verificarAlarme = (horas, minutos) => {
    return alarmes.some(alarme => alarme.horas === horas && alarme.minutos === minutos);
  };

  const adicionar_alarme = () =>{
    console.log(alarmes)
    var nome_alarme = text.toLowerCase()
    if(verificarAlarmeExistente(nome_alarme)){
      alert("Ja existe um alarme com esse nome!")
      return
    }
    if(nome_alarme == ''){
      alert("É preciso adicionar um nome para o alarme!")
      return
    }
    var noveo_alarme = [...alarmes]
    var alarme = {
      nome_alarme: nome_alarme,
      horas: alarmTime.getHours(), 
      minutos: alarmTime.getMinutes(),
      index: (alarmes[alarmes.length - 1].index +1)
    }
    noveo_alarme.push(alarme)
    setAlarmes(noveo_alarme)
    alert("Alarme adicionado!")
    setText('')
  }

  const showTimePickerModal = () => {
		setShowTimePicker(true);
	};

	const hideTimePickerModal = () => {
		setShowTimePicker(false);
	};

	const handleTimeChange = (event, selectedTime) => {
		hideTimePickerModal();
		if (selectedTime) {
			setAlarmTime(selectedTime);
      // console.log(selectedTime.getHours())
		}
	};

		const checkAlarm = setInterval(() => {
			const currentTime = new Date();
      // console.log(currentTime.getHours())

			if (
        verificarAlarme(currentTime.getHours(), currentTime.getMinutes()) && (currentTime.getSeconds() >= 0 && currentTime.getSeconds() <= 3)
			) {
				// Matched the set alarm time, show an alert
				Alert.alert("Alarm", "It is time!");
				// Stop checking once the alert is shown
				clearInterval(checkAlarm); 
			}
		}, 1000); // Check every second
		// Cleanup on component unmount

  return (
    <View style={styles.container}>
        {lembrete && (<View style={[styles.box, { width: width * 0.9 }]}>

          <View style={styles.parent}>
          <ScrollView style={styles.box1}>
          {alarmes.map((alarme, index) => (
           index !==0 && (<View key={index} style={styles.rectangle}>
            <Text style={styles.text_alarm}>{alarme.nome_alarme.toUpperCase(0)}</Text>
            <Text style={styles.text_alarm_hora}>{alarme.horas}:{alarme.minutos}</Text>
            </View>
            )
        ))}
          </ScrollView>
        </View>
        </View>)}
        {loja && (<View style={[styles.box, { width: width * 0.9 }]}>
          <Text style={[styles.boxText]}>Este é o componente loja</Text>
          
        </View>)}
        {sininho && (<View style={[styles.box, { width: width * 0.9 }]}>
          <Text style={[styles.boxText]}>Este é o componente sininho</Text>
        </View>)}
        {/* componente engrenagem: */}
        {engrenagem && (<View style={[styles.box, { width: width * 0.9 }]}>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Notificações</Text>
          </Pressable>

          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Ajustes e Acessibilidade</Text>
          </Pressable>

          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Idiomas</Text>
          </Pressable>

          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Ajuda e Suporte</Text>
          </Pressable>
        </View>)}
        {/* maaaaaaaaaaiiiiissss */}
        {mais && (<View style={[styles.box_mais, { width: width * 0.9 }]}>
          <View style={styles.header}>
			</View>

			<View style={styles.clockContainer}>
				<Text style={styles.clockText} onPress={showTimePickerModal}>
					{alarmTime.toLocaleTimeString([], {
            hour: "2-digit",
						minute: "2-digit",
					})}
				</Text>
			</View>
          
			{showTimePicker && (
				<DateTimePicker
					value={alarmTime}
					mode="time"
					is24Hour={true}
					display="spinner"
					onChange={handleTimeChange}
				/>
			)}

      <View style={styles.button_input}>
      <Text style={styles.text_input}>Digite o nome do alarme</Text>
      
      {/* Campo de texto */}
      <TextInput
        style={styles.input}  // Estilo para o input
        value={text}           // O valor do input vem do estado 'text'
        onChangeText={setText} // Atualiza o estado 'text' com o que o usuário digitar
        placeholder="Digite aqui . . ." // Texto sugerido quando o campo está vazio
      />
      </View>
      <Button
      style={styles.button_salvar}
      color="#FFAF32"
      title='Salvar'
      onPress = {adicionar_alarme}
      />
      
      {/* Exibir o que o usuário digitou */}
        </View>)}

        <View style={styles.navBar}>
          <Pressable style={styles.btSininho} onPress={esconderSininho}>
          <Image
              source={imgSininho}
              style={{width: 32, height: 42}}
              />
          </Pressable>
          <Pressable style={styles.btEngrenagem} onPress={esconderEngrenagem}>
          <Image
            source={imgEngrenagem}
            style={{width: 38, height: 38}}
            />
          </Pressable>
          <Pressable style={styles.btLembrete} onPress={esconderLembrete}>
          <Image
              source={imgLembrete}
              style={{width: 38, height: 38}}
              />
          </Pressable>
          
          <Pressable style={styles.btLoja} onPress={esconderLoja}>
          <Image
            source={imgLoja}
            style={{width: 38, height: 38}}
            />
          </Pressable>
          
          <Pressable style={styles.btAddLembrete} onPress={esconderMais}>
          <Image
            source={require('./assets/bt-add-lembrete.png')}
            style={{width: 60, height: 60}}
            />
          </Pressable>
          <Image
            source={require('./assets/nav-bar.png')}
            style={styles.imageNavBar}
            />
        </View>
</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E6E6D6'
  },
  navigationContainer: {
    backgroundColor: '#ecf0f1',
  },
  button: {
    backgroundColor: '#FF8066',
    paddingVertical: 30,
    paddingHorizontal: 25,
    marginVertical: 10,
    borderRadius: 15,
    width: '100%', // Definindo a largura dos botões
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000', // Cor da sombra (preto)
    shadowOffset: { width: 0, height: 4 }, // Distância da sombra
    shadowOpacity: 0, // Opacidade da sombra
    shadowRadius: 10, // Raio da sombra
    // alignItems: 'center',
  },
  parent: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  rectangle: {
    // height: '5%',        // 25% da altura do pai
    width: '95%',         // 95% da largura do pai
    backgroundColor: '#FF8066',  // Cor de fundo do retângulo
    marginBottom: 15,     // Espaço entre os retângulos
    marginLeft: "2.5%",
    borderRadius: 15,      // Bordas arredondadas
  },
  text_alarm: {
    color: "#fff",
    fontSize: 25,
    padding: 15,
    paddingBottom: 0
    // height: "10%"
  },
  text_alarm_hora: {
    color: "#fff",
    fontSize: 30,
    padding: 20,
    paddingTop: 0
    // height: "10%"
  },
  button_input: {
    backgroundColor: '#FF8066',
    paddingVertical: 15,
    height: "30%",
    paddingHorizontal: 25,
    marginVertical: 10,
    borderRadius: 15,
    width: '95%', // Definindo a largura dos botões
    // justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000', // Cor da sombra (preto)
    shadowOffset: { width: 0, height: 4 }, // Distância da sombra
    shadowOpacity: 0, // Opacidade da sombra
    shadowRadius: 10, // Raio da sombra
    // alignItems: 'center',
  },
  text_input:{
    marginBottom: 15,
    color: '#Fff',
    paddingBottom: 10,
    width: "100%",
    borderBottomWidth: 1,
    borderColor: '#fff'

  },
  button_salvar: {
    color: '#FFAF32'
  },
  appName: {
		fontSize: 28,
		// fontWeight: "bold",
		color: "#FFAF32", // Set your desired text color
	},
  clockContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 20,
	},
  clockText: {
		fontSize: 80,
		marginRight: 10,
    borderBottomWidth: 3,
    borderColor: "#FF765A",
		color: "#fff", // Set your desired text color
    padding: 35,
    paddingBottom: 10,
    textShadowColor: '#778899',    // Cor da sombra
    textShadowOffset: {         // Deslocamento da sombra
      width: 2,  // Deslocamento horizontal (x)
      height: 3, // Deslocamento vertical (y)
    },
    textShadowRadius: 3, 
	},
  input: {
    color: '#fff',
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 8,
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  box: {
    alignItems: 'center',
    flex: 0.8,
    // borderWidth: 3,
    borderColor: '#FF8167',
    marginBottom: 50
  },
  box1: {
    width: '100%',
    // alignItems: "center",
    // borderWidth: 3,
    height: "100%",
    borderColor: '#FF8167',
    // marginBottom: 50
  },
  box_mais: {
    position: 'absolute',
    top: height * 0.15,
    width: width * 1,
    height: height * 0.6,
    alignItems: 'center',
    flex: 0.6,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderWidth: 3,
    borderColor: '#FF8167',
    marginBottom: 50
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: 'center',
  },
  navBar: {
    width: '100%',
    backgroundColor: '#E5E5E5', // Cor de fundo da navbar
    alignItems: 'center',
    position: 'absolute',
    bottom: 0, // Posiciona a navbar na parte inferior
    flexDirection: 'column',
  },
  imageNavBar: {
    position: 'absolute',
    bottom: -24,
    width: Dimensions.get('window').width, // Largura total da tela
    zIndex: 0,
  },
  btAddLembrete: {
    position: 'absolute',
    bottom: 40,
    zIndex: 1,
    width: 60,
    height: 60,
  },
  btLembrete: {
    position: 'absolute',
    left: 23,
    bottom: 20,
    zIndex: 1,
    width: 38,
    height: 38,
  },
  btLoja: {
    position: 'absolute',
    left: 80,
    bottom: 30,
    zIndex: 1,
    width: 38,
    height: 38,
  },
  btSininho: {
    position: 'absolute',
    right: 80,
    bottom: 28,
    zIndex: 1,
    width: 32,
    height: 42,
  },
  btEngrenagem: {
    position: 'absolute',
    right: 23,
    bottom: 20,
    zIndex: 1,
    width: 38,
    height: 38,
  }
});

export default App;