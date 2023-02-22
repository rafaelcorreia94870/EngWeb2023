import json

def ordCidade(cidade):
    return cidade['nome']
    
f = open("mapa.json")
mapa = json.load(f)
cidades = mapa['cidades']
ligacoes=mapa['ligações']
cidades.sort(key=ordCidade)
pagHTML="""
<!DOCTYPE html>
<html>
    <head>
        <title>Mapa Virtual</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <h1>Mapa Virtual</h1>
        <table>
            <tr>
                <!-- Coluna do Índice -->
                <td width="30%" valign="top">
                <a name = 'indice'></a>
                    <h3>Índice</h3>
                    <ol>
"""
li={}
nomes={}
for c in cidades:
    nomes[c['id']]= c['nome']
    pagHTML += f"<li><a href='#{c['id']}'>{c['nome']}</a></li>"

for l in ligacoes:
    if l["origem"] not in li: li[l["origem"]]=[]
    li[l['origem']].append((l['destino'],nomes[l['destino']], l['distância']))

pagHTML+="""
</ol>
                </td>
                <!-- Coluna do Conteúdo -->
                <td width="70%">
                """
for c in cidades:
    pagHTML+=f"""                  <a name='{c['id']}'/>
                    <h3>{c['nome']}</h3>
                    <p><b>Distrito: </b>{c['distrito']}</p>
                    <p><b>População: </b>{c['população']}</p>
                    <p><b>Descrição: </b> {c['descrição']}</p>
                    """
    if c['id'] in li:
        pagHTML+=f""" 
                        <dl><dt><p><b>Ligações: </b></p></dt>
                        <dd>
                        <ul>
                        """
        for (id,item,dist) in li[c['id']]:
            pagHTML +=f"""<li><a href="#{id}">{item}</a>: {dist}Km</li>"""
        pagHTML+=f"""
                        </ul>
                        </dd>
                        </dl>
                        """
        

    pagHTML+=f"""
                    <adress>[<a href="#indice"> Voltar ao Índice</a>]</adress>
                    <center>
                        <hr width="80%"/>
                    </center>"""
pagHTML+=""" </td>
            </tr>
        </table>
    </body>
</html>
"""
print(pagHTML)