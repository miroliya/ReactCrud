import { Component } from 'react';


class List extends Component{
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="col-md-6"> 
                <ul className="list-group">
                 {
                     this.props.dir.map(item => (
                        <li className="list-group-item" key={item.id}>
                            {item.name} - {item.phone}
                        <span className="float-right">
                            <button
                                className="btn btn-primary btn-sm mx-2"
                                onClick={e => this.props.view(item, e)}
                            >
                                View
                            </button>
                            <button
                                className="btn btn-warning btn-sm me-2"
                                onClick={e => this.props.edit(item.id, e)}
                            >
                                Edit
                            </button>
                            <button
                                className="btn btn-danger btn-sm me-2"
                                onClick={
                                    (e) => this.props.delete(item.id, e)
                                }
                            >
                                Delete
                            </button>
                        </span>
                        </li>
                     ))
                 }
                </ul>

            </div>
        )
    }
}

export default List;