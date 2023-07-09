import mongoose, {Model, Document} from 'mongoose';

interface ExemploDocument extends Document {
    campo1: string;
    campo2: number;
}

interface Livro extends Document {
    nome:       string;
    ISBN:       number;
    autor:      string;
    /* adicionar demais atributos */
}

interface Usuario extends Document {
    nome:       string;
    email:      string;
    password:   string;
    /* adicionar demais atributos */
}

const ExemploModel: Model<ExemploDocument> = mongoose.model<ExemploDocument>('Livros', new mongoose.Schema({
    campo1: { type: String },
    campo2: { type: Number }
}));

class Database {
    private MONGODB_URI: string;
    private LivroModel: Model<Livro>;
    private UsuarioModel: Model<Usuario>;

    public constructor() {
        this.MONGODB_URI = 'mongodb://localhost:27017/alexandria-db';

        this.LivroModel = mongoose.model<Livro>("livro", new mongoose.Schema({
            nome: {type: String},
            ISBN: {type: Number},
            autor: {type: String},
        }));

        this.UsuarioModel = mongoose.model<Usuario>("usuarios", new mongoose.Schema({
            nome: {type: String},
            email: {type: String},
            password: {type: String},
        }));
    
        this.mongooseConnect();
    }

    private mongooseConnect ():void {
        mongoose.connect(this.MONGODB_URI)
            .then(() => {
                console.log('Conexão estabelecida com o MongoDB');
            })
            .catch((error) => {
                console.error('Erro ao conectar ao MongoDB:', error);
            });
    }

    private mongooseDisconnect ():void {
        mongoose.disconnect()
            .then(() => {
                console.log('Conexão com o MongoDB fechada');
            })
            .catch((error) => {
                console.error('Erro ao fechar conexão com o MongoDB:', error);
            });
    }

    /**
     * Função de inserção do Livro no banco de dados
     * @param nome      Nome do Livro
     * @param ISBN      Número do ISBN do Livro
     * @param autor     Autor do Livro
     * @returns         Bufer contendo o livro
     */
    public async inserirLivro(nome: string, ISBN: number, autor: string): Promise<Livro> {
        try {
            const livro = new this.LivroModel({ nome, ISBN, autor });
            const livroSalvo = await livro.save();
            console.log('Livro inserido com sucesso:', livroSalvo);
            return livroSalvo;
        } 
        
        catch (error) {
            console.error('Erro ao inserir Livro:', error);
            throw error;
        }
    }

    public async buscarPorNome() {
        try {
          const campo1 = "Francisco";
          const campo2 = 23
          const dado = await ExemploModel.find({ campo1,campo2 });
      
          if (dado) {
            console.log('Dado encontrado:', dado);
            return dado;
          } else {
            console.log('Dado não encontrado');
            return null;
          }
        } catch (error) {
          console.error('Erro ao buscar dado:', error);
          throw error;
        } finally {
          // Fechar a conexão ao final da busca
          await mongoose.disconnect();
          console.log('Conexão com o MongoDB fechada');
        }
      }
    
}

export default new Database();