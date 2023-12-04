import { useState } from "react";
import { Button, Container, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import { Link } from "react-router-dom";
import Pagina from "../templates/Pagina";
import { useSelector,useDispatch} from 'react-redux';
import { getUsuarios,cadastrarUsuario } from "../redux/usuarioReducer";
import Estado from "../Estados/estado";
export default function CadastroUsuario(props) {
    const usuarioIni = {
        nickname:"",
        urlAvatar:"",
    }
    const [usuario, setusuario] = useState(usuarioIni);
    const [formValidado, setFormValidado] = useState(false);
    const { estado, mensagem, usuarios } = useSelector((state) => state.usuario);
    const dispatch = useDispatch();
    function escreveu(e){
        const componente = e.currentTarget;
        setusuario({...usuario,[componente.name]:componente.value});
    }

    function manipularSubmissao(e){
        const form = e.currentTarget; 
        if (form.checkValidity()){
            dispatch(cadastrarUsuario(usuario));
            
            setusuario(usuarioIni);
            setFormValidado(false);
        }
        else{
            setFormValidado(true);
        }

        e.stopPropagation();
        e.preventDefault();
    }

    return (
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
                                label="Foto Perfil:"
                                className="mb-3"
                            >
                                <Form.Control 
                                    type="text" 
                                    placeholder="https://www.google.com/url?" 
                                    id="urlAvatar" 
                                    name="urlAvatar" 
                                    onChange={escreveu}
                                    value={usuario.urlAvatar}
                                    required
                                    />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe sua foto de perfil!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} offset={5} className="d-flex justify-content-end">
                        <Button type="submit" variant={"primary"}>{props.modoEdicao ? "Alterar":"Cadastrar"}</Button>
                    </Col>
                    <Col md={6} offset={5}>
                        <Button type="button" variant={"secondary"} as={Link} to="/">Voltar</Button>
                    </Col>
                </Row>
            </Form>
        }
        </Container>
    );
}