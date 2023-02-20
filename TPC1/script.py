import os

folder_path_Verona = 'img/Verona'
folder_path_Veneza = 'img/Veneza'
folder_path_Bolonha = 'img/Bolonha'
folder_path_Florenca = 'img/Florenca'
folder_path_Milao = 'img/Milao'


files_Verona = os.listdir(folder_path_Verona)
files_Veneza = os.listdir(folder_path_Veneza)
files_Bolonha = os.listdir(folder_path_Bolonha)
files_Florenca = os.listdir(folder_path_Florenca)
files_Milao = os.listdir(folder_path_Milao)

pagHTML="""
<!DOCTYPE html>
<html>
    <head>
        <title>Viagem a Itália</title>
        <meta charset="utf-8"/>
        <link rel="stylesheet" href="tpc1.css"/>
    </head>
    <body>
        <div id="menu" class="titulo">
            <h1 class="titulo"><img width=30px height=20px src="https://upload.wikimedia.org/wikipedia/en/0/03/Flag_of_Italy.svg"/>  Viagem a Itália</h1>
        </div>
        <div class="image-topleft image-container">
            <img width=280px height=210px src="img/Verona.jpg"/>
            <div class="overlay"><a href="#Verona" style="text-decoration: none;"><p>Verona</p></a></div>
        </div>
        <div class="image-topright image-container">
            <img width=280px height=210px src="img/Veneza.jpg"/>
            <div class="overlay"><a href="#Veneza" style="text-decoration: none;"><p>Veneza</p></a></div>
        </div>
        <div class="image-botleft image-container">
            <img width=280px height=210px src="img/Bolonha.jpg"/>
            <div class="overlay"><a href="#Bolonha" style="text-decoration: none;"><p>Bolonha</p></a></div>
        </div>
        <div class="image-botmid image-container">
            <img width=210px height=280px src="img/Florenca.jpg"/>
            <div class="overlay"><a href="#Florenca" style="text-decoration: none;"><p>Florença</p></a></div>
        </div>
        <div class="image-botright image-container">
            <img width=280px height=210px src="img/Milao.jpg"/>
            <div class="overlay"><a href="#Milao" style="text-decoration: none;"><p>Milão</p></a></div>
        </div>
        <div class="button">
            <a href="#menu" style="text-decoration: none; color: white;">
                Voltar ao Topo
            </a>
        </div>
        <div class="places">
            <div class="veronacontainer">
                <h2 id="Verona" class="verona">Verona</h2>  
"""
for file in files_Verona:
    pagHTML+=f"""
    <div class="pics">
        <img src="img/Verona/{file}"/>
    </div>
    """
pagHTML+="""
</div>
    <div class="venezacontainer">
        <h2 id="Veneza" class="veneza">Veneza</h2>
"""
for file in files_Veneza:
    pagHTML+=f"""
    <div class="pics">
        <img src="img/Veneza/{file}"/>
    </div>
    """
pagHTML+="""
</div>
    <div class="bolonhacontainer">
        <h2 id="Bolonha" class="bolonha">Bolonha</h2>
"""

for file in files_Bolonha:
    pagHTML+=f"""
    <div class="pics">
        <img src="img/Bolonha/{file}"/>
    </div>
    """
pagHTML+="""
</div>
    <div class="florencacontainer">
        <h2 id="Florenca" class="florenca">Florença</h2>
"""
for file in files_Florenca:
    pagHTML+=f"""
    <div class="pics">
        <img src="img/Florenca/{file}"/>
    </div>
    """

pagHTML+="""
</div>
    <div class="milaocontainer">
        <h2 id="Milao" class="milao">Milão</h2>
"""

for file in files_Milao:
    pagHTML+=f"""
    <div class="pics">
        <img src="img/Milao/{file}"/>
    </div>
    """

pagHTML+="""
</div>
        </div>
    </body>
</html>
"""
print(pagHTML)