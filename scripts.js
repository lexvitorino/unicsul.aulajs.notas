var rgms = [];
var nomes = [];
var notas_p = [];
var notas_exer = [];
var notas_proj = [];
var notas_reg = [];

function cadastrar() {
    var nom = document.f_cad.f_nom.value;
    var rgm = document.f_cad.f_rgm.value;
    var par = parseFloat(document.f_cad.f_par.value);
    var exe = parseFloat(document.f_cad.f_exe.value);
    var proj = parseFloat(document.f_cad.f_proj.value);
    var reg = parseFloat(document.f_cad.f_reg.value);

    if (!nom) {
        alert("Nome obrigatório!");
        return;
    } else if (!rgm) {
        alert("RGM obrigatório!");
        return;
    } else if (par > 2 || isNaN(par)) {
        alert("Nota parcial obrigatório e não pode ser maior que 2 pontos!");
        return;
    } else if (exe > 1 || isNaN(exe)) {
        alert("Nota exercício obrigatório e não pode ser maior que 1 ponto!");
        return;
    } else if (proj > 2 || isNaN(proj)) {
        alert("Nota projeto obrigatório e não pode ser maior que 2 pontos!");
        return;
    } else if (reg > 5 || isNaN(reg)) {
        alert("Nota regimental obrigatório e não pode ser maior que 5 pontos!");
        return;
    }

    nomes.push(nom);
    rgms.push(rgm);
    notas_p.push(par);
    notas_exer.push(exe);
    notas_proj.push(proj);
    notas_reg.push(reg);

    alert("Notas cadastrada com sucesso");

    document.getElementById("f_cadastro").reset();
}

function exibirDados() {

    function calcula(npar, nexe, npro, nreg) {
        return npar + nexe + npro + nreg;
    }

    function conceito(nfinal) {
        if (nfinal < 3) {
            return "Reprovado";
        } else if (nfinal < 5.75) {
            return "Avaliação Final";
        } else {
            return "Aprovado";
        }
    }

    function conceitoColor(conceito) {
        switch (conceito) {
            case "Reprovado":
                return "danger";
            case "Avaliação Final":
                return "warning";
            default:
                return "info";
        }
    }

    var content = document.getElementById("tabela");
    var quantidade = rgms.length;
    
    var itens = "";
    for (let i = 0; i < quantidade; i++) {
        var nfinal = calcula(notas_p[i], notas_exer[i], notas_proj[i], notas_reg[i]);
        var resultado = conceito(nfinal);
        var aux = `
            <tr>
				<td>${nomes[i]}</td>
				<td>${rgms[i]}</td>
				<td>${notas_p[i]}</td>
				<td>${notas_exer[i]}</td>
				<td>${notas_proj[i]}</td>
				<td>${notas_reg[i]}</td>
				<td>${nfinal}</td>
                <td class="${conceitoColor(resultado)}">${resultado}</td>
			</tr>
        `            
        itens += aux;
    }

    var table = `
        <table>
            <tr>
                <th>Nome</th>
                <th>RGM</th>
                <th>Nota parcial</th>
                <th>Nota exercícios</th>
                <th>Nota projeto</th>
                <th>Nota regimental</th>
                <th>Nota Final</th>
                <th>Resultado</th>
            </tr>
            ${itens}
        </table>
    `;

    content.innerHTML = table;
}