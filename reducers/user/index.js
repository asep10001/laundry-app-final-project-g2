const initialState = {
  dataUser: [{
    id: 1,
    username: 'Asep Agus Heri Hermawan',
    alamat: 'jakarta selatan',
    photo: 'https://cdn3.iconfinder.com/data/icons/avatar-color/64/52-512.png'
  }],
};

const DataUser = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_USER':

      return {
        dataUser: action.payload,
      };
    default:
      return state;
  }
};

export default DataUser;
