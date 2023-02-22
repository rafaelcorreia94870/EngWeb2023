import json

def ordCidade(cidade):
    return cidade['nome']
    
f = open("mapa.json")
mapa = json.load(f)
cidades = mapa['cidades']
ligacoes=mapa['ligações']
cidades.sort(key=ordCidade)
li={}
nomes={}
for c in cidades:
    nomes[c['id']]= c['nome']
for l in ligacoes:
    if l["origem"] not in li: li[l["origem"]]=[]
    li[l['origem']].append((l['destino'],nomes[l['destino']], l['distância']))

for c in cidades:
    pagHTML="""
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
        </head>
    """
    pagHTML+=f"""
    <body><h1>{c['nome']}</h1>
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
            pagHTML +=f"""<li><a href='/{id}'>{item}</a>: {dist}Km</li>"""
        pagHTML+=f"""
                        </ul>
                        </dd>
                        </dl>
                        </body>
                        </html>
                        """
    file=open(f"{c['id']}.html","w")
    file.write(pagHTML)
    file.close()
