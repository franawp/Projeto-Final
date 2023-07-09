import mongoose , { Document, Model } from "mongoose"

/**
 * Interface contendo os atributos de um usuário
 * 
 * @property name       Nome do Usuário
 * @property email      Email do Usuário
 * @property password   Senha do Usuário
 * @property root       Permissão do usuário
 */
interface User extends Document {
    name:       string;
    email:      string;
    password:   string;
    root:       boolean;
}

/**
 * Modelo do mongoDB para mapear o usuário
 */
const UserModel: Model<User> = mongoose.model<User>("users", new mongoose.Schema({
    name: {type: String},
    email: {type: String},
    password: {type: String},
    root: {type: Boolean}
}));

/**
 * Função assíncrona para cadastrar usuário no Banco de Dados
 * 
 * @param name      Nome do novo usuário
 * @param email     Email do novo usuário
 * @param password  Senha do novo usuário
 * @param root      Permissão do novo usuário
 * @returns         Usuário cadastrado ou não
 */
export async function sigupUser (name: string, email: string, password: string, root: boolean): Promise<boolean> {
    try {
        const user = new UserModel({ name, email, password, root });
        const saveUser = await user.save();
        console.log('Usuário cadastrado com sucesso:', saveUser);
        return true;
    } 
    
    catch (error) {
        console.log('Erro ao cadastrar usuário:', error);
        return false;
    }
}

/**
 * 
 * @param email     Email do usuário
 * @param password  Senha do usuário
 * @returns         Dados do usuário ou erro
 */
export async function siginUser (email: string, password: string) {
    try {
        const user = await UserModel.findOne({email});
        
        if (!user) {
            console.log("Usuário não encontrado");
            return -1;
        }
        
        else {
            if (user["password"] == password) {
                return user;
            }

            else {
                return 0;
            }
        }
    }
    
    catch (error) {
        console.log("Erro ao buscar usuário:", error);
        throw error;
    }
}

export async function checkrootUser (email: string) {
    try {
        const check = await UserModel.findOne({email});
        if(check) {
            if (check.root) {
                return true;
            }

            else {
                return false;
            }
        }
        
        else {
            throw "Usuário não encontrado";
        }
    }

    catch (error) {
        console.log("Ocorreu um erro ao tentar a consulta:", error);
        throw error;
    }
}