import { list } from 'postcss';
import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import Todo from './Todo';
// import Echo from 'laravel-echo';

// import 'dotenv/config';
 
// const client = require('pusher-js');

// client.logToConsole = true;
 
// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     // key: process.env.REACT_PUSHER_APP_KEY,
//     key: 'local',
//     wsHost: '127.0.0.1',
//     cluster: 'mt1',
//     // wsHost: process.env.REACT_PUSHER_APP_SERVER,
//     wsPort: 6001,
//     forceTLS: false,
//     encrypted: true,
//     csrfToken: $('meta[name="csrf-token"]').attr('content'),
//     authEndpoint: 'http://localhost/broadcasting/auth',
//     // client: client
// });

    // window.Echo.channel('channel')
    // .listen('Hello', (e) => {
    //     console.log(e);
    // })

    // window.Echo.channel('private.todo.'+$('meta[name="csrf-token"]').attr('content'))
    // .listen('private.todo', (e) => {
    //     alert(e.message.message);
    // });

    function getTodosList(props) {


    return new Promise( (resolve, reject) => {
        const todoStatus = props.value;
        axios.get('http://localhost/api/todos?' + 'status=' + todoStatus.id)
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


function List(props) {

    const [ todosList, setState ] = useState([]);

    useEffect( () => {

        const getTodos = async () => {
            
            const res = await getTodosList(props);
            setState(res);
        
        }

        getTodos();

    }, []);

    // const setListItemData = (index, data) => {
    //     setState(list => ({...list, [index] : data}));
    // }
    

    // useEffect( () => {

    //     const getTodos = async () => {
            
    //         const res = await getTodosList(props);
    //         setState(res);
        
    //     }
        
    //     getTodos();

    // }, todosList);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <ul>
                        {todosList.map( (todoItem, index) => {
                        return  <li className='p-3' key={index} >
                                    <div className="col-md-12">
                                        <div className="card">
                                            {/* <div className="card-header">
                                                {todoItem.title}
                                            </div> */}
                                            <div className='card-body p-3'>
                                                <Todo key={index} index={index} value={todoItem}></Todo>
                                            </div>
                                        </div>
                                    </div>

                                </li>

                        })}
                    </ul>
                </div>
            </div>
        </div>
    );

}

export default List;
