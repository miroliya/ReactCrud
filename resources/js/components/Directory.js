import axios from 'axios';
import {Component} from 'react';
import ReactDOM from 'react-dom';
import List from './List';

class Directory extends Component{
    constructor(props){
        super(props);

        this.state = {
            dir: [],
            item:{
                name: "",
                phone: "",
            },
            isEditing:false,
            temp_id:null
        }

        this.handleChange = this.handleChange.bind(this)
        this.add = this.add.bind(this)
        this.fetchAll = this.fetchAll.bind(this)
        this.delete = this.delete.bind(this)
        this.edit = this.edit.bind(this)
        this.update = this.update.bind(this)
    }

    // handle input changes and update item state
    handleChange(e){
        const name = e.target.name;
        const value = e.target.value;
        let item = this.state.item;

        item[name] = value;

        this.setState({item:item})

    }
    componentDidMount(){
        this.fetchAll();
    }
    fetchAll(){
        axios.get('/api/directory')
            .then(res => {
                this.setState({dir:res.data})
            });
    }
    add(e){
        e.preventDefault();
        axios.post('/api/directory', this.state.item)
            .then(res => {
                this.setState({
                    item:{
                        name: "",
                        phone: "",
                    },
                })
                this.fetchAll();
            }); 
    }
    edit(id){
        let item = this.state.dir.filter(item => item.id === id)[0]
        if(item){
            this.setState({
                isEditing:true,
                item:item,
                temp_id:item.id
            })
        }
    }
    update(e){
        e.preventDefault();
        axios.put(`/api/directory/${this.state.temp_id}`, this.state.item)
            .then(res => {
                this.setState({
                    item:{
                        name: "",
                        phone: "",
                    },
                    isEditing: false,
                    temp_id:null
                })
                this.fetchAll();
            })
    }
    view(item){
        alert(
            `
            Name = ${item.name}\n
            Phone = ${item.phone} 
            `
        )
    }

    delete(id){
        axios.delete(`/api/directory/${id}`)
            .then(res =>
                this.fetchAll()    
            )
    }
    render(){
        return (
                <div className="row mt-5">
                <div className="col-md-6">
                <form method="POST" onSubmit={this.state.isEditing ? this.update : this.add}>
                    <div className="from-group">
                        <label htmlFor="name">Name</label>
                        <input 
                        type="text" 
                        name="name"
                        id="name"
                        placeholder="Enter Name"
                        className="form-control m-2"
                        value={this.state.item.name}
                        onChange={this.handleChange}
                        />
                    </div>
                    <div className="from-group">
                        <label htmlFor="phone">Phone</label>
                        <input 
                        type="text" 
                        id="phone"
                        name="phone"
                        placeholder="Enter Phone"
                        className="form-control m-2"
                        value={this.state.item.phone}
                        onChange={this.handleChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-success m-2"
                    >

                        {this.state.isEditing ? 'Update' : 'Save'}
                    </button>
                </form>
                </div>
                <List 
                dir={this.state.dir}
                delete={this.delete}
                edit={this.edit}
                view={this.view}
                />
                </div>
        );
    }
}

export default Directory;


if(document.querySelector("#app")){
    ReactDOM.render(<Directory/>, document.querySelector("#app"))
}