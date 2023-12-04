import Cabecalho from "./Cabecalho";
import Rodape from "./Rodape";
import Menu from "./Menu";

export default function Pagina(props) {
    return (
        <>
            <Cabecalho conteudo="Bate Papo" />
            <Menu />
            <div>
                {}
                {props.children} 
            </div>
            <Rodape conteudo="Em desenvolvimento"/>
        </>
    )
}

