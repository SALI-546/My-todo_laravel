@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header h-auto">
                    <div style="display: flex; align-items:center; justify-content:center">
                        Todos List
                    </div>
                <div id="todosListContainerHeader" class="col-sm-12 text-end justify-content-end">
                </div>
            </div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>

                    @endif
                    <!-- {{ __('Todos List') }} -->
                    <div id="todosList"></div>
                </div>

            </div>
        </div>
    </div>
</div>
@endsection
