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
        <meta charset="UTF-8"/>
    </head>
    <body>
        <h1>Mapa Virtual Indice</h1>
        <dl>
            <dt>
"""
li={}
nomes={}
distritos={}
for c in cidades:
    d = c['distrito']
    if d not in distritos:
        distritos[d]=[]
    distritos[d].append((c['nome'], c['id']))

sorted_keys= sorted(distritos.keys())
sorteddis={key:distritos[key] for key in sorted_keys}
for distrito in sorteddis.keys():
    pagHTML+=f"""<h3>{distrito}</h3>
    </dt>"""
    for cidade , id in sorteddis[distrito]:
        pagHTML += f"<dd><a href='/{id}'>{cidade}</a></dd>"

pagHTML+="""</dl>
    </body>
</html>
"""

file=open("index.html","w")
file.write(pagHTML)
file.close()