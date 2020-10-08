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
} from 'native-base';
import {connect} from 'react-redux';

class StatusOrderOld extends Component {
  constructor(props) {
    super(props);
    // this.fetchingSQLite();

    this.state = {
      data: [],
      isPaid: false,
    };
  }



  addOrderFirebase = (data) => {
    firestore()
      .collection('transactions')
      .doc(`${data.email}`)
      .set({
        email: data.email,
        name: data.username,
        alamat: data.alamat,
        photo: data.photo,
      })
      .then(() => {
        console.log('User added!');
      });
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
          {this.isPaid()}
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
        <Button
          onPress={() => alert(JSON.stringify(this.props.dataOrder))}>
          <Text>BAYAR</Text>
        </Button>
      );
    }
  };
  render() {
    return (
      <Container>
        <Content>{this.screenShow()}</Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  statusLogin: state.auth.isLoggedin,
  dataUser: state.userData.dataUser,
  dataOrder: state.orders.orders
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
