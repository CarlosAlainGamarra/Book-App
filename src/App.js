import React from 'react';
import './App.css';
import Menu from './Menu';
import List from './List';

class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      books:[
        {id:0, rating: 4, title: 'Anónima', image: 'libro08.jpg'},
        {id:1, rating: 3, title: 'Un hombre interesante', image: 'libro07.jpg'},
        {id:2, rating: 5, title: 'La desconocida', image: 'libro09.jpg'},
        {id:3, rating: 5, title: 'Escape', image: 'libro10.jpg'},
        {id:4, rating: 5, title: 'Notas al pie', image: 'libro01.jpg'},
        {id:5, rating: 5, title: 'Merca', image: 'libro02.jpg'},
        {id:6, rating: 2, title: 'Sobrenatural', image: 'libro05.jpg'},
        {id:7, rating: 4, title: 'El campamento', image: 'libro03.jpg'}
      ],
      copyBooks: []
    };

    this.onSearch = this.onSearch.bind(this);
    this.addItem = this.addItem.bind(this);
    this.remove = this.remove.bind(this);
    this.updateRating = this.updateRating.bind(this);
  }

  initBooks(){
    //this.setState({copyBooks: [...this.state.books]});
    this.setState((state,props) => ({
      copyBooks: [...state.books]
    }));
  }

  componentDidMount(){
    this.initBooks();
  }

  onSearch(query){
    if(query === ''){
      this.setState({copyBooks: [...this.state.books]});
    }else{

      const temp = [...this.state.books];
      var res = [];
      temp.forEach(item =>{
        if(item.title.toLowerCase().indexOf(query) > -1){
          res.push(item);
        }
      });
    
      this.setState({copyBooks: [...res]});
    }
  }

  addItem(item){
    var temp = [...this.state.books];
    const id = temp[temp.length-1].id + 1;
    item['id'] = id;
    temp.push(item);
    this.setState({books: [...temp]});
    this.initBooks();
  }

  remove(id){
    var temp = [...this.state.books];
    const res = temp.filter(item => item.id != id);
    this.setState({books: [...res]});
    this.initBooks();
  }

  updateRating(item){
    var temp = [...this.state.books];
    const index = temp.findIndex(x => x.id === item.id);
    temp[index].title = item.title;
    temp[index].image = item.image;
    temp[index].rating = item.rating;

    this.setState({books: [...temp]});
    this.initBooks();
  }

  render(){
    return (
      <div className="app">
        <Menu title="Books" onsearch={this.onSearch} onadd={this.addItem} />
        <List className="list" items={this.state.copyBooks} onremove={this.remove} onupdaterating={this.updateRating} />
      </div>
    );
  }
}

export default App;
