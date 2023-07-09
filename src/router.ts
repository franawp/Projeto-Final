import { Router, Response, Request } from 'express';
import Database from './database/database';

class Routes {
    private router: Router;

    private constructor () {
        this.router = Router();
        this.inicializarRotas();
    }

    /**
     * Construtor alternativo para evitar herança
     * @returns Instância da classe Routes
     */
    public static create (): Routes {
        return new Routes();
    }

    /**
     * Funcao para retornar o objeto router
     * @returns objeto router
     */
    public getRouter (): Router {
        return this.router;
    }

    /**
     * Método para iniciar as rotas do site
     */
    private inicializarRotas ():void {
        this.router.get("/", this.rootPage);
        this.router.post("/login/:signin", this.signIn);
        this.router.post("/login/:signup", this.signUp);
        this.router.get("/home", this.home);
        this.router.get("/minha-biblioteca", this.minhaBiblioteca);
        this.router.get("/home/download", this.enviarArquivo);
    }

    /**
     * Método para enviar o arquivo PDF ao usuário
     * @param req Requisição
     * @param res Resposta
     */
    private enviarArquivo (req: Request, res: Response):void {
        /*const identificador: number = 10;

        const arquivoPDF = exportarArquivo(identificador);

        if (arquivoPDF == null) {
            res.status(404).send("Arquivo não encontrado!");
        }
        */
        res.send("Fazendo download do Livro");
    }

    /**
     * Método para a rota padrão "/"
     * @param req 
     * @param res 
     */
    private rootPage (req:Request, res:Response) {
        const data = Database;
        //data.insertExemplo();
        //data.buscarPorNome();
        res.send("Seja Welcomido ao site");
    }

    /**
     * Rota para verificar no banco de dados os dados do usuário
     * @param req 
     * @param res 
     */
    private signIn (req:Request, res:Response) {
        console.log("logueeeei", req.body);
        res.send("Login realizado com sucesso!");
    }

    /**
     * Rota para inserir no banco de dados, os dados do usuário
     * @param req 
     * @param res 
     */
    private signUp (req:Request, res:Response) {
        res.send("Cadastro realizado com sucesso");
    }

    /**
     * Rota para exibir a tela inicial do site
     * @param req 
     * @param res 
     */
    private home (req:Request, res:Response) {
        res.send("Seja Welcomido ao site");
    }

    /**
     * Rota para exibir os livros do usuário
     * @param req 
     * @param res 
     */
    private minhaBiblioteca (req:Request, res:Response) {
        res.send("Aqui está seus livros");
    }
}

const routers = Routes.create().getRouter();

export {routers};