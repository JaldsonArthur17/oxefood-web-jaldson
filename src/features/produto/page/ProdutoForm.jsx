import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import BackButton from "../../../shared/components/BackButton";
import Breadcrumbs from "../../../shared/components/Breadcrumbs";
import Footer from "../../../shared/components/Footer";
import Menu from "../../../shared/components/Menu";
import SaveButton from "../../../shared/components/SaveButton";
import { atualizarPorId, buscarPorId, cadastrar } from "../../../shared/services/crudService";
import { MAPPING_CONTROLLER_PRODUTO } from "../service/produtoService";
export default function ProdutoForm() {

    const { idProduto } = useParams();
    const [produto, setProduto] = useState({
        codigo: "",
        titulo: "",
        descricao: "",
        valorUnitario: 0,
        tempoEntregaMinimo: 0,
        tempoEntregaMaximo: 0
    });

    useEffect(() => {
    if (idProduto) {
        carregarProduto();
    }
}, [idProduto]);

async function carregarProduto() {
    try {
        const data = await buscarPorId(MAPPING_CONTROLLER_PRODUTO, idProduto);
        setProduto({
            codigo: data.codigo ?? "",
            titulo: data.titulo ?? "",
            descricao: data.descricao ?? "",
            valorUnitario: data.valorUnitario ?? 0,
            tempoEntregaMinimo: data.tempoEntregaMinimo ?? 0,
            tempoEntregaMaximo: data.tempoEntregaMaximo ?? 0
        });
    } catch (erro) {
        toast.error("Erro ao carregar produto.");
    }
}

    async function salvar() {
    try {
        if (idProduto) {
            await atualizarPorId(MAPPING_CONTROLLER_PRODUTO, idProduto, produto);
            toast.success("Produto alterado com sucesso!");
        } else {
            await cadastrar(MAPPING_CONTROLLER_PRODUTO, produto);
            toast.success("Produto cadastrado com sucesso!");
        }
    } catch (erro) {
        toast.error("Erro ao salvar produto.");
    }
}

    return (

        <div>
            <Menu />

            {idProduto ?
    <Breadcrumbs items={[{ label: "Produto" }, { label: "Alterar" }]} />
    :
    <Breadcrumbs items={[{ label: "Produto" }, { label: "Cadastrar" }]} />
}
            <div style={{ marginTop: '40px', marginLeft: '10%', marginRight: '10%' }}>

                <div className="overflow-x-auto shadow-sm">

                    <div className="flex items-center justify-between mb-6" style={{ marginTop: '20px', marginLeft: '10px', marginRight: '10px' }}>

                        <h1 className="text-3xl font-bold text-gray-800">
                            {idProduto ? "Alterar Produto" : "Novo Produto"}
                        </h1>

                    </div>

                    <div className="divider divider-info" />

                    <div className="overflow-x-auto" style={{ padding: '30px' }}>
                        <form>

                            <div className="flex w-full" >
                                <div className="card rounded-box grid grow p-8" style={{ padding: '30px' }}>

                                        <fieldset className="fieldset w-full">
                                        <label className="fieldset-legend" htmlFor="codigo">Código</label>
                                        <input
                                            type="text"
                                            id="codigo"
                                            className="input input-bordered w-full"
                                            value={produto.codigo}
                                            onChange={(e) =>
                                                setProduto({ ...produto, codigo: e.target.value })
                                            }
                                        />
                                    </fieldset>

                                </div>
                                <div className="card rounded-box grid grow p-8" style={{ padding: '30px' }}>
                                            <fieldset className="fieldset w-full">
                                        <label className="fieldset-legend" htmlFor="titulo">Título</label>
                                        <input
                                            type="text"
                                            id="titulo"
                                            className="input input-bordered w-full"
                                            value={produto.titulo}
                                            onChange={(e) =>
                                                setProduto({ ...produto, titulo: e.target.value })
                                            }
                                        />
                                    </fieldset>

                                </div>

                            </div>

                            <div className="flex w-full" >
                                <div className="card rounded-box grid grow p-8" style={{ padding: '30px' }}>

                                              <fieldset className="fieldset w-full">
                                        <label className="fieldset-legend" htmlFor="descricao">Descrição</label>
                                        <textarea
                                            id="descricao"
                                            className="textarea textarea-bordered w-full"
                                            rows={4}
                                            value={produto.descricao}
                                            onChange={(e) =>
                                                setProduto({ ...produto, descricao: e.target.value })
                                            }
                                        />
                                    </fieldset>

                                </div>
                                <div className="card rounded-box grid grow p-8" style={{ padding: '30px' }}>

                                         <fieldset className="fieldset w-full">
                                        <label className="fieldset-legend" htmlFor="valorUnitario">Valor Unitário</label>
                                        <input
                                            type="number"
                                            id="valorUnitario"
                                            min="0"
                                            step="1"
                                            className="input input-bordered w-full"
                                            value={produto.valorUnitario}
                                            onChange={(e) =>
                                                setProduto({ ...produto, valorUnitario: Number(e.target.value) })
                                            }
                                        />
                                    </fieldset>

                                </div>
                                <div className="card rounded-box grid grow p-8" style={{ padding: '30px' }}>

                                     <fieldset className="fieldset w-full">
                                        <label className="fieldset-legend" htmlFor="tempoEntregaMinimo">Tempo de Entrega Mínimo</label>
                                        <input
                                            type="number"
                                            id="tempoEntregaMinimo"
                                            min="0"
                                            step="1"
                                            className="input input-bordered w-full"
                                            value={produto.tempoEntregaMinimo}
                                            onChange={(e) =>
                                                setProduto({ ...produto, tempoEntregaMinimo: Number(e.target.value) })
                                            }
                                        />
                                    </fieldset>

                                </div>
                            </div>
  
                            <div className="flex w-full" >
                                <div className="card rounded-box grid grow p-8" style={{ padding: '30px' }}>

                                    <div style={{ marginTop: '50px', textAlign: 'left' }}>
                                        <BackButton destino="/produto" />
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