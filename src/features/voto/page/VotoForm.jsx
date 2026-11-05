import { useEffect, useState } from "react";
import { IMaskInput } from 'react-imask';
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import BackButton from "../../../shared/components/BackButton";
import Breadcrumbs from "../../../shared/components/Breadcrumbs";
import Footer from "../../../shared/components/Footer";
import Menu from "../../../shared/components/Menu";
import SaveButton from "../../../shared/components/SaveButton";
import { atualizar, buscarPorId, cadastrar } from "../../../shared/services/crudService";
import { MAPPING_CONTROLLER_VOTO } from "../service/votoService";
export default function VotoForm() {
    const { idVoto } = useParams();
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

        if (idVoto) {
            carregarVoto();
        }

    }, [idVoto]);

    async function carregarVoto() {

        try {

            const data = await buscarPorId(
                MAPPING_CONTROLLER_VOTO,
                idVoto
            );

            setVoto({
                nomeEleitor: data.nomeEleitor ?? "",
                numeroRegistroEleitoral: data.numeroRegistroEleitoral ?? "",
                numeroCandidatoDepFederal: data.numeroCandidatoDepFederal ?? "",
                numeroCandidatoDepEstadual: data.numeroCandidatoDepEstadual ?? "",
                numeroCandidatoSenador: data.numeroCandidatoSenador ?? "",
                numeroCandidatoGovernador: data.numeroCandidatoGovernador ?? "",
                numeroCandidatoPresidente: data.numeroCandidatoPresidente ?? "",
            });

        } catch (erro) {
            toast.error("Erro ao carregar voto.");
        }
    }


    async function salvar() {

            try {

           if (idVoto) {

               await atualizar(MAPPING_CONTROLLER_VOTO, voto);
               toast.success("Voto alterado com sucesso!");

           } else {

               await cadastrar(MAPPING_CONTROLLER_VOTO, voto);
               toast.success("Voto cadastrado com sucesso!");
           }

        } catch (erro) {
            toast.error("Erro ao salvar Voto.");
        }
    }

    return (

        <div>
            <Menu />

            {idVoto ?
                <Breadcrumbs items={[
                    { label: "Voto" },
                    { label: "Alterar" }
                ]} />
                :
                <Breadcrumbs items={[
                    { label: "Voto" },
                    { label: "Cadastrar" }
                ]} />
            }

            <div style={{ marginTop: '40px', marginLeft: '10%', marginRight: '10%' }}>

                <div className="overflow-x-auto shadow-sm">

                    <div className="flex items-center justify-between mb-6" style={{ marginTop: '20px', marginLeft: '10px', marginRight: '10px' }}>

                        <h1 className="text-3xl font-bold text-gray-800">
                            {idVoto ? "Alterar Voto" : "Novo Voto"}
                        </h1>

                    </div>

                    <div className="divider divider-info" />

                    <div className="overflow-x-auto" style={{ padding: '30px' }}>
                        <form>

                            <div className="flex w-full" >
                                <div className="card rounded-box grid grow p-8" style={{ padding: '30px' }}>

                                    <fieldset className="fieldset w-full">
                                        <label className="fieldset-legend" htmlFor="nomeEleitor">Nome do Eleitor</label>
                                        <input
                                            type="text"
                                            id="nome"
                                            className="input input-bordered w-full"
                                            value={voto.nomeEleitor}
                                            onChange={(e) =>
                                                setVoto({ ...voto, nomeEleitor: e.target.value })
                                            }
                                        />
                                    </fieldset>

                                </div>
                                <div className="card rounded-box grid grow p-8" style={{ padding: '30px' }}>

                                    <fieldset className="fieldset w-full">
                                        <label className="fieldset-legend" htmlFor="numeroRegistroEleitoral">Numero de Registro Eleitoral</label>
                                        <IMaskInput
                                            mask="0000.0000.0000"
                                            value={voto.numeroRegistroEleitoral}
                                            onAccept={(value) =>
                                                setVoto({ ...voto, numeroRegistroEleitoral: value })
                                            }
                                            className="input input-bordered w-full"
                                            id="cpf"
                                        />
                                    </fieldset>

                                </div>
                            </div>

                            <div className="flex w-full" >
                                <div className="card rounded-box grid grow p-8" style={{ padding: '30px' }}>

                                    <fieldset className="fieldset w-full">
                                        <label className="fieldset-legend" htmlFor="numeroCandidatoDepFederal">Numero do Candidato a Deputado Federal</label>
                                        <IMaskInput
                                            mask="00000"
                                            value={voto.numeroCandidatoDepFederal}
                                            onAccept={(value) =>
                                                setVoto({ ...voto, numeroCandidatoDepFederal: value })
                                            }
                                            className="input input-bordered w-full"
                                            id="numeroCandidatoDepFederal"
                                        />
                                    </fieldset>

                                </div>
                                <div className="card rounded-box grid grow p-8" style={{ padding: '30px' }}>

                                    <fieldset className="fieldset w-full">
                                        <label className="fieldset-legend" htmlFor="numeroCandidatoDepEstadual">Numero do Candidato a Deputado Estadual</label>
                                        <IMaskInput
                                            mask="0000"
                                            value={voto.numeroCandidatoDepEstadual}
                                            onAccept={(value) =>
                                                setVoto({ ...voto, numeroCandidatoDepEstadual: value })
                                            }
                                            className="input input-bordered w-full"
                                            id="numeroCandidatoDepEstadual"
                                        />
                                    </fieldset>

                                </div>
                                <div className="card rounded-box grid grow p-8" style={{ padding: '30px' }}>

                                    <fieldset className="fieldset w-full">
                                        <label className="fieldset-legend" htmlFor="numeroCandidatoSenador">Numero do Candidato a Senador</label>
                                        <IMaskInput
                                            mask="000"
                                            value={voto.numeroCandidatoSenador}
                                            onAccept={(value) =>
                                                setVoto({ ...voto, numeroCandidatoSenador: value })
                                            }
                                            className="input input-bordered w-full"
                                            id="numeroCandidatoSenador"
                                        />
                                    </fieldset>

                                </div>

                                </div>
                                <div className="card rounded-box grid grow p-8" style={{ padding: '30px' }}>

                                    <fieldset className="fieldset w-full">
                                        <label className="fieldset-legend" htmlFor="numeroCandidatoGovernador">Numero do Candidato a Governador</label>
                                        <IMaskInput
                                            mask="00"
                                            value={voto.numeroCandidatoGovernador}
                                            onAccept={(value) =>
                                                setVoto({ ...voto, numeroCandidatoGovernador: value })
                                            }
                                            className="input input-bordered w-full"
                                            id="numeroCandidatoGovernador"
                                        />
                                    </fieldset>


                                </div>
                                <div className="card rounded-box grid grow p-8" style={{ padding: '30px' }}>

                                    <fieldset className="fieldset w-full">
                                        <label className="fieldset-legend" htmlFor="numeroCandidatoPresidente">Numero do Candidato a Presidente</label>
                                        <IMaskInput
                                            mask="00"
                                            value={voto.numeroCandidatoPresidente}
                                            onAccept={(value) =>
                                                setVoto({ ...voto, numeroCandidatoPresidente: value })
                                            }
                                            className="input input-bordered w-full"
                                            id="numeroCandidatoPresidente"
                                        />
                                    </fieldset>

                            </div>
                            <div className="flex w-full" >
                                <div className="card rounded-box grid grow p-8" style={{ padding: '30px' }}>

                                    <div style={{ marginTop: '50px', textAlign: 'left' }}>
                                        <BackButton destino="/voto" />
                                    </div>

                                </div>
                                <div className="card rounded-box grid grow p-8" style={{ padding: '30px' }}>

                                    <div style={{ marginTop: '50px', textAlign: 'right' }}>
                                        <SaveButton save={() => salvar()} />
                                    </div>

                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>

            <Footer />

        </div>

    );
}