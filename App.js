import React, {useRef, useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Audio } from 'expo-av';
import * as Location from 'expo-location';

import { 
  Platform, 
  View, 
  Text, 
  Button,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput, 
  Image, 
  Pressable, 
  ScrollView, 
  Alert, 
  Dimensions,
  StyleSheet, 
  Linking
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
const [imgCoracao, setImgCoracao] = useState(require('./assets/coracao.png'));

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
    // setImgSOS(require('./assets/SOS.png'))
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
    setImgLembrete(require('./assets/Screenshot_2-removebg-preview.png'));
    setImgLoja(require('./assets/bt-01-removebg-preview.png'));
    setImgSininho(require('./assets/Screenshot_5-removebg-preview.png'));
    setImgEngrenagem(require('./assets/Screenshot_6-removebg-preview (1).png'));

    setLembrete(false);
    setLoja(false);
    setSininho(false);
    setEngrenagem(false);
    setMais(true);
  };
  const [alarmTime, setAlarmTime] = useState(new Date());
	const [showTimePicker, setShowTimePicker] = useState(false);
  const [text, setText] = useState('');
  const [text1, setText1] = useState('');
  const [horas, setHoras] = useState('');
  const [displayAlarme, setDisplayAlarme] = useState(false);
  const [cep, setCep] = useState(null);
  const [localDesejado, setLocalDesejado] = useState('');
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [sugestao, setSugestao] = useState('');
  const [alarmes, setAlarmes] = useState([
    { nome_alarme: "lucas", horas: '10', minutos: '50', index: 0, status: true },
  ])
  const [sugestoes, setSugestoes] = useState([
    { nome_completo: "Adam Portela", sugestao: "arrumar navbar" },
    { nome_completo: "Maria Silva", sugestao: "acesso as configurações" },
    { nome_completo: "João Pereira", sugestao: "melhorar desempenho" },
  ])
  const [sound, setSound] = useState();

  async function tocarSom() {
    // Carregar o som
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/sons/som.mp3') // Substitua pelo caminho do seu arquivo de som
    );
    setSound(sound);

    // Tocar o som
    await sound.playAsync();
  }
  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const verificarAlarmeExistente = (nome) => {
    return alarmes.some(alarme => alarme.nome_alarme === nome);
  };

  const retornarText = (horas, minutos) =>{
    const alarmeCorrespondente = alarmes.find(alarme => alarme.horas === horas && alarme.minutos === minutos);
    var response = {
      alarme: alarmeCorrespondente.nome_alarme,
      horas: alarmeCorrespondente.horas,
      minutos: alarmeCorrespondente.minutos
    }
    return response
  }

  const verificarAlarme = (horas, minutos, segs) => {
    // Encontrando o alarme correspondente
    const alarmeCorrespondente = alarmes.find(alarme => alarme.horas === horas && alarme.minutos === minutos);
    if (alarmeCorrespondente && segs <= 1) {
      // Atualizando o status do alarme
      setAlarmes(prevAlarmes =>
        prevAlarmes.map(alarme =>
          alarme.horas === horas && alarme.minutos === minutos
            ? { ...alarme, status: false } // Atualiza apenas o alarme correspondente
            : alarme // Deixa os outros alarmes inalterados
        )
      );
    }

    // Retorna true ou false baseado na verificação do alarme
    
    return alarmes.some(alarme => alarme.horas === horas && alarme.minutos === minutos && alarme.status == true);
  };

  const adicionar_alarme = () =>{
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
      horas: alarmTime.getHours().toString().padStart(2, '0'),
      minutos: alarmTime.getMinutes().toString().padStart(2, '0'),
      index: (alarmes[alarmes.length - 1].index +1),
      status: true
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
  
  const pararSom = () => {
    setDisplayAlarme(false)
    if (soundRef.current) {
      soundRef.current
      soundRef.current.unloadAsync();
      setSound(null);
    }
  }
	const handleTimeChange = (event, selectedTime) => {
		hideTimePickerModal();
		if (selectedTime) {
			setAlarmTime(selectedTime);
		}
	};
  const soundRef = useRef(sound);
  useEffect(() => {
    soundRef.current = sound; // Atualiza a referência sempre que 'sound' mudar
  }, [sound]);

  useEffect(() => {
    const checkAlarm = setInterval(() => {
			const currentTime = new Date();
      var horas = currentTime.getHours().toString().padStart(2, '0')
      var minutos = currentTime.getMinutes().toString().padStart(2, '0')
			if (verificarAlarme(horas, minutos, currentTime.getSeconds()) && currentTime.getSeconds() <= 1) {
				// mensagens que vao ser exibidas quando o alarme tocar(nome do alarme e hora do mesmo)
        var texto1 = retornarText(horas, minutos).alarme;
        var texto2 = retornarText(horas, minutos).horas;
        var texto3 = retornarText(horas, minutos).minutos;
        var horasText = `${texto2} : ${texto3}`
        setText1(texto1);
        setHoras(horasText);

        console.log(texto1, texto2, texto3)
        setDisplayAlarme(true)
				// Alert.alert(texto1, horas, [{ text: "OK", onPress: () => {
        //   if (soundRef.current) {
        //     soundRef.current
        //     soundRef.current.unloadAsync();
        //     setSound(null);
        //   }
        // }}]);
        tocarSom()
			}
		}, 1000); // Check every second
    return () => clearInterval(checkAlarm);
  }, [alarmes]);
  
  const openWebsite = async () => {
    const url = `https://www.yelp.com.br/search?find_desc=${localDesejado}&find_loc=${cep}`;
    try {
      await getLocation()
      const supported = await Linking.canOpenURL(url);
      console.log(cep)
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(`Não foi possível abrir o site: ${url}`);
      }
    } catch (error) {
      Alert.alert('Ocorreu um erro ao tentar abrir o site.', error.message);
    }
  };

  const getCepFromLocation = async (latitude, longitude) => {
    const apiKey = 'AIzaSyAuQ-f3gheV34l-N0V-porjT-tBjUtUK30'; // Insira sua API key
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const addressComponents = data.results[0].address_components;
        const postalCode = addressComponents.find(component =>
          component.types.includes('postal_code')
        );
        if (postalCode) {
          setCep(postalCode.long_name);
        } else {
          Alert.alert('CEP não encontrado.');
        }
      } else {
        Alert.alert('Não foi possível obter o endereço.');
      }
    } catch (error) {
      Alert.alert('Erro ao buscar o CEP:', error.message);
    }
  };

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada!', 'Permita o acesso à localização nas configurações.');
      return;
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest, // Máxima precisão
      enableHighAccuracy: true, // Prioriza maior precisão (mesmo consumindo mais bateria)
      timeout: 5000, 
    });
    const { latitude, longitude } = location.coords;
    await getCepFromLocation(latitude, longitude);
  };

  useEffect(() => {
    if (lembrete) {
      getLocation(); 
    }
  }, [lembrete]);
  
  const adicionarSugestao = () => {
    if (nomeCompleto.trim() === "" || sugestao.trim() === "") {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    const novaSugestaoObj = {
      nome_completo: nomeCompleto,
      sugestao: sugestao,
    };

    setSugestoes((prevSugestoes) => [...prevSugestoes, novaSugestaoObj]);

    // Limpar os campos
    setNomeCompleto("");
    setSugestao("");
  };
  
    return (  
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}>
          {!sininho && 
        <Image source={require('./assets/SOS.png')} style={styles.btnSOS}/>
          }
          {lembrete && (
            <View style={[styles.box, { width: width * 0.9 }]}>
              <View style={styles.parent}>
                <ScrollView style={styles.box1}>
                  {alarmes.map((alarme, index) => (
                    index !== 0 && (
                      <View key={index} style={styles.rectangle}>
                        <Text style={styles.text_alarm}>{alarme.nome_alarme.toUpperCase(0)}</Text>
                        <Text style={styles.text_alarm_hora}>{alarme.horas}:{alarme.minutos}</Text>
                      </View>
                    )
                  ))}
                </ScrollView>
              </View>
            </View>
          )}

{displayAlarme && (
          <View style={styles.box_display_alarme}>
              <Text style={styles.msg_alarme}>{text1}</Text>
              <Text style={styles.msg_horas}>{horas}</Text>
            <View style={styles.ok_box}>
              <Text style={styles.ok} onPress={pararSom}>OK</Text>
            </View>
          </View>
        )}
  
          {loja && (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={[styles.box, { width: width * 0.9 }]}>
              <Text style={[styles.texto_loja]}>PESQUISE POR UM LOCAL DE INTERESSE</Text>
              <TextInput
                style={styles.input2}
                value={localDesejado}
                onChangeText={setLocalDesejado}
                placeholder="Digite aqui . . ."
              />
              {/* <Button title="Obter CEP Atual" onPress={getLocation} /> */}
      {/* {cep && <Text style={{ marginTop: 20 }}>CEP Atual: {cep}</Text>} */}
              <Pressable onPress={openWebsite} style={styles.button_navegar}>
                <Text>NAVEGAR <Image source={require('./assets/link-externo.png')} style={styles.imgLinkExterno}/></Text>
              </Pressable>
            </View>
            </TouchableWithoutFeedback>
          )}
  
          {sininho && (
            <TouchableWithoutFeedback>
            <View style={[styles.box, { width: width * 0.9 }]}>
              <Text style={[styles.texto_loja]}>DEIXE SUA SUGESTÃO <Image source={imgCoracao} style={{ width: 18, height: 18 }}/></Text>
                    <TextInput
              style={styles.input2}
              value={nomeCompleto}
              onChangeText={setNomeCompleto}
              placeholder="Digite aqui seu nome completo"
            />
                    <TextInput
              style={styles.input2}
              value={sugestao}
              onChangeText={setSugestao}
              placeholder="Digite aqui sua sugestão"
            />
              <View style={styles.parent1}>
              <ScrollView style={styles.box2}>
                    {sugestoes.map((item, index) => (
                <View key={index} style={styles.rectangle_sugestao}>
                  <Text style={styles.nome}>{item.nome_completo}</Text>
                  <Text style={styles.sugestao}>{item.sugestao}</Text>
                </View>
              ))}
              </ScrollView>
                <Button title="Salvar Sugestão" onPress={adicionarSugestao}/>;
              </View>
            </View>
          </TouchableWithoutFeedback>
          )}
  
          {engrenagem && (
            <View style={[styles.box, { width: width * 0.9 }]}>
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
            </View>
          )}
  
  {mais && (
  <View style={[styles.box_mais, { width: width * 0.9 }]}>
    <View style={styles.header}></View>
      <Text style={styles.altereText} onPress={showTimePickerModal}>ALTERE A HORA</Text>
    <View style={styles.clockContainer}>
      <Text style={styles.clockText} onPress={showTimePickerModal}>
        {`${alarmTime.getHours().toString().padStart(2, '0')}:${alarmTime.getMinutes().toString().padStart(2, '0')}`}
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

    {/* Substitua este trecho pelo código corrigido */}
    {/* <View style={styles.weekdayContainer}>
      {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, index) => (
        <Pressable key={index} style={styles.dayButton}>
          <Text style={styles.dayText}>{day}</Text>
        </Pressable>
      ))}
    </View> */}
    {/* Fim da substituição */}
    
    <View style={styles.button_input}>
      <Text style={styles.text_input}>Digite o nome do alarme</Text>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Digite aqui . . ."
        placeholderTextColor="#FFF"
      />
    </View>
    <View style={styles.button_salvar_container}>
  <Pressable style={styles.button_salvar} onPress={adicionar_alarme}>
    <Text style={styles.button_salvar_text}>Salvar</Text>
  </Pressable>
</View>

  </View>
)}

          <View style={styles.navBar}>
            <Pressable style={styles.btSininho} onPress={esconderSininho}>
              <Image source={imgSininho} style={{ width: 32, height: 42 }} />
            </Pressable>
            <Pressable style={styles.btEngrenagem} onPress={esconderEngrenagem}>
              <Image source={imgEngrenagem} style={{ width: 38, height: 38 }} />
            </Pressable>
            <Pressable style={styles.btLembrete} onPress={esconderLembrete}>
              <Image source={imgLembrete} style={{ width: 38, height: 38 }} />
            </Pressable>
            <Pressable style={styles.btLoja} onPress={esconderLoja}>
              <Image source={imgLoja} style={{ width: 38, height: 38 }} />
            </Pressable>
            <Pressable style={styles.btAddLembrete} onPress={esconderMais}>
              <Image source={require('./assets/bt-add-lembrete.png')} style={{ width: 60, height: 60 }} />
            </Pressable>
            <Image source={require('./assets/nav-bar.png')} style={styles.imageNavBar} />
          </View>
      </KeyboardAvoidingView>
    );
  };


// ///////////////////////////////////////////////////////////////////////////////////////////////////
                                               // estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E6E6D6',
  },
  nome: {
    fontSize: 16,
    fontWeight: "bold",
    margin: 5,
    marginLeft: 10,
    color: "#fff",
    marginBottom: 0,
  },
  sugestao: {
    fontSize: 14,
    color: "#fff",
    margin: 4,
    marginLeft: 7
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
    elevation: 0,
    shadowColor: '#000', // Cor da sombra (preto)
    shadowOffset: { width: 0, height: 4 }, // Distância da sombra
    shadowOpacity: 0, // Opacidade da sombra
    shadowRadius: 10, // Raio da sombra
    // alignItems: 'center',
  },
  parent: {
    // flex: 1,
    flexDirection: 'column',
    // justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  parent1: {
    // flex: 1,
    position: "absolute",
    // flexDirection: 'column',
    // justifyContent: 'flex-end',
    // borderWidth: 3,
    // borderColor: "blue",
    // alignItems: 'center',
    bottom: 0,
    height: '45%',
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
  rectangle_sugestao: {
    height: 120,     // 25% da altura do pai
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
    elevation: 0,
    zIndex: 5,
    shadowColor: '#000', // Cor da sombra (preto)
    shadowOffset: { width: 0, height: 4 }, // Distância da sombra
    shadowOpacity: 0, // Opacidade da sombra
    shadowRadius: 10, // Raio da sombra
  },
  text_input:{
    marginBottom: 15,
    color: '#FFF',
    fontWeight: 'bold',
    paddingBottom: 10,
    width: "100%",
    borderBottomWidth: 1,
    borderColor: '#A9A9A9'

  },

  appName: {
		fontSize: 28,
		// fontWeight: "bold",
		color: "#FFAF32", // Set your desired text color
	},
  altereText: {
    position: 'absolute',
    top: 30,
    fontSize: 30,
    color: '#8BC1C1',
    fontWeight: 'bold',
    textShadowColor: '#FFF', // Cor da sombra
    textShadowOffset: {        // Deslocamento da sombra
      width: 1,  // Deslocamento horizontal (x)
      height: 2, // Deslocamento vertical (y)
    },
    textShadowRadius: 4, // Adiciona o "desfoque" da sombra
  },
  clockContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 30,
  },
  clockText: {
		fontSize: 80,
		marginRight: 10,
    top: 20,
    borderBottomWidth: 2,
    borderColor: "#FF765A",
		color: "#fff", // Set your desired text color
    padding: 50,
    paddingBottom: 25,
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
  input2: {
    color: 'black',
    width: '100%',
    height: 40,
    borderColor: '#FF765A',
    // elevation: 5,
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
    borderColor: '#FF8167',
    marginBottom: 50,
    // borderWidth: 3,
    // borderColor: '#FF8167',
  },
  box1: {
    width: '100%',
    height: "100%",
    borderColor: '#FF8167',
  },
  box2: {
    width: '100%',
    height: "10%",
    // marginBottom: 20
    // borderWidth: 3,
    // borderColor: 'red',
    // borderColor: '#FF8167',
  },
  box_mais: {
    position: 'absolute',
    top: height * 0.1,
    width: width * 1,
    height: height * 0.7,
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
  box_mais1: {
    position: 'absolute',
    bottom: 0,
    // top: height * 0.1,
    width: width * 0.9,
    height: height * 0.5,
    // flex: 0.6,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderWidth: 3,
    borderColor: '#FF8167',
  },
  box_display_alarme: {
    position: 'absolute',
    zIndex: 1000,
    backgroundColor: "#E0FFFF",
    top: height * 0.4,
    width: width * 0.8,
    height: height * 0.2,
    alignItems: 'center',
    flex: 0.6,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderWidth: 2,
    borderColor: '#FFAF32',
    marginBottom: 50,
    shadowColor: '#000', // Cor da sombra (preto)
    shadowOffset: { width: 0, height: 4 }, // Distância da sombra
    shadowOpacity: 0, // Opacidade da sombra
    shadowRadius: 10, // Raio da sombra
  },
  msg_alarme: {
    position: "absolute",
    fontSize: 35,
    margin: 15,
    marginTop: 0,
    left: 0
  },
  msg_horas: {
    position: "absolute",
    fontSize: 35,
    margin: 20,
    marginBottom: 25,
    left: 0,
    bottom: 0
  },
    ok_box: {
    position: "absolute",
    margin:15,
    right: 0,
    bottom: 0,
    backgroundColor: "#FF8167",
    borderRadius: 10
    },
    ok: {
      fontSize: 20,
      paddingHorizontal: 15,
    },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: 'center',
  },
  navBar: {
    width: '100%',
    backgroundColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0, // Navbar fixa na parte inferior
    padding: 10,
  },
  imageNavBar: {
    position: 'absolute',
    bottom: 0.3,
    // width: Dimensions.get('window').width, // Largura total da tela
  },
  imgLinkExterno: {
    width: 20,
    height: 20,
  },

  btnSOS:{
    position: 'absolute',
    bottom: 110,
    zIndex: 1,
    width: 130,
    height: 100,
    right: 0,
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
  },
  weekdayContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    marginVertical: 10, 
    paddingHorizontal: 5, 
  },
  dayButton: {
    paddingVertical: 4,
    paddingHorizontal:10,
    backgroundColor: '#FFAF32',
    borderRadius:25, 
    alignItems: 'center',
    marginHorizontal: 6,
  },
  
  dayText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold', 
  },
  button_salvar_container: {
    width: '80%', 
    marginTop: 20,
    alignItems: 'flex-start', 
    marginLeft: 20,
  },
  button_salvar: {
    backgroundColor: '#FFAF32',
    borderRadius: 12,
    paddingVertical: 13, 
    paddingHorizontal: 40, 
    elevation: 2, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.3,
    shadowRadius: 8, 
  },
  button_navegar: {
    position: "absolute",
    backgroundColor: '#FFAF32',
    borderRadius: 12,
    paddingVertical: 13, 
    paddingHorizontal: 40, 
    elevation: 2, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.3,
    shadowRadius: 8,
    bottom: 80
  },
  texto_loja: {
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: "#FF8167",
    padding: 12,
    borderRadius: 14,
    color:  "#FFf"
  },
  button_salvar_text: {
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'regular', 
    textAlign: 'center', 
  }
  
});
export default App;