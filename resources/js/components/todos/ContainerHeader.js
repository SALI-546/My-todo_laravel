import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { random } from 'lodash';

function ContainerHeader(props) {

    const[todoData, setTodoData] = useState({
        "todos_status_id": "1"
    });

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
        console.log('New todo button modal clicked');
        // class=".navbar, .navbar-expand-md, .navbar-light, .bg-white, .shadow-sm"
        changeAllButtonsEdit('.card-body, .card-header, .btn-ligth, .py-4, body');
    }
    function changeAllButtonsEdit(elements) {

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
        // console.log(props.index+props.value.todos_status_id);
        console.log('New todo button modal all clicked');
        // console.log(modalId);
        $('#ModalLongoExemplo').modal('show');
    }


    const handleSubmit = async () => {
        // return new Promise( (resolve, reject) => {
            const headers = {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr('content'),
                "Content-type": "application/json; charset=UTF-8"
            };
            // const csrfToken = document.querySelector('meta[name="description"]').content
            console.log($('meta[name="csrf-token"]').attr('content'));

            const res = await fetch('http://localhost/api/todos', {
                method: "POST",
                body: JSON.stringify(todoData),
                headers: headers
            });


            const response = await res.json();

            console.log(response);
            $('#closeModal').click();
            window.location.href='http://localhost/dashboard';
            // axios.post('http://localhost/api/todos', JSON.stringify(todoData), {headers:headers})
            // .then(res => {
            //     console.log(res.data);
            //     // setState(res.data);
            //     resolve(res.data);
            // })
            // .catch(err => {
            //     console.log(err);
            //     reject(err);
            // });
            // return;
            // return await res.data;
        // });
    }

    function closeEditModal() {
        $('#ModalLongoExemplo').modal('hide');
    }


    const handleChange = (event) => {
        // setTodoData({ title : event.target.value });
        const name = event.target.name;
        const value = event.target.value;
        if(String.toString(value).length<255) {
            setTodoData(values => ({...values, [name]: value}));
            console.log('Todo data: '+JSON.stringify(todoData));
        }
    }
    
    return (
        <>
            {/* <button onClick={ () => {
                showModal(closeModal);
            }} classNameName="btn btn-primary">New todo +</button> */}

            <button onClick={()=>{
                changeEditButtonColor();
            }} type="button" className="btn btn-primary" data-toggle="modal" data-target="#ModalLongoExemplo">
            New todo +
            </button>


            <div className="modal fade" id="ModalLongoExemplo" tabIndex="-1" role="dialog" aria-labelledby="TituloModalLongoExemplo" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="TituloModalLongoExemplo">New todo</h5>
                        <button  onClick={()=>{
                            closeEditModal();
                            }} className="close btn-danger rounded" data-dismiss="modal" aria-label="Fechar">
                        <span className='text-light' aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form id='formCreateNewTodo'>
                            <div className="form-floating">
                                <textarea name='title' maxLength={255} minLength={5} value={todoData.title || ""}  onChange={handleChange} className="form-control" placeholder="Enter todo title" id="floatingTextarea" style={{'height':'100px', 'marginBottom':'2.5%'}}/>
                                <label htmlFor="floatingTextarea">Title</label>
                            </div>
                            <div className="form-floating">
                                <textarea name='description' maxLength={255} minLength={10} value={todoData.description || ''} onChange={handleChange} className="form-control" placeholder="Enter todo description" id="floatingTextarea2" style={{'height':'200px'}}/>
                                <label htmlFor="floatingTextarea2">Description</label>
                                <input style={{"display":"none"}} name="todos_status_id" type="hidden" value={todoData.todos_status_id || ''}/>
                            </div>
                        {/* <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                            </div> */}
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button id="closeModal" onClick={()=>{
                            closeEditModal();
                            }} type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button onClick={ async () => {
                            await handleSubmit();
                            }} type="button" className="btn btn-primary" value="Save">Save</button>
                    </div>
                    </div>
                </div>
            </div>
                {/* {createTodoModal} */}

        </>
    );
}

export default ContainerHeader;



if (document.getElementById('todosListContainerHeader')) {
    ReactDOM.render(<ContainerHeader />, document.getElementById('todosListContainerHeader'), () => {
    });
}
