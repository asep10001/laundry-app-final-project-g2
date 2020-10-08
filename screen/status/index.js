import React, {Component} from 'react';
import {SQLiteContext} from '../../config';
import {Container, Header, Content, List, ListItem, Text} from 'native-base';

class StatusOrderOld extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  async componentDidMount() {
    const data = [];
    await this.props.sqlite
      .runQuery(`select * from orders`, [])
      .then(([results]) => {
        for (let i = 0; i < 100; i++) {
          if (results.rows.item(i) !== undefined) {
            data.push(results.rows.item(i));
          }
        }
      });
    this.setState({
      data,
    });
  }

  screenShow = () => {
    const data = this.state.data;
    const screen = [];
    for (let i = 0; i < data.length; i++) {
      screen.push(
        <Container>
          <Header />
          <Content>
            <List>
              <ListItem itemHeader first>
                <Text>{data[i].id}</Text>
              </ListItem>
              <ListItem>
                <Text>{data[i].branch}</Text>
              </ListItem>
              <ListItem last>
                <Text>Cop Out</Text>
              </ListItem>
            </List>
          </Content>
        </Container>,
      );
    }
    return screen
  };
  render() {
    return <>{this.screenShow()}</>;
  }
}

class StatusOrder extends Component {
  render() {
    return (
      <SQLiteContext.Consumer>
        {(sqlite) => <StatusOrderOld {...this.props} sqlite={sqlite} />}
      </SQLiteContext.Consumer>
    );
  }
}
export default StatusOrder;
