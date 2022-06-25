import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import List from './List';
import axios from 'axios';


function getTodosStatusList () {

    return new Promise( (resolve, reject) => {
        axios.get('http://localhost/api/todos_status')
        .then(res => {
            console.log(res.data);
            // setState(res.data);
            resolve(res.data);
        })
        .catch(err => reject(err));
        // return;
        // return await res.data;
    });

}

function Container() {

    const [ todosStatusList, setState ] = useState([]);

    useEffect( () => {

        const getTodosStatus = async () => {
            
            const res = await getTodosStatusList();
            setState(res);
        
        }

        getTodosStatus();

    }, []);

        return (
            <div className="container h-12 p-3">
                <div className='row'>
                    {todosStatusList.map( (todoStatus, index) => {

                        return <div key={index} className="justify-content-start col-md-6 mb-3">
                                    <div className="col-md-12">
                                        <div className="card">
                                            <div className="card-header">
                                                {todoStatus.status_description}
                                            </div>
                                            <div className='card-body'>
                                                <List key={index} value={todoStatus}></List>    
                                            </div>
                                        </div>
                                    </div>
                                </div>
                    })}
                </div>
            </div>
        );

}

export default Container;

if (document.getElementById('todosList')) {
    // const todosStatusList = {
    //     todosStatusList: {}
    // };
    ReactDOM.render(<Container />, document.getElementById('todosList'), () => {
    });
}
