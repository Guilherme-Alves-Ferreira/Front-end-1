import React from 'react'

//BrowserRouter -> Dá acesso ao uso das rotas (deixa usar as bibliotecas)
//Switch -> Responsável pela navegação entre as rotas
//Route -> Para criar a rota
import{BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Pet from './Pet'
import Match from './Match'
import Error from './Error'
import Home from './Home'
import Perfil from './Perfil'
import Adm from './Adm'


function Routes(){
    return(
        <Router>
            <Switch>
                <Route exact path="/pet/:idadeFiltro/:nomeFiltro/:especieFiltro/:racaFiltro/:porteFiltro/:sexoFiltro/:castradoFiltro/:sociavelFiltro/:comportamentoFiltro" component={Pet}/>
                <Route exact path="/match" component={Match}/>
                <Route exact path="/perfil/:id" component={Perfil}/>
                <Route exact path="/" component={Home}/>
                <Route exact path="/adm" component={Adm}/>
                <Route exact path="*" component={Error}/>
            </Switch>
        </Router>
    );
}
export default Routes;