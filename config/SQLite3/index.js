import SQLite from 'react-native-sqlite-storage';

class SQLite3 {
  constructor() {
    // SQLite.DEBUG(true);
    SQLite.enablePromise(true);
    this.conn = SQLite.openDatabase(
      'laundry.db',
      '1.0',
      'Test Database',
      200000,
      this.openConn,
      this.errorConn,
    );
    this.runQuery(
      'create table if not exists user(id integer primary key, username text, alamat text, photo text, email text)',
      [],
    );
    this.runQuery(
      'create table if not exists branch(id integer primary key, alamat text, branch text, photo text)',
      [],
    );
    this.runQuery(
      'create table if not exists orders(id integer primary key, email text, branch text, item_weigh integer, cost integer, services text, duration text, status text)',
      [],
    ).finally(() => {
      // this.runQuery("update user set username='Asep Agus H', photo='https://4.bp.blogspot.com/-lcTv9g6UFb0/WIM568bouVI/AAAAAAAAAZk/GU_jSbIapuAJ5IDK6hKWmNhVUXkCaxZKwCLcB/s1600/Gambar-Monyet-Lucu-Gokil-Kocak-3.jpg' where id='1' ")
      this.runQuery('insert into user values (?, ?, ?, ?, ?)', [
        '1',
        'asep',
        'jakarta selatan',
        'https://cdn3.iconfinder.com/data/icons/avatar-color/64/52-512.png',
        'asep@example.com',
      ])
        .then(() =>
          console.info('Successfully insert default user and order!!'),
        )
        .catch((err) =>
          console.info('Default User and Orders already Exists! '),
        );
      this.runQuery('insert into branch values (?, ?, ?, ?)', [
        '3',
        'jakarta selatan',
        'kuningan',
        'https://www.jejakpiknik.com/wp-content/uploads/2018/09/Kuningan-City-Mall-630x380.jpg',
      ])
        .then(() =>
          console.info('Successfully insert default user and order!!'),
        )
        .catch((err) =>
          console.info('Default User and Orders already Exists! '),
        );
      this.runQuery('insert into orders values (?, ?, ?, ?, ?, ?, ?, ?)', [
        '1',
        'asep@example.com',
        'kemang',
        '2',
        '11000',
        'reguler',
        '3',
        'pending',
      ])
        .then(() =>
          console.info('Successfully insert default user and order!!'),
        )
        .catch((err) =>
          console.info('Default User and Orders already Exists! '),
        );
    });
  }

  openConn = () => {
    console.log('SQLite Database opened!!');
  };

  errorConn = (e) => {
    console.error('Error SQLite: ', err);
  };

  runQuery = (query, params) => {
    return this.conn.then((tx) => {
      return tx.executeSql(query, params);
    });
  };
}

export default SQLite3;
