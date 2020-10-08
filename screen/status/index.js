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
} from 'native-base';
import {connect} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
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

  async componentDidMount() {}

  getFirebaseData = async (data) => {
    let size = 0;
    await firestore()
      .collection('transactions')
      .doc(`${data[0].email}`)
      .collection('orders')
      .get()
      .then((snap) => (size = snap.size));
    // .then(() => console.log(size));
    console.log(size);

    let order = [];
    for (let i = 0; i < size; i++) {
      await firestore()
        .collection('transactions')
        .doc(`${data[0].email}`)
        .collection('orders')
        .doc(`order${i}`)
        .get()
        .then((snap) => {
          order.push(
            JSON.parse(snap.data().order));
        });
    }
    // console.log(order);
    this.props.setDataOrders(order);

    // alert('hi')
  };
  addOrderFirebase = (data) => {
    for (let i = 0; i < data.length; i++) {
      firestore()
        .collection('transactions')
        .doc(`${data[i].email}`)
        .collection('orders')
        .doc(`order${i}`)
        .set({
          order: `{
            "id" : "${i}",
          "branch": "${data[i].branch}",
          "cost": "${data[i].cost}",
         "duration": "${data[i].duration}",
          "item_weigh": "${data[i].item_weigh}",
          "services": "${data[i].services}",
          "status": "pending"}`,
        })
        .then(() => {
          console.log('Order added!');
        });
    }
  };

  //   fetchingSQLite = async () => {
  //     const data = [];
  //     await this.props.sqlite
  //       .runQuery(
  //         `select * from orders where email='${this.props.dataUser[0].email}'`,
  //         [],
  //       )
  //       .then(([results]) => {
  //         for (let i = 0; i < 100; i++) {
  //           if (results.rows.item(i) !== undefined) {
  //             data.push(results.rows.item(i));
  //           }
  //         }
  //       });
  //     this.setState({
  //       data,
  //     });
  //   };
  componentDidMount() {
    // this.fetchingSQLite();
  }

  screenShow = () => {
    const data = this.props.dataOrder;
    const screen = [];
    for (let i = 0; i < data.length; i++) {
      screen.push(
        <Content key={i}>
          <List>
            <ListItem itemHeader first key={i}>
              <Left>
                <Text>order{data[i].id}</Text>
              </Left>
            </ListItem>
            <ListItem>
              <Left>
                <Text>BRANCH: </Text>
              </Left>
              <Right>
                <Text>{data[i].branch}</Text>
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>BERAT: </Text>
              </Left>
              <Right>
                <Text>{data[i].item_weigh}KG</Text>
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>SERVICE: </Text>
              </Left>
              <Right>
                <Text>{data[i].services}</Text>
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>LAYANAN: </Text>
              </Left>
              <Right>
                <Text>{data[i].duration}</Text>
              </Right>
            </ListItem>
            <ListItem last>
              <Left>
                <Text>HARGA: </Text>
              </Left>
              <Right>
                <Text>{data[i].cost}</Text>
              </Right>
            </ListItem>
          </List>
          <Button
            onPress={async () => {
              this.deleteOrder(i);
            }}>
            <Text>RUBAH</Text>
          </Button>
        </Content>,
      );
    }
    return screen;
  };

  isPaid = () => {
    if (this.state.isPaid) {
      return (
        <ListItem>
          <Text>MENUNGGU KONFIRMASI LAUNDRY</Text>
        </ListItem>
      );
    } else {
      return (
        <>
          <Button onPress={() => this.addOrderFirebase(this.props.dataOrder)}>
            <Text>BAYAR</Text>
          </Button>
          <Button onPress={() => this.getFirebaseData(this.props.dataUser)}>
            <Text>Ambil</Text>
          </Button>
        </>
      );
    }
  };

  deleteOrderFromFirebase = async (index) => {
    firestore()
      .collection('transactions')
      .doc(`${this.props.dataUser[0].email}`)
      .collection('orders')
      .doc(`order${index}`)
      .delete()
      .then(() => {
        console.log('User deleted!');
      });
  };

  deleteOrderFromSQLite = async (index) => {
    const order_id = this.props.dataOrder[index].id;
    console.log(order_id);

    await this.props.sqlite.runQuery(
      `delete from orders where id="${order_id}"`,
      [],
    );
    const filterData = [];
    await this.props.sqlite
      .runQuery(
        `select * from orders where email='${this.props.dataUser[0].email}'`,
        [],
      )
      .then(([results]) => {
        for (let i = 0; i < 100; i++) {
          if (results.rows.item(i) !== undefined) {
            filterData.push(results.rows.item(i));
          }
        }
        // alert(JSON.stringify(data))
      });

    alert(JSON.stringify(filterData));
    await this.props.setDataOrders(filterData);
  };
  updateOrder = (index) => {
    // const data = this.props.dataOrder;
    // data.splice(index, 1)
    // this.props.setDataOrders(data)
    this.deleteOrderFromFirebase(index);
    this.deleteOrderFromSQLite(index);
  };

  deleteOrder = (index) => {
    const data = this.props.dataOrder;
    const indexIni = index;
    Alert.alert(
      'BATAL ORDER',
      'Apakah anda yakin ingin mengulang atau membatalkan order ini?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel was pressed!'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.updateOrder(indexIni)},
      ],
    );
  };
  render() {
    return (
      <Container>
        <Content>
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
  render() {
    return (
      <SQLiteContext.Consumer>
        {(sqlite) => <StatusOrderOld {...this.props} sqlite={sqlite} />}
      </SQLiteContext.Consumer>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(StatusOrder);
