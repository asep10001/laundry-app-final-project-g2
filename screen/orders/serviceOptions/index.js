import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import {
  Card,
  CardItem,
  Body,
  Button,
  Text,
  Right,
  Container,
  Content,
  Icon,
  Image,
} from 'native-base';
import {ImageBackground} from 'react-native';

class ServiceOptions extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <Container>
          <Content>
            <TouchableOpacity onPress={() => alert('hi')}>
              <Card>
                <CardItem cardBody>
                  <ImageBackground
                    source={{
                      uri:
                        'https://asset.kompas.com/crops/_RhDNJRVbGUEcDqOwgJMVdj_O-w=/0x0:780x390/750x500/data/photo/2017/04/10/1065821084.jpg',
                    }}
                    style={{
                      height: 200,
                      width: null,
                      flex: 1,
                    }}></ImageBackground>
                </CardItem>
                <CardItem>
                  <Body>
                    <Button transparent>
                      <Icon active name="chatbubbles" />
                      <Text>4 Comments</Text>
                    </Button>
                  </Body>
                  <Right>
                    <Text>Rp. 1000</Text>
                  </Right>
                </CardItem>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => alert('hi')}>
              <Card>
                <CardItem cardBody>
                  <Image
                    source={{
                      uri:
                        'https://asset.kompas.com/crops/b-WXim5b6aN-jDtO93WHS5Ydj2s=/11x11:495x334/750x500/data/photo/2020/04/18/5e9ad23655851.jpg',
                    }}
                    style={{height: 200, width: null, flex: 1}}
                  />
                </CardItem>
                <CardItem>
                  <Body>
                    <Button transparent>
                      <Icon active name="chatbubbles" />
                      <Text>4 Comments</Text>
                    </Button>
                  </Body>
                  <Right>
                    <Text>Rp. 1000</Text>
                  </Right>
                </CardItem>
              </Card>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => alert('hi')}>
              <Card>
                <CardItem cardBody>
                  <Image
                    source={{uri: 'https://images.wisegeek.com/steam-iron.jpg'}}
                    style={{height: 200, width: null, flex: 1}}
                  />
                </CardItem>
                <CardItem>
                  <Body>
                    <Button transparent>
                      <Icon active name="chatbubbles" />
                      <Text>4 Comments</Text>
                    </Button>
                  </Body>
                  <Right>
                    <Text>Rp. 1000</Text>
                  </Right>
                </CardItem>
              </Card>
            </TouchableOpacity>
          </Content>
        </Container>
      </>
    );
  }
}

export default ServiceOptions;
