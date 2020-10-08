import React, {Component} from 'react';
import {Image, ImageBackground} from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {Col, Row, Grid} from 'react-native-easy-grid';
import {connect} from 'react-redux';
import {setLogin, setDataUser} from '../../actions';

class Orders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isBranchChosen: false,
    };
  }

  componentDidMount() {
    // alert(
    //   JSON.stringify(this.props.dataOrder)
    // )
  }

  serviceOption = () => {
    return (
      <>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
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
      </>
    );
  };

  branchOptions = () => {
    const cards = [];
    this.props.dataCabang.map((item, index) => {
      cards.push(
        <TouchableOpacity
          key={index}
          onPress={() => this.setState({isBranchChosen: true})}>
          <Card>
            <CardItem cardBody>
              <ImageBackground
                source={{
                  uri: item.photo,
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
                  <Text>{item.branch}</Text>
                </Button>
              </Body>
            </CardItem>
          </Card>
        </TouchableOpacity>,
      );
    });
    return cards;
  };

  loopingUser = () => {};

  render() {
    return (
      <Container>
        <Content>
          <Content>
            <Grid>
              <Col
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#635DB7',
                  height: 100,
                  width: '30%',
                }}>
                <Thumbnail
                  large
                  source={{
                    uri: this.props.dataUser[0].photo,
                  }}
                />
              </Col>
              <Col
                style={{
                  backgroundColor: '#00CE9F',
                  height: 100,
                  width: '70%',
                }}>
                <Row>
                  <Text>{this.props.dataUser[0].username}</Text>
                </Row>
                <Row>
                  <Text>{this.props.dataUser[0].alamat}</Text>
                </Row>
              </Col>
            </Grid>
          </Content>
          {this.state.isBranchChosen
            ? this.serviceOption()
            : this.branchOptions()}
        </Content>
        {this.state.isBranchChosen ? (
          <>
            <Button style={{
              width: "100%",
              justifyContent:'center',
              alignItems: 'center'
            }}
            onPress={()=>this.setState({isBranchChosen: false})}
            >
              <Text>KEMBALI MEMILIH CABANG</Text>
            </Button>
          </>
        ) : (
          null
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  statusLogin: state.auth.isLoggedin,
  dataUser: state.userData.dataUser,
  dataOrder: state.orders.orders,
  dataCabang: state.cabang.cabang,
});
const mapDispatchToProps = (dispatch) => ({
  setStatusLogin: () => dispatch(setLogin()),
  setDataUSer: (payload) => dispatch(setDataUser(payload)),
  setDataOrders: (payload) => dispatch(setDataOrders(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
