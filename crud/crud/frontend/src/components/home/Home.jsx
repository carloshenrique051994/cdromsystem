import React from 'react'
import Main from '../template/Main'
import axios from 'axios'

export default props =>
    <Main icon="home" title="Início"
        subtitle="Sistema de Organização de Estoque.">
        <div className='display-4'>Bem Vindo!</div>
        <hr />
        <center><p className="mb-0">LOJA DE CD'S <br /> CD ROM SYSTEM</p></center>
        <br /><br />
        
    { /*<body>
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome funcionario</label>
                            <input type="text" className="form-control"
                                name="name"
                                placeholder="Digite o nome..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Senha</label>
                            <input type="text" className="form-control"
                                name="senha"
                                placeholder="Senha..." />
                        </div>
                    </div>
                </div>
            </div>
        </body> */ }
</Main>