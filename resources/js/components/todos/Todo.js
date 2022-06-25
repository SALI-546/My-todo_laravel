
import axios from 'axios';
import { random } from 'lodash';
import React, { useEffect, useState, useId } from 'react';
import ReactDOM from 'react-dom';




function Todo(props) {

    const [ todoData, setTodoData ] = useState({
        id: '',
        title: '',
        description:'',
        todos_status_id: '',
    });

    function getTodoData() {
        setTodoData(props.value);
        console.log('Todo data: '+JSON.stringify(todoData));
    }

    useEffect(()=>{
        getTodoData();
        changeAllBackgroundColors('.card-body, .card-header, .btn-ligth, .py-4, body');
    },[]);


    const saveTodoData = async () => {

        const headers = {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr('content'),
            "Content-type": "application/json; charset=UTF-8"
        };
        // const csrfToken = document.querySelector('meta[name="description"]').content
        console.log($('meta[name="csrf-token"]').attr('content'));

        const data = todoData;
        const res = await fetch('http://localhost/api/todos', {
            method: "PUT",
            body: JSON.stringify(todoData),
            headers: headers
        });
        const response = await res.json();
        console.log(response);
        window.location.href='http://localhost/dashboard';

        // props.setTodoData(props.index+props.value.todos_status_id, data);

    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        if(String.toString(value).length<255) {
            // props.value = [{...props.value, }];
            setTodoData(values => ({...values, [name]: value}));
            handleStatusChange(event);
            
        }

    }
    
    const handleStatusChange = (event) => {

        // handleChange(event);
        let status = 1;

        if (document.getElementById('todos_status_id'+props.index+props.value.todos_status_id).checked) {
            status = 2;
        } else {
            status = 1;
        }

        console.log('status: '+status);

        setTodoData(values => ({...values, ['todos_status_id']: status}));
        console.log('Todo data: '+JSON.stringify(todoData));

    }

    function randomColor (qtd) {
        const colorList = [];
        for ( let i = 0;  i<qtd;  i++) {
            let color = '';
            for ( let l = 0; l<3; l++ ) {
                const primaryColor = random(0, 255);
                    
                if (l==2){
                    
                    color += primaryColor;

                } else {
                    color += primaryColor+',';
                }

            }
            colorList.push(color);
        }
        return colorList;
    }
    
    const changeEditButtonColor = () => {
        console.log('Edit button modal clicked');
        // class=".navbar, .navbar-expand-md, .navbar-light, .bg-white, .shadow-sm"
        changeAllBackgroundColors('.card-body, .card-header, .btn-ligth, .py-4, body');
        showEditModal();
    }
    function changeAllBackgroundColors(elements) {

        const botoesEditarTarefa = document.querySelectorAll(elements);

        // $(".example").addClass("randomBackground").removeClass(".btn-secondary");
        // event.target.style.backgroundImage;
        let length = botoesEditarTarefa.length;
        console.log(length);
        let botaoEditarTarefa;
        for( let i = 0; i<length; i++){
            botaoEditarTarefa = botoesEditarTarefa[i];
            // botaoEditarTarefa
            const angle = random(1, 720);
        
            let opacity = random(40, 100);
            opacity = opacity/100;
    
            let colors =  randomColor(2);
            console.log(`${colors[0]}`);
            let percentage = random(0, 100);
            let otherSidePercentage = 100 - percentage;
            
            opacity = Math.round(opacity * 100) / 100;
            console.log(opacity);

            // botoesEditarTarefa[i].style['background-color']=`rgb(${colors[0]}, ${opacity})`;

            // botoesEditarTarefa[i].style['opacity']=`${opacity}`;
            botoesEditarTarefa[i].style['background-color']=`rgba(${colors[0]}, ${opacity})`;


            botoesEditarTarefa[i].style['border-color']=`rgb(${colors[1]})`;

            // botoesEditarTarefa[i].style['background-image']=`linear-gradient(${angle}, rgba(${colors[0]} ${opacity}) ${percentage}, rgba(${colors[1]}, ) ${otherSidePercentage})`;
        }
        console.log(props.index+props.value.todos_status_id);
        console.log('Edit button modal all clicked');
        console.log(modalId);
    }
    
    function showEditModal() {
        $('#'+modalId).modal('show');
    }

    function closeEditModal() {
        $('#'+modalId).modal('hide');
    }

    const [ modalId ] = useState(() => 'ModalEditarTarefa'+props.index+props.value.todos_status_id);
    const [ formId ] = useState(() => 'formCreateNewTodo'+props.index+props.value.todos_status_id);
    const [ tituloId ] = useState(() => 'tituloId'+props.index+props.value.todos_status_id);

    // const id = props.index+props.value.todos_status_id;
    return (
        <>

                        <div className="modal fade" id={modalId} tabIndex="-2" role="dialog" aria-labelledby={tituloId} aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id={tituloId}>Edit todo</h5>
                                    <button onClick={() => {
                                        closeEditModal(props.index+props.value.todos_status_id);
                                    }} className="close btn-danger rounded" data-dismiss="modal" aria-label="Fechar">
                                    <span className='text-light' aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form id={formId} >
                                        <div className="form-check mb-3 checkBoxScale">
                                            <input id={'todos_status_id'+props.index+props.value.todos_status_id} name='todos_status_id' className="form-check-input" type="checkbox" defaultChecked={props.value.todos_status_id>1?true:false} onChange={handleStatusChange}/>
                                            <label className="form-check-label" htmlFor="todos_status_id">
                                                Finished task?
                                            </label>
                                        </div>
                                        <div className="form-floating">
                                            <textarea name='title' maxLength={255} minLength={5} value={todoData.title || ""}  onChange={handleChange} className="form-control" placeholder="Enter todo title" id="floatingTextarea3" style={{'height':'100px', 'marginBottom':'2.5%'}}/>
                                            <label htmlFor="floatingTextarea3">Title</label>
                                        </div>
                                        <div className="form-floating">
                                            <textarea name='description' maxLength={255} minLength={10} value={todoData.description || ''} onChange={handleChange} className="form-control" placeholder="Enter todo description" id="floatingTextarea4" style={{'height':'200px'}}/>
                                            <label htmlFor="floatingTextarea4">Description</label>
                                            <input style={{"display":"none"}} name="todos_status_id" type="hidden" value={todoData.todos_status_id || ''}/>
                                            <input style={{"display":"none"}} name="id" type="hidden" value={todoData.id || ''}/>
                                        </div>
                                    {/* <div className="form-check">
                                            <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                                        </div> */}
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button id="closeModalEdit" type="button" onClick={() => {
                                        closeEditModal(props.index+props.value.todos_status_id);
                                    }} className="btn btn-secondary buttonScale" data-dismiss="modal">Cancel</button>
                                    <button onClick={ async () => {
                                        await saveTodoData(props.index+props.value.todos_status_id);
                                        }} type="button" className="btn btn-primary buttonScale" value="Save">Save</button>
                                </div>
                                </div>
                            </div>
                        </div>

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className='mb-5'>
                        <button className='btn btn-danger float-end '>
                            
                            <span> Deletar </span>
                            <i className="bi bi-x-octagon"></i>
                        </button>

                        </div>
                        <div className='mb-1'>
                        <h3 style={{color: '#000', fontWeight: 'bold'}}>{props.value.title || ""}</h3>
                        <p>{props.value.description || ""}</p>

                        </div>
                        <button onClick={()=>{
                            changeEditButtonColor();
                            }} id='editarTarefa' style={{borderColor: 'black'}} className='btn btn-ligth editarTarefa float-end buttonScale' data-toggle="modal" data-target="ModalEditarTarefa">
                            <span style={{fontWeight: 'bold'}}> Editar </span>
                            <i style={{color:'black'}} className="bi bi-pencil-square"></i>
                        </button> 
                        
                    </div>
                </div>
            </div>
{/* <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#ModalLongoExemplo">
            New todo +
            </button> */}


            
        </>
        
    );
}

export default Todo;
