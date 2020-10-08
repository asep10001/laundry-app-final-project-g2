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
  View,
  Accordion,
  Title,
  Label,
  Form,
  Picker,
} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {Col, Row, Grid} from 'react-native-easy-grid';
import {connect} from 'react-redux';
import {setLogin, setDataUser} from '../../actions';

import {Input} from 'react-native-elements';

class Orders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isBranchChosen: false,
      isServicesChosen: false,
      selected: {
        item_weigh: undefined,
        duration: undefined,
        cost: undefined,
      },
      costNow: this.props.orderCost,
    };
  }

  componentDidMount() {
    // alert(
    //   JSON.stringify(this.props.dataOrder)
    // )
  }

  onItemWeighChange = async (value) => {
    const {item_weigh, duration, cost} = this.state.selected;
    let costNow = this.state.costNow;
    await this.setState({
      selected: {
        item_weigh: value,
        duration,
        cost: (parseInt(costNow) * value).toString(),
      },
    });

    console.log(parseInt(costNow) * value);
  };

  onDurationChange = (value) => {
    const {item_weigh, duration, cost} = this.state.selected;
    let costNow = this.props.orderCost;
    let hitung = (parseInt(item_weigh) * parseInt(value)).toString();
    let hitungBerat = (parseInt(item_weigh) * parseInt(costNow)).toString();

    this.setState({
      selected: {
        item_weigh,
        duration: value,
        cost: (parseInt(hitung) + parseInt(hitungBerat)).toString(),
      },
      costNow: (parseInt(value) + parseInt(costNow)).toString(),
    });
  };

  otherServicesOptions = () => {
    const loopingpicker = () => {
      const picker = [];
      for (let i = 1; i < 11; i++) {
        picker.push(<Picker.Item key={i} label={i.toString()} value={i} />);
      }
      return picker;
    };
    return (
      <>
        <Container>
          <Content>
            <Form>
              <Label>Berat Item (Maks 10 Kg)</Label>
              <Picker
                mode="dropdown"
                placeholder="Select your SIM"
                placeholderStyle={{color: '#bfc6ea'}}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected.item_weigh}
                onValueChange={(value) => this.onItemWeighChange(value)}>
                {loopingpicker()}
              </Picker>
            </Form>

            <Form>
              <Label>Durasi Pengerjaan</Label>
              <Picker
                mode="dropdown"
                placeholder="Select your SIM"
                placeholderStyle={{color: '#bfc6ea'}}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected.duration}
                onValueChange={this.onDurationChange.bind(this)}>
                <Picker.Item label="1" value="1000" />
                <Picker.Item label="3" value="2000" />
              </Picker>
            </Form>

            <Form>
              <Label>Total Biaya</Label>
              <Input disabled value={this.state.selected.cost}></Input>
            </Form>

            <View>
              <Text>
                {this.props.orderBranch}
                {this.props.orderServices}
                {this.props.orderCost}
                {this.props.orderItemWeigh}
                {this.props.orderDuration}
                {this.props.servicesCost}
                berat sekarang
                {this.state.selected.item_weigh}
                durasi sekarang
                {this.state.selected.duration}
                harga sekarang
                {this.state.selected.cost}
              </Text>
            </View>
          </Content>
        </Container>
      </>
    );
  };

  serviceOption = () => {
    return (
      <>
        <TouchableOpacity
          onPress={async () => {
            await this.setState({
              isServicesChosen: true,
              service: 'setrika',
              servicesCost: 10000,
            });
            this.props.setOrdersServices(this.state.service);
            this.props.setServicesCost(this.state.servicesCost);
            alert(this.state.service);
          }}>
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
                <Text>Rp. 10000</Text>
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
          onPress={() => {
            this.setState({isBranchChosen: true});
            this.props.setOrdersBranch(item.branch);
          }}>
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

  screenShown = () => {
    if (
      this.state.isBranchChosen === true &&
      this.state.isServicesChosen === false
    ) {
      return this.serviceOption();
    } else if (
      this.state.isBranchChosen === true &&
      this.state.isServicesChosen === true
    ) {
      return this.otherServicesOptions();
    } else {
      return this.branchOptions();
    }
  };

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
          {this.screenShown()}
          {/* {this.state.isBranchChosen
            ? this.serviceOption()
            : this.branchOptions()}
          {this.state.isServicesChosen
            ? this.otherServicesOptions()
            : this.serviceOption()} */}
        </Content>

        {this.state.isBranchChosen ? (
          this.state.isServicesChosen ? (
            <>
              <Button
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => this.setState({isServicesChosen: false})}>
                <Text>KEMBALI MEMILIH SERVICE</Text>
              </Button>
            </>
          ) : (
            <>
              <Button
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => this.setState({isBranchChosen: false})}>
                <Text>KEMBALI MEMILIH CABANG</Text>
              </Button>
            </>
          )
        ) : null}
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
