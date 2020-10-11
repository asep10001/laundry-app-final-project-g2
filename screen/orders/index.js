import React, {Component} from 'react';
import {Image, ImageBackground} from 'react-native';
import firestore from '@react-native-firebase/firestore';
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
  List,
  ListItem,
} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {Col, Row, Grid} from 'react-native-easy-grid';
import {connect} from 'react-redux';
import {setLogin, setDataUser, setDataOrders} from '../../actions';

import {Input} from 'react-native-elements';
import {SQLiteContext} from '../../config';

class OrdersOld extends Component {
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
      hargaCabang: 0,
      orderLength: 0,
      inputIndex: 0,
    };
  }

  componentDidMount() {}

  // addOrderToSQLite = async () => {
  //   const data = [];
  //   await this.props.sqlite
  //     .runQuery(`select * from orders`, [])
  //     .then(([results]) => {
  //       for (let i = 0; i < 100; i++) {
  //         if (results.rows.item(i) !== undefined) {
  //           data.push(results.rows.item(i));
  //         }
  //       }
  //     });
  //   // if (data.length !== 0) {
  //   //   await this.props.sqlite.runQuery(
  //   //     `update orders set branch='${this.props.orderBranch}', item_weigh='${
  //   //       this.state.selected.item_weigh
  //   //     }', cost='${this.state.selected.cost}', services='${
  //   //       this.props.orderServices
  //   //     }', duration='${
  //   //       this.state.selected.duration === '1000' ? 'REGULER' : 'KILAT'
  //   //     }' where id='${data.length}'`,
  //   //     [],
  //   //   );
  //   //   alert(JSON.stringify(data));
  //   // } else {
  //   alert(data.length);

  //   let id = 0;
  //   let hasil = [];
  //   await this.props.sqlite
  //     .runQuery(`select id from orders`)
  //     .then(([results]) => {
  //       console.log('ini results ' + results.rows.item(0).id);
  //       for (let i = 0; i < 100; i++) {
  //         if (results.rows.item(i) !== undefined) {
  //           // if (results.)
  //           hasil.push(results.rows.item(i).id);
  //         } else {
  //           break;
  //         }
  //       }
  //       // alert(JSON.stringify(data))
  //     })
  //     .then(() => {
  //       for (let i = 0; i < 100; i++) {
  //         if (hasil[i] !== i) {
  //           id = i;
  //           break;
  //         }
  //       }
  //     });

  //   await this.props.sqlite.runQuery(
  //     `insert into orders values (?, ?, ?, ?, ?, ?, ?, ?)`,
  //     [
  //       id.toString(),
  //       this.props.dataUser[0].email.toString(),
  //       this.props.orderBranch.toString(),
  //       this.state.selected.item_weigh.toString(),
  //       this.state.selected.cost.toString(),
  //       this.props.orderServices.toString(),
  //       (this.state.selected.duration === '1000'
  //         ? 'REGULER'
  //         : 'KILAT'
  //       ).toString(),
  //       "pending"
  //     ],
  //   );

  //   const filterData = [];
  //   await this.props.sqlite
  //     .runQuery(
  //       `select * from orders where email='${this.props.dataUser[0].email}'`,
  //       [],
  //     )
  //     .then(([results]) => {
  //       for (let i = 0; i < 100; i++) {
  //         if (results.rows.item(i) !== undefined) {
  //           filterData.push(results.rows.item(i));
  //         }
  //       }
  //       // alert(JSON.stringify(data))
  //     });

  //   alert(JSON.stringify(filterData));
  //   this.props.setDataOrders(filterData);
  //   // }
  // };

  getFirebaseSize = async () => {
    let size = 0;
    await firestore()
      .collection('transactions')
      .doc(`${this.props.dataUser[0].email}`)
      .collection('orders')
      .get()
      .then((snap) => (size = snap.size));
    // .then(() => console.log(size));
    console.log(size);
    this.setState({
      orderLength: size,
    });
  };

  setOrderDataFromFirebase = async () => {
    let order = [];
    await firestore()
      .collection('transactions')
      .doc(`${this.props.dataUser[0].email}`)
      .collection('orders')
      // .doc(`order${i}`)
      .get()
      .then((snap) => {
        // order.push(JSON.parse(snap.data().order));
        snap.forEach((item) => {
          order.push(JSON.parse(item.data().order));
        });
      });
    // console.log(order);
    this.props.setDataOrders(order);
  };

  inputIndex = async () => {
    let order = [];
    await firestore()
      .collection('transactions')
      .doc(`${this.props.dataUser[0].email}`)
      .collection('orders')
      // .doc(`order${i}`)
      .get()
      .then((snap) => {
        // order.push(JSON.parse(snap.data().order));
        snap.forEach((item) => {
          order.push(JSON.parse(item.data().order).id);
        });
      });

    for (let i = 0; i < order.length+1; i++) {
      if (parseInt(order[i]) === 0 && order.length === 1) {
        // console.log(parseInt(order[i]) === 0 && order.length === 1)
        await this.setState({
          inputIndex: 1,
        });
        break;
      } else {
        if (order.length > 1 && (i !== parseInt(order[i]) || order[i] === undefined)) {
        console.log('masuk else')
          await this.setState({
            inputIndex: i,
          });

          break;
        }
      }
    }
  };

  addOrderFirebase = async () => {
    await this.getFirebaseSize();
    await this.inputIndex();
    console.log('ini dari input index' + this.state.inputIndex);
    // console.log(this.props.dataUser[0].email);
    firestore()
      .collection('transactions')
      .doc(`${this.props.dataUser[0].email}`)
      .collection('orders')
      .doc(`order${this.state.inputIndex}`)
      .set({
        order: `{
            "id" : "${this.state.inputIndex}",
          "branch": "${this.props.orderBranch}",
          "cost": "${this.state.selected.cost}",
         "duration": "${
           this.state.selected.duration === '1000' ? 'REGULER' : 'KILAT'
         }",
          "item_weigh": "${this.state.selected.item_weigh}",
          "services": "${this.props.orderServices}",
          "status": "pending"}`,
      });
    console.log('Order added!');

    await this.setOrderDataFromFirebase();

    console.log('Data updated');

    await this.props.getHarga();

    console.log('Harga Updated');

    this.props.navigation.navigate('Pesanan Saya');
  };

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
    // alert(this.constNow);
    let hitung = (parseInt(item_weigh) * parseInt(value)).toString();
    let hitungBerat = (
      parseInt(item_weigh) * parseInt(this.state.hargaCabang)
    ).toString();

    this.setState({
      selected: {
        item_weigh,
        duration: value,
        cost: (parseInt(hitung) + parseInt(hitungBerat)).toString(),
      },
      costNow: (parseInt(value) + parseInt(this.state.hargaCabang)).toString(),
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
        <Container style={{marginHorizontal: 20}}>
          <Content
            style={{
              backgroundColor: 'rgba(123,217,185, 0.5)',
              paddingVertical: 20,
            }}>
            <Form>
              <Label>Berat Item (Maks 10 Kg)</Label>
              <Picker
                mode="dropdown"
                selectedValue={this.state.selected.item_weigh}
                onValueChange={(value) => this.onItemWeighChange(value)}>
                {loopingpicker()}
              </Picker>
            </Form>
            <Form>
              <Label>Durasi Pengerjaan</Label>
              <Picker
                mode="dropdown"
                selectedValue={this.state.selected.duration}
                onValueChange={this.onDurationChange.bind(this)}>
                <Picker.Item label="Reguler" value="1000" />
                <Picker.Item label="Kilat" value="2000" />
              </Picker>
            </Form>
            <Form>
              <Label>Total Biaya</Label>
              <Input disabled value={this.state.selected.cost}></Input>
            </Form>

            <Content>
              <List>
                <ListItem noIndent style={{backgroundColor: '#cde1f9'}}>
                  <Left>
                    <Text style={{fontSize: 11}}>CABANG</Text>
                  </Left>
                  <Right>
                    <Text style={{fontSize: 11}}>
                      {this.props.orderBranch.toUpperCase()}
                    </Text>
                  </Right>
                </ListItem>

                <ListItem noIndent style={{backgroundColor: '#cde1f9'}}>
                  <Left>
                    <Text style={{fontSize: 11}}>SERVICE</Text>
                  </Left>
                  <Right>
                    <Text style={{fontSize: 11}}>
                      {this.props.orderServices.toUpperCase()}
                    </Text>
                  </Right>
                </ListItem>

                <ListItem noIndent style={{backgroundColor: '#cde1f9'}}>
                  <Left>
                    <Text style={{fontSize: 11}}>BERAT BARANG</Text>
                  </Left>
                  <Right>
                    <Text style={{fontSize: 11}}>
                      {this.state.selected.item_weigh}KG
                    </Text>
                  </Right>
                </ListItem>

                <ListItem noIndent style={{backgroundColor: '#cde1f9'}}>
                  <Left>
                    <Text style={{fontSize: 11}}>DURASI PENGIRIMAN</Text>
                  </Left>
                  <Right>
                    {this.state.selected.duration === '1000' ? (
                      <Text style={{fontSize: 11}}>REGULER</Text>
                    ) : (
                      <Text style={{fontSize: 11}}>KILAT</Text>
                    )}
                  </Right>
                </ListItem>

                <ListItem noIndent style={{backgroundColor: '#cde1f9'}}>
                  <Left>
                    <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                      TOTAL BAYAR
                    </Text>
                  </Left>
                  <Right>
                    <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                      {this.state.selected.cost}
                    </Text>
                  </Right>
                </ListItem>
              </List>
            </Content>
            <Content style={{marginTop: '10%'}}>
              <Button
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 20,
                  backgroundColor: '#01b976',
                }}
                onPress={() => {
                  this.addOrderFirebase();
                  // this.inputIndex();
                }}>
                <Text>BAYAR</Text>
              </Button>
            </Content>

            {/* {this.props.orderBranch}
            {this.props.orderServices}
            {this.props.orderCost}
            {this.props.orderItemWeigh}
            {this.props.orderDuration}
            {this.props.servicesCost}
            {this.state.selected.item_weigh}
            {this.state.selected.duration}
            {this.state.selected.cost} */}
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
            await this.props.setOrdersServices(this.state.service);
            await this.props.setServicesCost(this.state.servicesCost);
            await this.setState({
              hargaCabang: this.props.servicesCost,
            });

            // alert(this.state.hargaCabang);
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
                  <Text>Setrika</Text>
                </Button>
              </Body>
              <Right>
                <Text>Rp. 10000</Text>
              </Right>
            </CardItem>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={async () => {
            await this.setState({
              isServicesChosen: true,
              service: 'cuci',
              servicesCost: 12000,
            });
            await this.props.setOrdersServices(this.state.service);
            await this.props.setServicesCost(this.state.servicesCost);
            await this.setState({
              hargaCabang: this.props.servicesCost,
            });
          }}>
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
                  <Text>Cuci</Text>
                </Button>
              </Body>
              <Right>
                <Text>Rp. 12000</Text>
              </Right>
            </CardItem>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={async () => {
            await this.setState({
              isServicesChosen: true,
              service: 'cuci dan setrika',
              servicesCost: 18000,
            });
            await this.props.setOrdersServices(this.state.service);
            await this.props.setServicesCost(this.state.servicesCost);
            await this.setState({
              hargaCabang: this.props.servicesCost,
            });
          }}>
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
                  <Text>Cuci dan Setrika</Text>
                </Button>
              </Body>
              <Right>
                <Text>Rp. 18000</Text>
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
          style={{
            borderRadius: 20,
          }}
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
            <CardItem style={{backgroundColor: '#dadbe4'}}>
              <Body>
                <Button
                  transparent
                  style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: 30,
                      fontWeight: 'bold',
                    }}>
                    {item.branch}
                  </Text>
                </Button>
              </Body>
            </CardItem>
          </Card>
        </TouchableOpacity>,
      );
    });
    return cards;
  };

  screenShown = (costNow) => {
    if (
      this.state.isBranchChosen === true &&
      this.state.isServicesChosen === false
    ) {
      return this.serviceOption(costNow);
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
        <Content
          style={{
            backgroundColor: 'rgba(123,217,185, 0.5)',
          }}>
          <Content style={{}}>
            <Grid style={{}}>
              <Col
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#03b876',
                  height: 200,
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
                  flex: 1,
                  backgroundColor: '#03b876',
                  height: 200,
                  width: '70%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Row
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 25,
                      color: '#dadbe4',
                      fontWeight: 'bold',
                    }}>
                    {this.props.dataUser[0].username}
                  </Text>
                </Row>
                <Row
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: '#dadbe4',
                    }}>
                    {' '}
                    {this.props.dataUser[0].alamat}
                  </Text>
                </Row>
              </Col>
            </Grid>
          </Content>
          {this.screenShown(this.costNow)}
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

class Orders extends Component {
  render() {
    return (
      <SQLiteContext.Consumer>
        {(sqlite) => <OrdersOld {...this.props} sqlite={sqlite} />}
      </SQLiteContext.Consumer>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Orders);
