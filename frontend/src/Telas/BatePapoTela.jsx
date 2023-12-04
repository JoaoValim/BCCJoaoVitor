import { Container } from "react-bootstrap";
import { useSelector,useDispatch} from 'react-redux';
import { getUsuarios,cadastrarUsuario } from "../redux/usuarioReducer";
import Estado from "../Estados/estado";

export default function BatePapoTela(props){

    const { estado, mensagem, usuarios } = useSelector((state) => state.usuario);
    const dispatch = useDispatch();
    dispatch(getUsuarios());
    return(
        <Container>
            <div>
                <h2>Lista de Usuários</h2>
                <ul>
                    {usuarios.map((usuario) => (
                        <li key={usuario.id}>
                            <strong>ID:</strong> {usuario.id}, <strong>Nickname:</strong> '{usuario.nickname}'
                            <ul>
                                <h2>Mensagens</h2>
                                {usuario.mensagens.map((mensagem) => (
                                    <li key={mensagem.id}>
                                            {"id:"+mensagem.id}
                                            {"  "}
                                            {"Falou: "+mensagem.mensagem}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </Container>
    );
}