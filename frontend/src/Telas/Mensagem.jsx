import { Container } from "react-bootstrap";
import { useSelector,useDispatch} from 'react-redux';
import { getUsuarios,cadastrarMensagem } from "../redux/usuarioReducer";
import Estado from "../Estados/estado";

export default function Mensagem(){
    const { estado, mensagem, usuarios } = useSelector((state) => state.usuario);
    const dispatch = useDispatch();
    dispatch(getUsuarios());
    const ListaUsuarios = []

    const usuarioIni = {
        nickname:"",
        mensagem:""
    }

    const [usuario, setusuario] = useState(usuarioIni);

    function escreveu(e){
        const componente = e.currentTarget;
        setusuario({...usuario,[componente.name]:componente.value});
    }

    const usuarioF= {
        usuario:"",
        mensagem:""
    }
    const [usuarioFinal, setusuarioFinal] = useState(usuarioF);

    function manipularSubmissao(e){
        const form = e.currentTarget; 
        if (form.checkValidity()){
            const usuarioDesejado = usuarios.find((usuarioo) => usuarioo.nickname === usuario.nickname);
            if(usuarioDesejado != null){
                usuarioF.usuario = usuarioDesejado;
                usuarioF = usuario.mensagem;
                dispatch(cadastrarMensagem(usuarioF))
                const usuarioF= {
                    usuario:"",
                    mensagem:""
                }
            }
            setusuario(usuarioIni);
            setFormValidado(false);
        }
        else{
            setFormValidado(true);
        }

        e.stopPropagation();
        e.preventDefault();
    }

    return(
        <Container>
            <Pagina/>{
            <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                <Row>
                    <Col md={4}>
                        <Form.Group>
                            <FloatingLabel
                                label="Nickname:"
                                className="mb-3"
                            >
                                <Form.Control 
                                    type="text" 
                                    placeholder="Informe o seu nickname" 
                                    id="nickname" 
                                    name="nickname" 
                                    value={usuario.nickname}
                                    onChange={escreveu}
                                    required />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe o nickname!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                
                    <Col md={4}>
                        <Form.Group>
                            <FloatingLabel
                                label="Mensagem:"
                                className="mb-3"
                            >
                                <Form.Control 
                                    type="text" 
                                    placeholder="Blablabla" 
                                    id="mensagem" 
                                    name="mensagem" 
                                    onChange={escreveu}
                                    value={usuario.mensagem}
                                    required
                                    />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe a mensagem!!!!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} offset={5} className="d-flex justify-content-end">
                        <Button type="submit" variant={"primary"}>{"Cadastrar"}</Button>
                    </Col>
                    <Col md={6} offset={5}>
                        <Button type="button" variant={"secondary"} as={Link} to="/">Voltar</Button>
                    </Col>
                </Row>
            </Form>
        }
        </Container>
    )
}