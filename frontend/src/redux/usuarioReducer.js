import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Estado from "../Estados/estado";
const urlBase = "https://backend-bcc-2-b.vercel.app/usuario";
export const getUsuarios = createAsyncThunk('getUsuarios', async () => {
    try {
        const resposta = await fetch(urlBase, { method: "GET" });
        const response = await resposta.json();
        if (response.status) {
            return {
                status: response.status,
                listaUsuarios: response.listaUsuarios
            }
        }
        else {
            return {
                status: response.status,
                listaUsuarios: []
            }
        }
    } catch (erro) {
        return {
            status: false,
            listaUsuarios: []
        }
    }
});

export const cadastrarUsuario = createAsyncThunk('cadastrarUsuario', async (usuario) => {
    try {
        const resposta = await fetch(urlBase, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });
        const response = await resposta.json();
        if (response.status){
            return {
                status: response.status,
                usuario:usuario,
                mensagem: response.mensagem
            }
        }
        else{
            return {
                status: response.status,
                mensagem: response.mensagem
            }
        }
    }
    catch (erro) {
        return {
            status: false,
            mensagem: "Não foi possível cadastrar o usuario: " + erro.message
        }
    }
});

const estadoInicial = {
    estado: Estado.OCIOSO,
    mensagem: "",
    usuarios: []
}

const usuarioslice = createSlice({
    name: 'usuario',
    initialState: estadoInicial,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsuarios.pending, (state, action) => {
                state.estado = Estado.PENDENTE;
                state.mensagem = 'Buscando usuarios...';
            })
            .addCase(getUsuarios.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = Estado.OCIOSO;
                    state.mensagem = "Usuarios recuperados do backend!";
                    state.usuarios = action.payload.listaUsuarios;
                }
                else {
                    state.estado = Estado.ERRO;
                    state.mensagem = action.payload.mensagem;
                    state.usuarios = [];
                }
            })
            .addCase(getUsuarios.rejected, (state, action) => {
                state.estado = Estado.ERRO;
                state.mensagem = action.payload.mensagem;
                state.usuarios = [];
            })
            .addCase(cadastrarUsuario.pending, (state, action) =>{
                state.estado = Estado.PENDENTE;
                state.mensagem = 'Processando a requisição...'
            })
            .addCase(cadastrarUsuario.fulfilled, (state, action) =>{
                if (action.payload.status){
                    state.estado = Estado.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.usuarios.push(action.payload.produto);
                }
                else{
                    state.estado = Estado.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(cadastrarUsuario.rejected, (state, action) => {
                state.estado = Estado.ERRO;
                state.mensagem = action.payload.mensagem;
            })
    }
});

export default usuarioslice.reducer;