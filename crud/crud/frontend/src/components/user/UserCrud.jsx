import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    icon: 'users',
    title: 'Sistema de controle de Estoque',
    subtitle: "Cadastro de CD'S: Incluir, Listar, Alterar e Excluir!"
}

const baseUrl = 'http://localhost:3001/users'
const initialState = {
    user: { nome: '', autor: '', versao: '', gravadora: '', estilo: '', preco: '', quantidade: '' },
    list: []
}

export default class UserCrud extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ user: initialState.user })
    }

    save() {
        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        axios[method](url, user)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ user: initialState.user, list })
            })
    }

    getUpdatedList(user, add = true) {
        const list = this.state.list.filter(u => u.id !== user.id)
        if(add) list.unshift(user)
        return list
    }

    updateField(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control"
                                name="nome"
                                value={this.state.user.name}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Autor</label>
                            <input type="text" className="form-control"
                                name="autor"
                                value={this.state.user.autor}
                                onChange={e => this.updateField(e)}
                                placeholder="Autor da midia" />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Versão</label>
                            <input type="text" className="form-control"
                                name="versao"
                                value={this.state.user.versao}
                                onChange={e => this.updateField(e)}
                                placeholder="Versão/Volume/Album..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Gravadora</label>
                            <input type="text" className="form-control"
                                name="gravadora"
                                value={this.state.user.gravadora}
                                onChange={e => this.updateField(e)}
                                placeholder="Gravadora responsavel" />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Estilo</label>
                            <input type="text" className="form-control"
                                name="estilo"
                                value={this.state.user.estilo}
                                onChange={e => this.updateField(e)}
                                placeholder="Estilo da midia" />
                        </div>
                    </div>


                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Preço</label>
                            <input type="number" className="form-control"
                                name="preco"
                                value={this.state.user.preco}
                                onChange={e => this.updateField(e)}
                                placeholder="Preço" />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Quantidade</label>
                            <input type="number" className="form-control"
                                name="quantidade"
                                value={this.state.user.quantidade}
                                onChange={e => this.updateField(e)}
                                placeholder="Quantidade estoque..." />
                        </div>
                    </div>
                </div>

                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    load(user) {
        this.setState({ user })
    }

    remove(user) {
        axios.delete(`${baseUrl}/${user.id}`).then(resp => {
            const list = this.getUpdatedList(user, false)
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <table className="table mt-9">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome do CD</th>
                        <th>Autor</th>
                        <th>Versão do CD</th>
                        <th>Gravadora</th>
                        <th>Estilo</th>
                        <th>Preço</th>
                        <th>Quantidade em Estoque</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.nome}</td>
                    <td>{user.autor}</td>
                    <td>{user.versao}</td>
                    <td>{user.gravadora}</td>
                    <td>{user.estilo}</td>
                    <td>{user.preco}</td>
                    <td>{user.quantidade}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(user)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }
    
    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}