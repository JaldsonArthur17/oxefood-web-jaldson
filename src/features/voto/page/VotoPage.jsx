import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Breadcrumbs from "../../../shared/components/Breadcrumbs";
import CrudActions from "../../../shared/components/CrudActions";
import Footer from "../../../shared/components/Footer";
import Menu from "../../../shared/components/Menu";
import NewButton from "../../../shared/components/NewButton";
import { buscarPorId, listar, remover } from "../../../shared/services/crudService";
import { formatarData } from "../../../shared/util/dateUtils";
import { MAPPING_CONTROLLER_VOTO } from "../service/votoService";

export default function VotoPage() {

   const [lista, setLista] = useState([]);
   const navigate = useNavigate();
   const [voto, setVoto] = useState({
        nomeEleitor: "",
        numeroRegistroEleitoral: "",
        numeroCandidatoDepFederal: "",
        numeroCandidatoDepEstadual: "",
        numeroCandidatoSenador: "",
        numeroCandidatoGovernador: "",
        numeroCandidatoPresidente: "",
    });


   useEffect(() => {
       carregar();
   }, []);

   async function carregar() {
       const data = await listar(MAPPING_CONTROLLER_VOTO);
       setLista(data);
   }

   function editar(id) {
        navigate(`/voto-form/${id}`);

   }

   async function confirmarRemover(id) {
       if (confirm("Deseja realmente excluir este voto?")) {
           console.log(id);
       }
           try {

        await remover(MAPPING_CONTROLLER_VOTO, id);
        await carregar();
        toast.success("Voto removido com sucesso!");

    } catch (erro) {

        console.error(erro);
        toast.error("Erro ao tentar remover o voto.");
    }

   }


   async function detalhar(id) {

    try {
    
        const data = await buscarPorId(
            MAPPING_CONTROLLER_VOTO, 
            id
        );

        setVoto({
            nomeELeitor: data.nomeELeitor ?? "",
                numeroRegistroEleitoral: data.numeroRegistroEleitoral ?? "",
                numeroCandidatoDepFederal: data.numeroCandidatoDepFederal ?? "",
                numeroCandidatoDepEstadual: data.numeroCandidatoDepEstadual ?? "",
                numeroCandidatoSenador: data.numeroCandidatoSenador ?? "",
                numeroCandidatoGovernador: data.numeroCandidatoGovernador ?? "",
                numeroCandidatoPresidente: data.numeroCandidatoPresidente ?? "",
        });

        document.getElementById('modal-detalhar').showModal()

    } catch (erro) {
        toast.error("Erro ao carregar voto.");
    }
}


   return (
       <div>
           <Menu />
           <Breadcrumbs items={[
               { label: "Voto" },
               { label: "Listar" }
           ]} />

           <div style={{ marginTop: '40px', marginLeft: '10%', marginRight: '10%' }}>
            <div className="overflow-x-auto shadow-sm">
                   <div className="flex items-center justify-between mb-6" style={{marginTop: '20px', marginLeft: '10px', marginRight: '10px'}}>
                       <h1 className="text-3xl font-bold text-gray-800">
                           Votos
                       </h1>
                       <NewButton destino="/voto-form" />
                   </div>
                   <div className="divider divider-info" />
                   <div className="overflow-x-auto" style={{marginTop: '30px'}}>
                       <table className="table table-zebra">
                           <thead>
                               <tr style={{textAlign: 'center'}}>
                                   <th>Nome do Eleitor</th>
                                   <th>Numero de Registro Eleitoral </th>
                                   <th>Numero de Candidato a Deputado Federal</th>
                                   <th>Numero de Candidato a Deputado Estadual</th>
                                   <th>Numero de Candidato a Senador</th>
                                    <th>Numero de Candidato a Governador</th>
                                    <th>Numero de Candidato a Presidente</th>
                                   <th>Ações</th>
                               </tr>
                           </thead>
                           <tbody>
                               {lista.map(voto => (
                                   <tr key={voto.id}>
                                       <td style={{width: '50%'}}>{voto.nomeEleitor}</td>
                                       <td style={{textAlign: 'center'}}>{voto.numeroRegistroEleitoral}</td>
                                       <td style={{textAlign: 'center'}}>{formatarData(voto.numeroCandidatoDepFederal)}</td>
                                       <td style={{textAlign: 'center'}}>{formatarData(voto.numeroCandidatoDepEstadual)}</td>
                                       <td style={{textAlign: 'center'}}>{formatarData(voto.numeroCandidatoSenador)}</td>
                                       <td style={{textAlign: 'center'}}>{formatarData(voto.numeroCandidatoGovernador)}</td>
                                       <td style={{textAlign: 'center'}}>{formatarData(voto.numeroCandidatoPresidente)}</td>

                                       <td style={{textAlign: 'center'}}>
                                           <CrudActions
                                               onDetail={() => detalhar(voto.id)}
                                               onEdit={() => editar(voto.id)}
                                               onDelete={() => confirmarRemover(voto.id)}
                                           />
                                       </td>
                                   </tr>
                               ))}
                           </tbody>
                       </table>
                   </div>
               </div>
           </div>
                       <dialog id="modal-detalhar" className="modal">
                <div className="modal-box">   
                    <h3 className="font-bold text-lg">Dados do Eleitor</h3>
                    <div className="divider" />
                    <p className="py-4"> 
                        <strong>Nome do Eleitor:</strong> {voto.nomeEleitor}
                    </p>
                    <p className="py-4">
                        <strong>Numero de Registro Eleitoral:</strong> {voto.numeroRegistroEleitoral}
                    </p>
                    <p className="py-4">
                        <strong>Numero de Candidato a Deputado Federal:</strong> {voto.numeroCandidatoDepFederal}
                    </p>
                    <p className="py-4">
                        <strong>Numero de Candidato a Deputado Estaual:</strong> {voto.numeroCandidatoDepEstadual}
                    </p>
                    <p className="py-4">
                        <strong>Numero de Candidato a Senador </strong> {voto.numeroCandidatoSenador}
                    </p>
                    <p className="py-4">
                        <strong>Numero de Candidato a Governador </strong> {voto.numeroCandidatoGovernador}
                    </p>
                    <p className="py-4">
                        <strong>Numero de Candidato a Presidente </strong> {voto.numeroCandidatoPresidente}
                    </p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Fechar</button>
                        </form>
                    </div>
                </div>
            </dialog>
           <Footer />
       </div>
   );
}