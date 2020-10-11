import React, {Component} from 'react';
import {SQLiteContext} from '../../config';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Label,
  Left,
  Right,
  Button,
  Input,
  View,
} from 'native-base';
import {connect} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {
  Alert,
  Dimensions,
  Platform,
  PixelRatio,
  StyleSheet,
  Image,
} from 'react-native';
import {setDataOrders} from '../../actions';

class StatusOrderOld extends Component {
  constructor(props) {
    super(props);
    // this.fetchingSQLite();

    this.state = {
      data: [],
      isPaid: false,
      index: 0,
      update: false,
    };
  }

  async componentDidMount() {
    // await this.props.getFirebaseData()
    // alert('hi')
  }
  setIsPaid = (data) => {
    this.setState({
      isPaid: data,
    });
  };

  addOrderFirebase = async (data) => {
    // console.log(JSON.stringify(data));
   await  data.forEach((item) => {
      firestore()
        .collection('transactions')
        .doc(`${this.props.dataUser[0].email}`)
        .collection('orders')
        .doc(`order${item.id}`)
        .set({
          order: `{
            "id" : "${item.id}",
          "branch": "${item.branch}",
          "cost": "${item.cost}",
         "duration": "${item.duration}",
          "item_weigh": "${item.item_weigh}",
          "services": "${item.services}",
          "status": "dibayar"}`,
        })
        .then(() => {
          console.log('Order added!');
        });
    });

    await this.props.getFirebaseData();
  };

  screenShow = () => {
    let data = this.props.dataOrder;

    if (data[0] !== undefined) {
      console.log(JSON.stringify(data));
    }
    const screen = [];
    data.forEach((item) => {
      // console.log(item)
      screen.push(
        <Content key={item.id}>
          <List>
            <ListItem style={{backgroundColor: '#35c693'}} key={item.id}>
              <Left>
                <Text
                  style={{
                    fontSize: style.label.fontSize,
                    fontWeight: 'bold',
                    color: 'white',
                  }}>
                  Order ID
                </Text>
              </Left>
              <Right>
                <Text
                  style={{
                    fontSize: style.label.fontSize,
                    fontWeight: 'bold',
                    color: 'white',
                  }}>
                  {'order' + item.id}
                </Text>
              </Right>
            </ListItem>
            <ListItem style={{backgroundColor: 'pink'}}>
              <Left>
                <Text style={{fontSize: style.order.fontSize}}>BRANCH: </Text>
              </Left>
              <Right>
                <Text style={{fontSize: style.order.fontSize}}>
                  {item.branch.toUpperCase()}
                </Text>
              </Right>
            </ListItem>
            <ListItem style={{backgroundColor: 'pink'}}>
              <Left>
                <Text style={{fontSize: style.order.fontSize}}>BERAT: </Text>
              </Left>
              <Right>
                <Text style={{fontSize: style.order.fontSize}}>
                  {item.item_weigh}KG
                </Text>
              </Right>
            </ListItem>
            <ListItem style={{backgroundColor: 'pink'}}>
              <Left>
                <Text style={{fontSize: style.order.fontSize}}>SERVICE: </Text>
              </Left>
              <Right>
                <Text style={{fontSize: style.order.fontSize}}>
                  {item.services}
                </Text>
              </Right>
            </ListItem>
            <ListItem style={{backgroundColor: 'pink'}}>
              <Left>
                <Text style={{fontSize: style.order.fontSize}}>LAYANAN: </Text>
              </Left>
              <Right>
                <Text style={{fontSize: style.order.fontSize}}>
                  {item.duration.toUpperCase()}
                </Text>
              </Right>
            </ListItem>
            <ListItem style={{backgroundColor: 'grey'}}>
              <Left>
                <Text
                  style={{
                    fontSize: style.label.fontSize,
                    fontWeight: 'bold',
                    color: 'black',
                  }}>
                  HARGA:
                </Text>
              </Left>
              <Right>
                <Text
                  style={{
                    fontSize: style.label.fontSize,
                    fontWeight: 'bold',
                    color: 'black',
                  }}>
                  {item.cost}
                </Text>
              </Right>
            </ListItem>
          </List>
          <View
            style={{
              alignSelf: 'stretch',
              marginVertical: style.label.fontSize,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {data[0] !== undefined ? (
              item.status === 'pending' ? (
                <Button
                  // disabled={true}
                  style={{
                    alignSelf: 'stretch',
                    marginHorizontal: '10%',
                    justifyContent: 'center',
                    borderRadius: style.label.fontSize,
                    backgroundColor: '#03b874',
                  }}
                  onPress={async () => {
                    // console.log(typeof(parseInt(item.id)))
                    this.deleteOrder(parseInt(item.id));
                    // this.props.getHarga();
                  }}>
                  <Text style={{fontSize: style.label.fontSize}}>BATALKAN</Text>
                </Button>
              ) : (
                <Button
                  // disabled={true}
                  style={{
                    alignSelf: 'stretch',
                    marginHorizontal: '10%',
                    justifyContent: 'center',
                    borderRadius: style.label.fontSize,
                    backgroundColor: '#bebebd',
                  }}>
                  <Text
                    style={{fontSize: style.label.fontSize, color: 'white'}}>
                    WAITING
                  </Text>
                </Button>
              )
            ) : (
              <Text>MENUNGGU</Text>
            )}
          </View>
        </Content>,
      );
    });

    return screen;
  };

  isPaid = () => {
    if (this.state.isPaid === true) {
      Alert.alert(
        'TERIMAKSIH',
        'Terimakasih sudah membayar. Kami sudah menghubungi pihak laundry dan akan segera memberitahukan anda tentang respond dari laundry tersebut',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK was pressed!'),
          },
        ],
      );
      return (
        <View style={{marginVertical: 20}}>
          <Button
            style={{
              alignSelf: 'stretch',
              marginHorizontal: 20,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              this.addOrderFirebase(this.props.dataOrder);
              this.setIsPaid(true);
            }}>
            <Text style={{fontSize: style.label.fontSize, fontWeight: 'bold'}}>
              BAYAR
            </Text>
          </Button>
        </View>
      );
    } else {
      return (
        <View style={{marginVertical: 20}}>
          <Button
            style={{
              alignSelf: 'stretch',
              marginHorizontal: 20,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              this.addOrderFirebase(this.props.dataOrder);
              this.setIsPaid(true);
            }}>
            <Text style={{fontSize: style.label.fontSize, fontWeight: 'bold'}}>
              BAYAR
            </Text>
          </Button>
        </View>
      );
    }
  };

  deleteOrderFromFirebase = async (index) => {
    await firestore()
      .collection('transactions')
      .doc(`${this.props.dataUser[0].email}`)
      .collection('orders')
      .doc(`order${index}`)
      .delete()
      .then(() => {
        console.log('User deleted!');
      });
    await this.props.getFirebaseData();
    this.props.getHarga();
  };

  // deleteOrderFromSQLite = async (index) => {
  //   const order_id = this.props.dataOrder[index].id;
  //   // console.log(order_id);

  //   await this.props.sqlite.runQuery(
  //     `delete from orders where id="${order_id}"`,
  //     [],
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
  //   await this.props.setDataOrders(filterData);
  // };
  // updateOrder = (index) => {
  //   // const data = this.props.dataOrder;
  //   // data.splice(index, 1)
  //   // this.props.setDataOrders(data)
  //   this.deleteOrderFromFirebase(index);
  //   // this.deleteOrderFromSQLite(index);
  // };

  deleteOrder = (index) => {
    const data = this.props.dataOrder;
    // const indexIni = index;

    // console.log(data[index]);
    Alert.alert(
      'BATAL ORDER',
      'Apakah anda yakin ingin mengulang atau membatalkan order ini?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel was pressed!'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.deleteOrderFromFirebase(index)},
      ],
    );
  };
  render() {
    return (
      <Container>
        <View
          style={{
            backgroundColor: '#03b876',
            height: 230,
            marginHorizontal: -20,
            marginBottom: 30,
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 20,
            }}>
            <Image
              source={require('../../assets/images/troley.png')}
              style={{width: 125, height: 108}}></Image>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: style.descTotalHarga.fontSize,
                fontWeight: 'bold',
              }}>
              Total Harga yang Harus dibayarkan adalah:{' '}
            </Text>
            <Text
              style={{fontSize: style.totalHarga.fontSize, fontWeight: 'bold'}}>
              Rp. {this.props.totalHarga},-
            </Text>
          </View>
        </View>
        <Content style={{marginHorizontal: style.label.fontSize}}>
          {this.state.update ? null : this.screenShow()}

          {this.state.update ? null : this.isPaid()}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  statusLogin: state.auth.isLoggedin,
  dataUser: state.userData.dataUser,
  dataOrder: state.orders.orders,
});

const mapDispatchToProps = (dispatch) => ({
  setStatusLogin: () => dispatch(setLogin()),
  setDataUSer: (payload) => dispatch(setDataUser(payload)),
  setDataCabang: (payload) => dispatch(setDataCabang(payload)),
  setDataOrders: (payload) => dispatch(setDataOrders(payload)),
});

class StatusOrder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalHarga: 0,
      statusOrder: '',
    };
  }

  getHarga = () => {
    const data = this.props.dataOrder;
    let totalHarga = 0;
    for (let i = 0; i < data.length; i++) {
      totalHarga += parseInt(data[i].cost);
    }
    this.setState({
      totalHarga: totalHarga,
    });
  };

  getFirebaseData = async () => {
    let size = 0;
    await firestore()
      .collection('transactions')
      .doc(`${this.props.dataUser[0].email}`)
      .collection('orders')
      .get()
      .then((snap) => (size = snap.size));
    // .then(() => console.log(size));
    console.log(size);

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

    // alert('hi')
  };
  async componentDidMount() {
    await this.getFirebaseData();
    await console.log(this.props.dataOrder);
    // await this.setState({
    //   data: this.props.dataOrder
    // })
    this.props.getHarga();
    // alert(this.props.dataOrder[0].status)
  }

  render() {
    return (
      <SQLiteContext.Consumer>
        {(sqlite) => (
          <StatusOrderOld
            {...this.props}
            sqlite={sqlite}
            tes={this.state.tes}
            totalHarga={this.props.totalHarga}
            data={this.state.data}
            getHarga={this.props.getHarga}
            getFirebaseData={this.getFirebaseData}
          />
        )}
      </SQLiteContext.Consumer>
    );
  }
}

let FONT_DETAIL_ORDER = 10;
let FONT_LABEL = 18;
let FONT_DESC_TOTAL_HARGA = 15;
let FONT_TOTAL_HARGA = 30;

if (PixelRatio.get() <= 2) {
  FONT_DETAIL_ORDER = 8;
  FONT_LABEL = 16;
  FONT_DESC_TOTAL_HARGA = 13;
  FONT_TOTAL_HARGA = 28;
}

const style = StyleSheet.create({
  label: {
    fontSize: FONT_LABEL,
  },
  order: {
    fontSize: FONT_DETAIL_ORDER,
  },
  totalHarga: {
    fontSize: FONT_TOTAL_HARGA,
  },
  descTotalHarga: {
    fontSize: FONT_DESC_TOTAL_HARGA,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(StatusOrder);
